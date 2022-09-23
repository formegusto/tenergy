import { CompareModel } from "@models";
import { Household, TimeLabelingData, TimeMeterData } from "@models/types";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

const routes = Express.Router();

routes.get("/", async (req: Express.Request, res: Express.Response) => {
  const { name } = req.auth;
  const household = await Household.init(name);
  const patterns = household.pat;
  const timeIdx = await TimeMeterData.getTimeIndex();
  const timeLabelPats: Array<TimeLabelingData> = _.map(
    timeIdx,
    (time, idx) => ({
      time,
      value: patterns[idx],
    })
  );
  const dayGroupPats = _.groupBy(timeLabelPats, ({ time }) =>
    time.getUTCDate()
  );
  const chartData = _.sortBy(Object.keys(dayGroupPats)).map((key) =>
    _.sumBy(dayGroupPats[key], ({ value }) => value)
  );

  const compare = await CompareModel.findOne({ name });
  const price = {
    elecBill: compare!.before.bill,
    public: compare!.after.public,
    trade: Math.round(compare!.err.bill),
    bill: compare!.before.bill + compare!.after.public + compare!.err.bill,
  };

  return res.status(StatusCodes.OK).json({
    usage: Math.round(_.sum(chartData)),
    chart: chartData,
    price,
  });
});

routes.get("/public", async (req: Express.Request, res: Express.Response) => {
  return res.send("공동설비 기도 그룹 소개");
});

routes.get("/trade", async (req: Express.Request, res: Express.Response) => {
  return res.send("거래 전 후 비교");
});

routes.get("/feedback", async (req: Express.Request, res: Express.Response) => {
  return res.send("전기절약 피드백");
});

export default routes;
