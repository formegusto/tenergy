import _ from "lodash";

// 시간대별로 data를 분할하여 반환
export function dataDivisionBySize(datas: number[][], size: number) {
  const chunked = _.chunk(_.unzip(datas), size);

  return chunked;
}
