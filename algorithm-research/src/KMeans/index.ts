import _ from "lodash";
import sorting from "./sorting";
import {
  clusterSeparation,
  euclideanDistance,
  getDistanceProportional,
  getMaxLabel,
  getMinLabel,
  sumOfSqaured,
} from "./utils";

class KMeans implements Iterator<number[]> {
  datas: number[][];
  K: number;

  labels?: number[];
  centroids?: number[][];
  done?: boolean;
  earlyStop: number;

  constructor(datas: number[][], earlyStop = 3) {
    this.datas = datas;
    this.K = Math.round(Math.sqrt(datas.length / 2));
    this.earlyStop = earlyStop;
  }

  [Symbol.iterator]() {
    return this;
  }

  setCentroids() {
    const idxes = _.range(0, this.datas.length);

    // first is random
    const ranIdx = _.sample(idxes);
    const centroids = [this.datas[ranIdx!]];

    // next set with distance proportional
    while (centroids.length < this.K) {
      const disPropotinal = getDistanceProportional(this.datas, centroids);
      const nextIdx = getMaxLabel(disPropotinal as number[]);
      centroids.push(this.datas[nextIdx]);
    }
    this.centroids = centroids;
  }

  next() {
    this.labels = _.map(this.datas, (x) =>
      getMinLabel(
        _.map(this.centroids, (centroid) => euclideanDistance(x, centroid))
      )
    );

    const newCentroids = new Array(this.K);
    for (let label of _.uniq(this.labels)) {
      const members = _.filter(this.datas, (d, i) => this.labels![i] === label);
      const zipDatas = _.zip.apply(null, members);

      newCentroids[label] = _.map(zipDatas, (z) => _.mean(z));
    }

    if (_.isEqual(this.centroids, newCentroids)) this.earlyStop--;
    this.centroids = newCentroids;

    if (this.earlyStop === 0) {
      // 끝났을 때, sorting 함수 붙여주기
      this.sorting = () => {
        const [labels, centroids] = sorting.call(this);

        this.labels = labels;
        this.centroids = centroids;
      };

      return { value: this.labels, done: true };
    }
    return { value: this.labels, done: false };
  }

  get clusterSeparation() {
    return clusterSeparation.call(this);
  }

  get tss() {
    return sumOfSqaured(this.datas);
  }
  get wss() {
    let wss = 0;
    for (let label of _.uniq(this.labels)) {
      const filtered = _.filter(
        this.datas,
        (data, idx) => this.labels![idx] === label
      );
      const sse = sumOfSqaured(filtered);
      wss += sse;
    }

    return wss;
  }
  get ecv() {
    return (1 - this.wss / this.tss) * 100;
  }

  sorting?: () => void;
}

export default KMeans;
