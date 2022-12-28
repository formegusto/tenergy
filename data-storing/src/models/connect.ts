import dotenv from "dotenv";
import { connect } from "mongoose";

(async function () {
  dotenv.config();

  const { MONGO_HOST, MONGO_PORT, MONGO_APP } = process.env;
  const connectURL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_APP}`;
  try {
    await connect(connectURL);
    console.log("[mongoose] connected :)");
  } catch (err) {
    console.error("[mongoose connect Error :(");
    console.error(err);
  }
})();
