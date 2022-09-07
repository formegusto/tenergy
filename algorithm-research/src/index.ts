import dotenv from "dotenv";
import { dbConnect, dbDisconnect } from "./models";
import TimeDivisionKMeans from "./TimeDivisionKMeans";

(async function () {
  dotenv.config();
  await dbConnect();

  //   const tdKMeans = new TimeDivisionKMeans(3);

  //   await tdKMeans.appendData();
  //   for (let _ of tdKMeans) await tdKMeans.appendData();

  //   for (let mem of tdKMeans.memory) await mem.save();
  //   const household = await Household.init("아파트1-104-1206");
  const tdKMeans = await TimeDivisionKMeans.get();
  //   await tdKMeans.result();

  console.log(await tdKMeans.days());
  console.log(await tdKMeans.times());

  dbDisconnect();
})();
