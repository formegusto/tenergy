import { dbConnect, dbDisconnect } from "./models";
import dotenv from "dotenv";
import Distributor from "./Distributor";
import _ from "lodash";

export default async function () {
  dotenv.config();
  await dbConnect();

  const distributor = await Distributor.init(30);
  await distributor.build();

  console.log(distributor.priceByContributions);
  console.log(distributor.distribute);
  console.log(distributor.distributeGroup);

  dbDisconnect();
}
