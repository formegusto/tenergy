import { TimeMeterData } from "@models/types";
import _ from "lodash";

export function datasToUsages(datas: TimeMeterData[]) {
  const parsed = _.flatten(_.map(datas, ({ data }) => data));
  const grouped = _.groupBy(parsed, "name");
  const merge = _.mapValues(grouped, (g) => _.map(g, ({ kwh }) => kwh));
  const usages = _.valuesIn(merge);

  return usages;
}
