import Express from "express";
import { adminCheck, loginCheck } from "@mw";
import { APT } from "@models/APT/types";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";
import { ResGetChartBody } from "./types";
import { NameLabelingData, TimeMeterData } from "@models/types";
import { DAYS } from "@common/types";

const routes = Express.Router();

// APT 간단 통합정보, 아파트, 세대, 전력거래, 공동설비
routes.get("/", async (req: Express.Request, res: Express.Response) => {
  const apt = new APT();

  await apt.addCompares();
  const compares = apt.compares!;
  const householdsBill = _.sumBy(compares, ({ after }) => after.bill);
  const publicBill = _.sumBy(compares, ({ after }) => after.public);

  await apt.addTrades();
  const trades = apt.trades!;
  const tradeBill = Math.round(_.sumBy(trades, ({ price }) => price));

  return res.status(StatusCodes.OK).json({
    price: {
      apt: Math.round(householdsBill + publicBill),
      household: Math.round(householdsBill),
      public: publicBill,
      trade: tradeBill,
    },
    usage: {
      apt: apt.meanUsage,
      household: apt.meanHouseholdPart - apt.meanTradePart,
      public: apt.meanPublicPart,
      trade: apt.meanTradePart,
    },
  });
});

// APT 상세 통합정보, 아파트, 세대, 전력거래, 공동설비
routes.get("/detail", async (req: Express.Request, res: Express.Response) => {
  const apt = new APT();

  await apt.addCompares();
  await apt.addTrades();

  const apartment = {
    title: "아파트",
    price: apt.bill,
    usage: apt.usage,
    keys: ["기본요금", "전력량요금", "가구 수"],
    values: [apt.self!.basic, apt.self!.elecRate, apt.householdCount],
  };

  const householdSteps = apt.householdsSteps;
  const zipSteps = _.zip.apply(null, householdSteps);
  const sumSteps = _.map(zipSteps, _.sum);

  const householdPart = {
    title: "세대",
    usage: apt.householdPart,
    price: apt.householdBill,
    keys: ["1단계", "2단계", "3단계"],
    values: sumSteps,
  };

  const trades = apt.trades!;
  const tradePart = {
    title: "전력거래",
    price: apt.tradeBill,
    usage: _.sumBy(trades, ({ quantity }) => quantity),
    keys: ["총 거래 횟수", "평균 거래 단위", "평균 거래 가격"],
    values: [
      trades.length,
      _.meanBy(trades, ({ quantity }) => quantity),
      _.meanBy(trades, ({ price }) => price),
    ],
  };

  const aptSteps = apt.steps;
  const colSteps = _.map(_.zip(sumSteps, aptSteps), ([h, a]) => a! - h!);
  const publicPart = {
    title: "공동설비",
    price: apt.publicBill,
    usage: apt.publicPart,
    keys: ["1단계", "2단계", "3단계"],
    values: colSteps,
  };

  return res.status(StatusCodes.OK).json({
    apt: apartment,
    household: householdPart,
    trade: tradePart,
    public: publicPart,
  });
});

// chart data
routes.get(
  "/chart",
  async (req: Express.Request, res: Express.Response<ResGetChartBody>) => {
    const apt = new APT();
    await apt.addTimeMeterDatas();
    const chartDatas = _.map(apt.timeMeterDatas, (timeMeter) => timeMeter.sum);
    const usages = _.chunk(chartDatas, 24);

    return res.status(StatusCodes.OK).json({
      total: apt.usage,
      usages: _.map(usages, _.sum),
    });
  }
);

// analyzer
routes.get("/analysis", async (req: Express.Request, res: Express.Response) => {
  const TIMESIZE = 3;
  const apt = new APT();
  await apt.addHouseholds();
  const timeIdx = await TimeMeterData.getTimeIndex();

  const householdPats = _.map(apt.households, (household) => household.pat);
  const zipPats = _.zip.apply(null, householdPats);
  let time = 0;
  const times: Array<NameLabelingData> = [];
  while (time < 24) {
    const _times = _.filter(
      zipPats,
      (_, idx) =>
        timeIdx[idx].getUTCHours() >= time &&
        timeIdx[idx].getUTCHours() < time + TIMESIZE
    );
    times.push({
      name: `${time}~${time + TIMESIZE - 1}`,
      value: Math.round(_.sum(_.flatten(_times))),
    });

    time += TIMESIZE;
  }

  const days: Array<NameLabelingData> = [];
  DAYS.forEach((day, dayIdx) => {
    const _days = _.filter(
      zipPats,
      (_, idx) => timeIdx[idx].getUTCDay() === dayIdx
    );
    days.push({ name: day, value: Math.round(_.sum(_.flatten(_days))) });
  });

  return res.status(StatusCodes.OK).json({
    times,
    days,
  });
});

export default routes;
