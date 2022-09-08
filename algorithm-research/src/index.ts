import dotenv from "dotenv";
import EnergyTrade from "./EnergyTrade";
import { dbConnect, dbDisconnect } from "./models";

(async function () {
  dotenv.config();
  await dbConnect();

  const eTrade = await EnergyTrade.init(5);
  const maxBuyer = eTrade.searchBuyer();

  console.log(maxBuyer);

  dbDisconnect();
})();
