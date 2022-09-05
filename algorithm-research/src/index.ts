import TimeDivisionKMeans from "./TimeDivisionKMeans";
import { dbConnect, dbDisconnect } from "./TimeDivisionKMeans/models";
import dotenv from "dotenv";

import _ from "lodash";
import { dataDivisionBySize, datasToUsages } from "./TimeDivisionKMeans/utils";

(async function () {
  dotenv.config();

  await dbConnect();

  const tdKMeans = await TimeDivisionKMeans.get();
  console.log(tdKMeans.datas.length, tdKMeans.memory.length);

  const onlyUsages = datasToUsages(tdKMeans.datas);
  const householdUsages = _.sum(_.flatten(onlyUsages));

  const chunked = dataDivisionBySize(onlyUsages, tdKMeans.size);
  const dayHouseholdUsages = _.map(chunked, (chunk) => _.sum(_.flatten(chunk)));
  const weights = _.map(dayHouseholdUsages, (dh) => dh / householdUsages);
  const weightTotal = _.sum(weights);

  const contributeMap = _.zip.apply(
    null,
    _.map(tdKMeans.memory, ({ labels }) => labels)
  );
  const group = _.map(contributeMap, (contributes) => {
    const zipDatas = _.zip(contributes, weights);
    const multiplies = _.map(zipDatas, (data) =>
      _.multiply.apply(null, data as [number, number])
    );
    return Math.round(_.sum(multiplies) / weightTotal);
  });

  const labels = _.sortBy(_.uniq(group));
  const centroids: number[][] = [];
  for (let label of labels) {
    const parsed = _.filter(onlyUsages, (_, idx) => group[idx] === labels[0]);
    const groupChunked = dataDivisionBySize(parsed, tdKMeans.size);

    const centroid = _.map(groupChunked, (data) => _.mean(_.flatten(data)));
    centroids.push(centroid);
  }

  console.log(centroids.length);

  dbDisconnect();
})();
