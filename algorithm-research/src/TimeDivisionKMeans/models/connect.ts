import { connect, disconnect } from "mongoose";

export async function dbConnect() {
  const { MONGO_HOST, MONGO_PORT, MONGO_APP } = process.env;
  const connectURL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_APP}`;

  try {
    await connect(connectURL);

    console.log("[mongoose] connected :)");
  } catch (err) {
    console.error(err);
    console.error("[mongoose] connect error :(");
  }
}

export function dbDisconnect() {
  disconnect();
  console.log("[mongoose] disconnected :)");
}
