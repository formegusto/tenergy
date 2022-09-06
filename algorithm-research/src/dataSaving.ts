import dotenv from "dotenv";
import TimeDivisionKMeans from "./TimeDivisionKMeans";
import { dbConnect, dbDisconnect } from "./models";

export default async function () {
  dotenv.config();
  await dbConnect();

  const tdKMeans = new TimeDivisionKMeans(3);

  await tdKMeans.appendData();
  for (let _ of tdKMeans) await tdKMeans.appendData();

  for (let mem of tdKMeans.memory) await mem.save();

  dbDisconnect();
}
