import _ from "lodash";
import KMeans from "../KMeans";
import { scaling } from "../MinMaxScaler/scailing";
import { TimeMeterData } from "./models/types";
import { spawnSync } from "child_process";

class TimeDivisionKMeans {
  size: number;
  cursor: number;
  datas: Array<any>;

  kmeans: KMeans[];

  constructor(size: number) {
    this.size = size;
    this.cursor = 0;
    this.datas = [];
    this.kmeans = [];
  }

  async appendData() {
    const meterDatas = await TimeMeterData.get(
      this.size * this.cursor,
      this.size
    );

    this.datas = _.concat(this.datas, meterDatas);
    this.cursor++;
  }

  next() {
    const takeDatas = _.takeRight(this.datas, this.size);
    const datas = _.flatten(_.map(takeDatas, ({ data }) => data));

    const grouped = _.groupBy(datas, "name");
    const merge = _.mapValues(grouped, (g) => _.map(g, ({ kwh }) => kwh));

    const meansDatas = _.valuesIn(merge);

    const [normDatas, scaler] = scaling(meansDatas, true);

    const kmeans = new KMeans(normDatas);
    kmeans.setCentroids();
    for (let _ of kmeans);

    // Label Sorting 작업이 필요하고,
    if (kmeans.sorting) kmeans.sorting();

    // Adjusting 작업이 필요함 (여기서 파이썬 프로그램이 붙어주면 됨)
    const decisionTreeProcess = spawnSync("python3", [
      "python",
      '[{"test":1}]',
    ]);

    console.log(decisionTreeProcess.stdout.toString());
    console.log(decisionTreeProcess.stderr.toString());
  }
}

export default TimeDivisionKMeans;
