import mongoose from "mongoose";

export * from "./Household";
export * from "./TimeMeterData";
export * from "./TimeDivisionMemory";
export * from "./Compare";
export * from "./EnergyTrade";

export function execAfterConnect(callback: () => Promise<void>) {
  mongoose.connection.on("connected", async () => {
    await callback();
    mongoose.disconnect();
  });

  mongoose.connection.on("disconnected", () => {
    console.log("[mongoose] disconnected 👋🏻");
  });
}
