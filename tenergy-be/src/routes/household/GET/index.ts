import Distributor from "@libs/Distributor";
import Feedback from "@libs/Feedback";
import { FeedbackTarget, IFeedbackTarget } from "@libs/Feedback/types";
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
  // day or time
  const { name } = req.auth;
  console.log(name);
  const { type } = req.query;

  const feedback = await Feedback.init(1);
  const household = feedback.tdKMeans.getHousehold!(name);
  const myGroup = household!.self.group!;

  const centroidsFeedbackTargets =
    type === "time"
      ? await feedback.tdKMeans.times(myGroup)
      : await feedback.tdKMeans.days(myGroup);
  const { pat } = centroidsFeedbackTargets[0];
  const patKeys = _.keys(pat);
  const size = parseInt(patKeys[1]) - parseInt(patKeys[0]);

  let proposal;
  let myFeedbackTarget: IFeedbackTarget;
  let testFeedbackTarget: IFeedbackTarget;
  if (type === "time") {
    proposal = await feedback.time(name);
    myFeedbackTarget = new FeedbackTarget(household!.feedbackMaterial).getTimes(
      feedback.tdKMeans.size
    );
  } else {
    proposal = await feedback.day(name);
    myFeedbackTarget = new FeedbackTarget(
      household!.feedbackMaterial
    ).getDays();
  }

  testFeedbackTarget = _.cloneDeep(myFeedbackTarget);

  let dangerProposal: string[] = [],
    warningProposal: string[] = [];

  _.forIn(proposal, ({ count }, key) => {
    let centroidsIdx = 0;
    if (count === 1) {
      centroidsIdx = 1;
      warningProposal.push(key);
    } else dangerProposal.push(key);

    if (!centroidsFeedbackTargets[centroidsIdx].pat[parseInt(key)]) {
      console.log("걸렸다 요놈");
      console.log(centroidsFeedbackTargets[centroidsIdx].pat[parseInt(key)]);
      console.log(centroidsFeedbackTargets[centroidsIdx].pat);
      console.log(type, key);
    }

    testFeedbackTarget.pat[parseInt(key)] =
      centroidsFeedbackTargets[centroidsIdx].pat[parseInt(key)];
  });
  console.log("it's warning!", warningProposal);

  const beforeUsage = Math.round(
    _.sumBy(_.flatten(_.values(myFeedbackTarget.pat)), ({ value }) => value)
  );
  const afterUsage = Math.round(
    _.sumBy(_.flatten(_.values(testFeedbackTarget.pat)), ({ value }) => value)
  );
  const beforePrice = new Household(name, [beforeUsage], []).bill;
  const afterPrice = new Household(name, [afterUsage], []).bill;
  // console.log(
  //   _.sumBy(
  //     _.flatten(_.values(myFeedbackTarget)) as Array<TimeLabelingData>,
  //     ({ value }) => value
  //   )
  // );
  // console.log(
  //   _.sumBy(
  //     _.flatten(_.values(testFeedbackTarget)) as Array<TimeLabelingData>,
  //     ({ value }) => value
  //   )
  // );

  const chunkSize = type === "day" ? 24 : size;
  let patterns: any = {};
  _.forIn(myFeedbackTarget.pat, (value, key) => {
    let myPattern = _.map(value, ({ value: v }) => v);
    let centroidPattern: number[];
    if (warningProposal.includes(key)) {
      console.log(key, "warning");

      centroidPattern = _.map(
        centroidsFeedbackTargets[1].pat[parseInt(key)],
        ({ value: v }) => v
      );
    } else {
      console.log(key, "danger");
      centroidPattern = _.map(
        centroidsFeedbackTargets[0].pat[parseInt(key)],
        ({ value: v }) => v
      );
    }

    patterns[key] = {
      my: _.map(_.zip.apply(null, _.chunk(myPattern, chunkSize)), _.mean),
      centroids: _.map(
        _.zip.apply(null, _.chunk(centroidPattern, chunkSize)),
        _.mean
      ),
    };
  });

  return res.status(StatusCodes.OK).json({
    type,
    size,
    dangerProposal,
    warningProposal,
    price: {
      before: beforePrice,
      after: afterPrice,
    },
    usage: {
      before: beforeUsage,
      after: afterUsage,
    },
    patterns,
  });
});

export default routes;
