import { ELECRATE, NUGIN_STEP } from "../common";
import { monthToSeason } from "../utils";
import _ from "lodash";

// 수요함수
export function demandFunction(
  kwh: number,
  quantity: number,
  month: number
): number {
  const season = monthToSeason(month);
  const _nuginStep = _.takeRight(NUGIN_STEP[season], 2);

  const demands = _.map(
    _.map(_nuginStep, (v) => kwh - v),
    (v) => (v > 0 ? v : 0)
  );

  let [X1, X2] = [demands[1] * -1, demands[0] - demands[1]];
  let [Y2, Y1] = ELECRATE;

  const gradient = (Y2 - Y1) / (X2 - 0);
  const _getDemand = (x: number) => gradient * x + Y1;
  Y1 = _getDemand(X1);

  const demand = _getDemand(quantity) * quantity;

  return _.isNaN(demand) || demand < 0 ? 0 : demand;
}
