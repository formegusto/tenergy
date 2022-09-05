import TimeDivisionKMeans from "./TimeDivisionKMeans";
import { dbConnect, dbDisconnect } from "./TimeDivisionKMeans/models";
import dotenv from "dotenv";
import _ from "lodash";
import { TimeMeterData } from "./TimeDivisionKMeans/models/types";

(async function () {
  dotenv.config();

  await dbConnect();

  const tdKMeans = await TimeDivisionKMeans.get();
  console.log(tdKMeans.datas.length, tdKMeans.memory.length);

  tdKMeans.result;

  // const timeIdxes = await TimeMeterData.getTimeIndex();
  // // 0: Sun ~ 6: Sat
  // console.log(_.map(timeIdxes, (time) => time.getDay()));

  dbDisconnect();
})();
