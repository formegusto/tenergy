import "module-alias/register";
import "@model/connect";
import { execAfterConnect } from "@model";
import fs from "fs";
import path from "path";
import AppRoot from "app-root-path";
import _ from "lodash";
import { StoreGuide } from "@lib";

execAfterConnect(async () => {
  try {
    const csvName = "아파트1_2019-01.csv";
    const guide = await StoreGuide.get(csvName);

    await guide.clean();

    await guide.step1();
    await guide.step2();
    await guide.step3();
  } catch (err) {
    console.error(err);
  }
});
