import _ from "lodash";
import KMeans from "./KMeans";
import MinMaxScaler from "./MinMaxScaler";

// 1. data setting
const TESTSIZE = 50;
const testArray = _.map(new Array(TESTSIZE), () => [
  Math.floor(Math.random() * 100) + 1,
  Math.floor(Math.random() * 100) + 1,
]);

// 2. min - max scaling
const scaler = new MinMaxScaler(testArray).fit();
const datas = scaler.transfrom();
console.log(testArray);
console.log(datas);
console.log(scaler.reverseTransform(datas));

// 3. kmeans run
const kmeans = new KMeans(datas);
kmeans.setCentroids();
for (let test of kmeans as any) {
  console.log(kmeans.ecv);
}

console.log(kmeans.labels);
