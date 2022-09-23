import dotenv from "dotenv";
import Feedback from "./Feedback";
import { dbConnect, dbDisconnect } from "./models";

export default async function () {
  dotenv.config();
  await dbConnect();

  const feedback = await Feedback.init(1);
  console.log(await feedback.time("아파트1-103-1402"));
  console.log(await feedback.day("아파트1-103-1602"));

  dbDisconnect();
}
