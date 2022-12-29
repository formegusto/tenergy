import CSVReader from "../CSVReader";
import EnergyTrade from "../EnergyTrade";
import { FileManager, Household, TimeMeterData } from "@models/types";
import { arrayParallel, getTimezoneDate } from "@utils";
import TimeDivisionKMeans from "../TimeDivisionKMeans";
import _ from "lodash";
import { IStoreGuide } from "./types";
import * as model from "@models";
import { FileManagerModel } from "@models";

const TIME_SLICE = 4;

class StoreGuide implements IStoreGuide {
  fileManager: FileManager;
  reader: CSVReader;

  /**
   * get(csvName: string) 으로만 생성이 가능합니다.
   */
  private constructor(fileManager: FileManager, reader: CSVReader) {
    this.fileManager = fileManager;
    this.reader = reader;
  }

  static async get(id: string): Promise<StoreGuide> {
    try {
      const fileManager = await FileManager.getById(id);
      const { path: csvPath } = fileManager;
      const reader = await CSVReader.get(csvPath);

      await fileManager.updateStatus("READY");
      return new StoreGuide(fileManager, reader);
    } catch (err: any) {
      if (err.errno === -2)
        throw new Error("Error : 존재하지 않는 파일 경로 입니다.");
      throw err;
    }
  }

  // 전체 데이터 삭제 작업
  async clean() {
    await FileManagerModel.updateOne(
      { status: "ACTIVE" },
      {
        $set: {
          status: "PENDING",
        },
      }
    );

    await model.CompareModel.deleteMany({});
    await model.EnergyTradeModel.deleteMany({});
    await model.HouseholdModel.deleteMany({});
    await model.TimeDivisionMemoryModel.deleteMany({});
    await model.TimeMeterDataModel.deleteMany({});

    await this.fileManager.updateStatus("READY");
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

    await this.fileManager.updateStatus("STEP1");
  }

  // step 2. 가격 분배 TimeDivision Data Save
  async step2() {
    const tdKMeans = new TimeDivisionKMeans(3);

    await tdKMeans.appendData();
    for (let _ of tdKMeans) await tdKMeans.appendData();

    for (let mem of tdKMeans.memory) await mem.save();

    await this.fileManager.updateStatus("STEP2");
  }

  // step 3. 전력 거래 Energy Trade Data Save
  async step3() {
    const eTrade = await EnergyTrade.init(5);
    for (let _ of eTrade);
    await eTrade.save();

    const analyzer = eTrade.clean();
    console.log(analyzer);

    await analyzer.save();

    console.log(eTrade.results.length);

    await this.fileManager.updateStatus("ACTIVE");
  }

  static async recovery(id: string) {
    const guide = await StoreGuide.get(id);

    await guide.clean();
    await guide.step1();
    await guide.step2();
    await guide.step3();
  }
}

export default StoreGuide;
