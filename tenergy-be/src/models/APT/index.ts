import { APT } from "./types";

export class APTBuilder {
  apt: APT;

  constructor(publicPercentage?: number) {
    this.apt = new APT(publicPercentage);
  }

  async setSimple() {
    await this.apt.addTimeMeterDatas();
  }

  async setDetail() {
    await this.apt.addHouseholds();
    await this.apt.addTrades();
  }

  get() {
    return this.apt;
  }
}
