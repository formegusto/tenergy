import MinMaxScaler from ".";

export function scaling(
  datas: number[][],
  returnScaler?: boolean
): [number[][], MinMaxScaler?] {
  const scaler = new MinMaxScaler(datas).fit();

  if (returnScaler) return [scaler.transfrom(), scaler];
  else return [scaler.transfrom(), undefined];
}
