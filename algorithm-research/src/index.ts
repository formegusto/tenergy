import dotenv from "dotenv";
import Feedback from "./Feedback";
import { dbConnect, dbDisconnect } from "./models";

(async function () {
  dotenv.config();
  await dbConnect();

  const feedback = await Feedback.init(1);
  // await feedback.time("아파트1-103-1402");
  console.log(await feedback.day("아파트1-103-1402"));

  dbDisconnect();
})();
