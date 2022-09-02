import _ from "lodash";
import { TimeMeterData } from "./models/types";

class TimeDivisionKMeans {
  size: number;
  cursor: number;
  datas: Array<any>;

  constructor(size: number) {
    this.size = size;
    this.cursor = 0;
    this.datas = [];
  }

  async appendData() {
    const meterDatas = await TimeMeterData.get(
      this.size * this.cursor,
      this.size
    );

    this.datas = _.concat(this.datas, meterDatas);
    this.cursor++;
  }
}

export default TimeDivisionKMeans;
