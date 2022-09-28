import Express from "express";
import Distributor from "@libs/Distributor";
import { adminCheck, loginCheck } from "@mw";
import { StatusCodes } from "http-status-codes";
import { APT } from "@models/types";
import _ from "lodash";

const routes = Express.Router();

routes.get(
  "/",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    const distributor = await Distributor.init();
    await distributor.build();

    return res.status(StatusCodes.OK).json({
      privatePrice: distributor.apt.compares![0].after.public,
      distributePrices: distributor.distributeGroup,
    });
  }
);

routes.get(
  "/price",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    const apt = new APT();
    await apt.addCompares();
    await apt.addTrades();

    return res.status(StatusCodes.OK).json({
      apartment: apt.bill,
      householdPart: apt.householdBill,
      householdCount: apt.householdCount,
      tradePart: apt.tradeBill,
      publicPart: apt.publicBill,
      priPublicPrice: Math.round(apt.publicBill / apt.householdCount!),
    });
  }
);

routes.get(
  "/detail",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    const distributor = await Distributor.init();
    await distributor.build();

    // groupNo
    const groups = distributor.groups;
    const groupCount = _.valuesIn(_.countBy(groups));
    const uniqGroups = _.sortBy(_.uniq(groups));

    // 가격정보
    const priPrice = distributor.publicPrice! / distributor.apt.householdCount!;
    const distribute = distributor.distributeGroup;
    const errs = _.map(distribute, (dist) => dist - priPrice);

    // 패턴, 평균사용량 정보
    const apt = distributor.apt;
    await apt.addHouseholds();
    _.forEach(apt.households, (household, idx) => {
      household.group = groups![idx];
    });
    const groupPats = _.map(uniqGroups, (group) =>
      _.map(
        _.filter(apt.households, (household) => household.group === group),
        ({ pat }) => pat
      )
    );
    const meanUsages = _.map(groupPats, (pats) =>
      Math.round(_.mean(_.map(pats, _.sum)))
    );
    const meanPats = _.map(groupPats, (pats) =>
      _.map(_.chunk(_.map(_.zip.apply(null, pats), _.mean), 24), _.sum)
    );

    const contributions = distributor.contributions;

    const colNames = [
      "groupNo",
      "count",
      "contribution",
      "meanUsage",
      "price",
      "err",
    ];
    const tableDatas = _.zip(
      uniqGroups,
      groupCount,
      contributions,
      meanUsages,
      distribute,
      errs
    );

    return res.status(StatusCodes.OK).json({
      groupCount,
      groupPattern: meanPats,
      table: _.map(tableDatas, (tableData) => _.zipObject(colNames, tableData)),
    });
  }
);

export default routes;
