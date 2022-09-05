import TimeDivisionKMeans from "./TimeDivisionKMeans";
import { dbConnect, dbDisconnect } from "./TimeDivisionKMeans/models";
import dotenv from "dotenv";

import _ from "lodash";
import { datasToUsages } from "./TimeDivisionKMeans/utils";

(async function () {
  dotenv.config();

  await dbConnect();

  const tdKMeans = await TimeDivisionKMeans.get();
  console.log(tdKMeans.datas.length, tdKMeans.memory.length);

  const onlyUsages = datasToUsages(tdKMeans.datas);
  const householdUsages = _.sum(_.flatten(onlyUsages));

  const chunked = _.chunk(_.unzip(onlyUsages), tdKMeans.size);
  const dayHouseholdUsages = _.map(chunked, (chunk) => _.sum(_.flatten(chunk)));
  const weights = _.map(dayHouseholdUsages, (dh) => dh / householdUsages);
  console.log(weights);
  console.log(weights.length);

  dbDisconnect();
})();
