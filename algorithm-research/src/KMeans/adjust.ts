import KMeans from ".";
import _ from "lodash";
import { spawnSync } from "child_process";

function dropAnomaly(
  datas: number[][],
  labels: number[]
): [number[][], number[]] {
  let unanomalies: number[][] = [];
  for (let i = 0; i < _.uniq(labels).length - 1; i++) {
    const nowX = _.flatten(_.filter(datas, (_, idx) => labels[idx] === i));
    const nowY = _.filter(labels, (label) => label === i);
    const nowZip = _.zip(nowX, nowY);
    const nextX = _.filter(datas, (_, idx) => labels[idx] === i + 1);

    let minNextX: number[] | undefined | number = _.min(nextX);

    if (!minNextX || minNextX.length === 0) continue;
    minNextX = minNextX[0];
    console.log(`min next(${i + 1}) x`, minNextX);

    // const anomaly = _.filter(nowZip, ([x]) => x! > minNextX!);
    // console.log(anomaly);
    const unanomaly = _.filter(nowZip, ([x]) => x! < minNextX!) as number[][];
    unanomalies = _.concat(unanomalies, unanomaly);
  }

  const [X, Y] = _.unzip(unanomalies);

  return [_.chunk(X, 1), Y];
}

function adjust(this: KMeans) {
  // Sum Of Time Usage
  const predX = _.chunk(_.map(this.datas, _.sum), 1);
  const predY = this.labels!;

  // anomaly는 제거된 상태에서 진행되어야 함
  // 현재 내가 속해 있는 그룹 기준으로 다음 그룹에 나보다 적게 사용한 가구가 있다면, 나는 anomaly이다.
  // anomaly 가 제거된 데이터셋이 훈련데이터
  // 원본 데이터는 재배치에 사용될, DecisionTree의 예측에 사용될 데이터
  const [trainX, trainY] = dropAnomaly(predX, predY);

  const trainDatas = [trainX, trainY, predX, predY];

  const decisionTreeProcess = spawnSync("python3", [
    "python",
    JSON.stringify(trainDatas),
  ]);
  const newLabels = _.map(
    decisionTreeProcess.stdout.toString().split(","),
    (label) => parseInt(label)
  );

  const newCentroids: number[][] = [];
  // centroids 재배치
  for (let label of _.sortBy(_.uniq(newLabels))) {
    const members = _.filter(this.datas, (_, idx) => newLabels[idx] === label);
    const centroids = _.map(_.unzip(members), (membersTime) =>
      _.mean(membersTime)
    );

    newCentroids.push(centroids);
  }

  this.labels = newLabels;
  this.centroids = newCentroids;
}

export default adjust;
