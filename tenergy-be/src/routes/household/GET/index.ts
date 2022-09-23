import Distributor from "@libs/Distributor";
import { CompareModel } from "@models";
import { Household, TimeLabelingData, TimeMeterData } from "@models/types";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import _, { before } from "lodash";

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
  const { name } = req.auth;
  const distributor = await Distributor.init();
  await distributor.build();

  const publicPrice = distributor.publicPrice;
  const priPublicPrice = publicPrice! / distributor.apt.householdCount!;
  console.log(priPublicPrice);

  const myIdx = _.findIndex(
    distributor.apt.compares,
    ({ name: compareName }) => compareName === name
  );
  const myGroup = distributor.groups![myIdx];
  const myPrice = distributor.distribute[myIdx];

  return res.status(StatusCodes.OK).json({
    my: {
      group: myGroup,
      price: myPrice,
      contribution: distributor.contributions![myGroup],
      err: myPrice - priPublicPrice,
    },
    contributions: distributor.contributions,
  });
});

routes.get("/trade", async (req: Express.Request, res: Express.Response) => {
  const { name } = req.auth;
  const compare = await CompareModel.findOne({ name });

  const myBefore = new Household(name, [compare!.before.kwh], []);
  const myAfter = new Household(name, [compare!.after.kwh], []);

  const tradePrice = compare!.after.bill - myAfter.bill;

  return res.status(StatusCodes.OK).json({
    beforePrice: myBefore.bill,
    afterPrice: myAfter.bill,
    tradePrice,
    benefit: myBefore.bill - (myAfter.bill + tradePrice),
  });
});

routes.get("/feedback", async (req: Express.Request, res: Express.Response) => {
  return res.send("전기절약 피드백");
});

export default routes;
