import mongoose from "mongoose";

export * from "./Household";
export function execAfterConnect(callback: () => void) {
  mongoose.connection.on("connected", callback);
}
