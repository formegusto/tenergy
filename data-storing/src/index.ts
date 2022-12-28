import "module-alias/register";
import "@model/connect";
import { execAfterConnect } from "@model";
import fs from "fs";
import path from "path";
import AppRoot from "app-root-path";
import _ from "lodash";
import { Household } from "@model/types";
import { arrayParallel } from "@util";

execAfterConnect(async () => {
  try {
    const filePath = path.join(AppRoot.path, "data", "아파트1_201805.csv");

    const csv = fs.readFileSync(filePath, "utf-8");
    const rowString = _.split(csv, "\n");
    let rows = _.map(rowString, (row) => _.split(row, ","));

    const householdNames = _.drop(rows[0]);
    rows = _.drop(rows);
    const datas = _.zip(...rows);

    await arrayParallel(householdNames, async (name) => {
      await Household.save(name);
    });
  } catch (err: any) {
    if (err.errno === -2)
      console.log("Error : 존재하지 않는 파일 경로 입니다.");
  }
});
