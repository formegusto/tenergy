import Express from "express";
import { adminCheck, loginCheck } from "@mw";
import { APT } from "@models/APT/types";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";
import { ResGetChartBody } from "./types";

const routes = Express.Router();

// APT 간단 통합정보, 아파트, 세대, 전력거래, 공동설비
routes.get(
  "/",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
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
  }
);

// APT 상세 통합정보, 아파트, 세대, 전력거래, 공동설비
routes.get(
  "/detail",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    const apt = new APT();

    await apt.addCompares();
    await apt.addTrades();

    const apartment = {
      title: "아파트",
      prices: apt.bill,
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
      prices: apt.householdBill,
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

    return res
      .status(StatusCodes.OK)
      .json({ apartment, householdPart, tradePart, publicPart });
  }
);

// chart data
routes.get(
  "/chart",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response<ResGetChartBody>) => {
    const apt = new APT();
    await apt.addTimeMeterDatas();
    const chartDatas = _.map(apt.timeMeterDatas, (timeMeter) => timeMeter.sum);

    return res.status(StatusCodes.OK).json({
      total: apt.usage,
      usages: chartDatas,
    });
  }
);

// analyzer
routes.get(
  "/analysis",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    return res.send("test");
  }
);

export default routes;
