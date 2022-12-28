import "module-alias/register";
import "@model/connect";
import { execAfterConnect } from "@model";
import fs from "fs";
import path from "path";
import AppRoot from "app-root-path";
import _ from "lodash";
import { Household, TimeMeterData } from "@model/types";
import { arrayParallel, getTimezoneDate } from "@util";

execAfterConnect(async () => {
  try {
    const filePath = path.join(AppRoot.path, "data", "아파트1_2019-01.csv");

    const csv = fs.readFileSync(filePath, "utf-8");
    const rowString = _.split(csv, "\n");
    let rows = _.map(rowString, (row) => _.split(row, ","));
    const rowLength = rows[0].length;
    rows = _.filter(rows, (row) => row.length === rowLength);

    // 가구 정보 저장
    const householdNames = _.drop(rows[0]);
    await arrayParallel(householdNames, async (name) => {
      await Household.save(name);
    });
    rows = _.drop(rows);

    // 1시간 단위
    const hoursRows = _.chunk(rows, 4);

    /**
     * [0] => date,
     * [1...last] => household usage data
     */
    // 가구 사용량(1시간 단위) 패턴 저장
    await arrayParallel(hoursRows, async (datas) => {
      const zipDatas = _.zip(...datas) as string[][];

      // 가장 앞자리 데이터
      const time = getTimezoneDate(new Date(zipDatas[0][0]));
      const usages = _.map(_.drop(zipDatas), (data) =>
        _.sum(_.map(data, Number.parseFloat))
      );
      const data = _.zipWith(
        householdNames,
        usages,
        (name: string, kwh: number) => ({
          name,
          kwh,
        })
      );
      await TimeMeterData.save(time, data);
    });
  } catch (err: any) {
    if (err.errno === -2)
      console.log("Error : 존재하지 않는 파일 경로 입니다.");
  }
});
