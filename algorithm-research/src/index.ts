import dotenv from "dotenv";
import distributorUsage from "./distributorUsage";
import EnergyTrade from "./EnergyTrade";
import { dbConnect, dbDisconnect } from "./models";
import feedbackUsage from "./feedbackUsage";

(async function () {
  // dotenv.config();
  // await dbConnect();

  // const eTrade = await EnergyTrade.init(5);

  // for (let _ of eTrade);

  // await eTrade.save();

  // const analyzer = eTrade.clean();
  // // console.log(analyzer);

  // // console.log(analyzer.householdPartBill);
  // // console.log(analyzer.publicPartBill);
  // console.log(analyzer.householdCompare);
  // // await analyzer.save();

  // console.log(eTrade.results.length);
  // //   console.log()

  // dbDisconnect();
  await feedbackUsage();
})();

// distributorUsage();
