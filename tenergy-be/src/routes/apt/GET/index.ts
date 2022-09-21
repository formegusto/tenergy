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
    return res.send("test");
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
