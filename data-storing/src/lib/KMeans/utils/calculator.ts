import _ from "lodash";
import KMeans from "..";

export function euclideanDistance(x: number[], y: number[]) {
  const zipDatas = _.zip(x, y);
  return Math.sqrt(
    _.sum(
      _.map(zipDatas, (z: [number, number]) => _.subtract.apply(null, z) ** 2)
    )
  );
}

export function getMinLabel(numbers: number[]) {
  let label = 0;
  let minValue = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (minValue > numbers[i]) {
      label = i;
      minValue = numbers[i];
    }
  }

  return label;
}

export function getMaxLabel(numbers: number[]) {
  let label = 0;
  let maxValue = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (maxValue < numbers[i]) {
      label = i;
      maxValue = numbers[i];
    }
  }

  return label;
}

export function getDistanceProportional(X: number[][], Y: number[][]) {
  return _.map(X, (x) => _.min(_.map(Y, (y) => euclideanDistance(x, y))));
}

// 높을 수록 좋은 거, Cluster 간 이격도, KMeans랑 비교하려고 만들었는 듯
export function clusterSeparation(this: KMeans) {
  const separations = _.map(this.centroids, (X, XIdx) => {
    const filtered = _.filter(this.centroids, (Y, YIdx) => XIdx !== YIdx);
    return _.map(filtered, (Y) => euclideanDistance(X, Y));
  });

  return _.mean(_.flatten(separations));
}

export function sumOfSqaured(datas: number[][]) {
  const dataMean = _.map(_.unzip(datas), (zipData) => _.mean(zipData));
  const dataMeanDistances = _.map(
    datas,
    (data) => euclideanDistance(dataMean, data) ** 2
  );

  return _.sum(dataMeanDistances);
}
