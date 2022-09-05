import TimeDivisionKMeans from "./TimeDivisionKMeans";
import { dbConnect, dbDisconnect } from "./TimeDivisionKMeans/models";
import dotenv from "dotenv";

import _ from "lodash";

(async function () {
  dotenv.config();

  await dbConnect();

  const tdKMeans = await TimeDivisionKMeans.get();
  console.log(tdKMeans.datas.length, tdKMeans.memory.length);

  tdKMeans.set();
  console.log(tdKMeans.groups);
  console.log(_.map(tdKMeans.centroids!, (data) => _.sum(data)));

  dbDisconnect();
})();
