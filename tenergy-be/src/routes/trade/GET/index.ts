import { APT } from "@models/types";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

const routes = Express.Router();

routes.get("/", async (req: Express.Request, res: Express.Response) => {
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
});

export default routes;
