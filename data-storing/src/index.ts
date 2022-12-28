import "module-alias/register";
import "@model/connect";
import { execAfterConnect } from "@model";

execAfterConnect(async () => {});

// import fs from "fs";
// import path from "path";
// import AppRoot from "app-root-path";
// import _ from "lodash";

// try {
//   const filePath = path.join(AppRoot.path, "data", "아파트1_201805.csv");

//   const csv = fs.readFileSync(filePath, "utf-8");
//   const rowString = _.split(csv, "\n");
//   let rows = _.map(rowString, (row) => _.split(row, ","));

//   const householdNames = _.drop(rows[0]);
//   rows = _.drop(rows);
//   const datas = _.zip(...rows);

//   console.log(datas);
// } catch (err: any) {
//   if (err.errno === -2) console.log("Error : 존재하지 않는 파일 경로 입니다.");
// }
