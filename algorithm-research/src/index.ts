import dotenv from "dotenv";
import TimeDivisionKMeans from "./TimeDivisionKMeans";
import { dbConnect, dbDisconnect } from "./TimeDivisionKMeans/models";

(async function () {
  dotenv.config();
  await dbConnect();

  const tdKMeans = new TimeDivisionKMeans(3);

  await tdKMeans.appendData();
  tdKMeans.next();

  await tdKMeans.appendData();
  tdKMeans.next();
  // for (let _ of tdKMeans) {
  //   await tdKMeans.appendData();
  // }

  // tdKMeans.next();

  // await tdKMeans.appendData();
  // tdKMeans.next();

  dbDisconnect();
})();
