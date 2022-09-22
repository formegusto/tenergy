import Distributor from "@libs/Distributor";
import { APT } from "@models/types";
import { adminCheck, loginCheck } from "@mw";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

const routes = Express.Router();

routes.get(
  "/",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    const apt = new APT();

    await apt.addTrades();
    const trades = apt.trades!;

    return res.status(StatusCodes.OK).json({
      // 거래 사용량
      usage: _.sumBy(trades, ({ quantity }) => quantity),
      count: trades.length,
      meanUnit: _.meanBy(trades, ({ quantity }) => quantity),
      meanPrice: _.meanBy(trades, ({ price }) => price),
    });
  }
);

routes.get(
  "/detail",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    const apt = new APT();

    await apt.addTrades();
    await apt.addCompares();
    const trades = apt.trades!;
    const prices = _.map(trades, ({ price }) => price);
    const groupByNameTrade = _.groupBy(trades, ({ name }) => name);

    const groupingTrades = _.values(groupByNameTrade);
    const groupTotals = _.map(groupingTrades, (groupTrade) =>
      _.sumBy(groupTrade, ({ quantity }) => quantity)
    );

    return res.status(StatusCodes.OK).json({
      price: {
        value: _.sum(prices),
        mean: _.sum(prices) / apt.householdCount!,
        min: _.min(prices),
        max: _.max(prices),
      },
      usage: {
        value: _.sum(groupTotals),
        mean: _.mean(groupTotals),
        min: _.min(groupTotals),
        max: _.max(groupTotals),
      },
    });
  }
);

routes.get(
  "/compare",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    const apt = new APT();
    const distributor = await Distributor.init();

    await apt.addCompares();
    await distributor.build();

    // compares랑 순서같음
    // public 가격 재 주입
    const distributes = distributor.distribute;
    const compares = _.map(apt.compares!, (compare, idx) => {
      compare.after.public = distributes[idx];
      compare.err.public = compare.after.public - compare.before.public;

      return compare;
    });

    return res.status(StatusCodes.OK).json(compares);
  }
);

export default routes;
