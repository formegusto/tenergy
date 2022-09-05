import dotenv from "dotenv";
import TimeDivisionKMeans from "./TimeDivisionKMeans";
import { dbConnect, dbDisconnect } from "./TimeDivisionKMeans/models";

(async function () {
  dotenv.config();
  await dbConnect();

  const tdKMeans = new TimeDivisionKMeans(3);

  await tdKMeans.appendData();
  for (let _ of tdKMeans) {
    await tdKMeans.appendData();
  }

  for (let mem of tdKMeans.memory) {
    await mem.save();
  }

  // tdKMeans.next();

  // await tdKMeans.appendData();
  // tdKMeans.next();

  dbDisconnect();
})();
