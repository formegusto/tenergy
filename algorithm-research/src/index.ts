import TimeDivisionKMeans from "./TimeDivisionKMeans";
import { dbConnect, dbDisconnect } from "./TimeDivisionKMeans/models";
import dotenv from "dotenv";

(async function () {
  dotenv.config();

  await dbConnect();

  const tdKMeans = await TimeDivisionKMeans.get();
  console.log(tdKMeans.datas.length, tdKMeans.memory.length);

  dbDisconnect();
})();
