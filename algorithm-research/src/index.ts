import dotenv from "dotenv";
import EnergyTrade from "./EnergyTrade";
import { dbConnect, dbDisconnect } from "./models";

(async function () {
  dotenv.config();
  await dbConnect();

  const eTrade = await EnergyTrade.init(5);

  for (let _ of eTrade);

  // await eTrade.save();

  const analyzer = eTrade.clean();
  console.log(analyzer);

  console.log(analyzer.householdPartBill);
  console.log(analyzer.publicPartBill);
  console.log(analyzer.householdCompare);

  // console.log(eTrade.results);

  dbDisconnect();
})();
