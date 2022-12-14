import TimeDivisionKMeans from "./TimeDivisionKMeans";
import { dbConnect, dbDisconnect } from "./models";
import dotenv from "dotenv";
import _ from "lodash";
import APT from "./APT";

export default async function () {
  dotenv.config();

  await dbConnect();

  const tdKMeans = await TimeDivisionKMeans.get();
  console.log(tdKMeans.datas.length, tdKMeans.memory.length);
  const result = await tdKMeans.result();
  // console.log(result.groups);

  const apt = await APT.init(30);
  apt.show();
  // await tdKMeans.days();
  // console.log(result.centroids);
  // console.log(result.centroidsContributeMap);

  // const timeIdxes = await TimeMeterData.getTimeIndex();
  // // 0: Sun ~ 6: Sat
  // console.log(_.map(timeIdxes, (time) => time.getDay()));

  dbDisconnect();
}
