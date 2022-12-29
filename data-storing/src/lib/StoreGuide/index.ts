import { CSVReader } from "@lib";
import { Household, TimeMeterData } from "@model/types";
import { arrayParallel, getTimezoneDate } from "@util";
import _ from "lodash";
import { IStoreGuide } from "./types";

const TIME_SLICE = 4;

class StoreGuide implements IStoreGuide {
  reader: CSVReader;

  /**
   * get(csvName: string) 으로만 생성이 가능합니다.
   */
  private constructor(reader: CSVReader) {
    this.reader = reader;
  }

  static async get(csvName: string): Promise<StoreGuide> {
    try {
      const reader = await CSVReader.get(csvName);

      return new StoreGuide(reader);
    } catch (err: any) {
      if (err.errno === -2)
        throw new Error("Error : 존재하지 않는 파일 경로 입니다.");
      throw err;
    }
  }

  // step 1. 가구 정보 저장 (가구 이름, 가구 1시간 단위 미터데이터)
  async step1() {
    let rows = this.reader.rows;

    // 가구 이름 저장
    const householdNames = this.reader.header;
    await arrayParallel(householdNames, async (name) => {
      await Household.save(name);
    });
    rows = this.reader.rowsWithoutHeader;

    const hoursRows = _.chunk(rows, TIME_SLICE);
    await arrayParallel(hoursRows, async (datas) => {
      const zipDatas = _.zip(...datas) as string[][];

      // 가장 앞자리 데이터
      const time = getTimezoneDate(new Date(zipDatas[0][0]));
      const usages = _.map(_.drop(zipDatas), (data) =>
        _.sum(_.map(data, Number.parseFloat))
      );
      const data = _.zipWith(
        householdNames,
        usages,
        (name: string, kwh: number) => ({
          name,
          kwh,
        })
      );
      await TimeMeterData.save(time, data);
    });
  }

  // step 2. 가격 분배 TimeDivision Data Save
  async step2() {}

  // step 3. 전력 거래 Energy Trade Data Save
  async step3() {}
}

export default StoreGuide;
