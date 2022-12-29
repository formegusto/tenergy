import path from "path";
import { promises as fs } from "fs";
import AppRoot from "app-root-path";
import _ from "lodash";
import { ICSVReader } from "./types";

class CSVReader implements ICSVReader {
  csvString!: string;
  rowString!: string[];

  /**
   * get(csvName: string) 으로만 생성이 가능합니다.
   */
  private constructor(args: ICSVReader) {
    Object.assign(this, args);
  }

  static async get(csvPath: string): Promise<CSVReader> {
    const filePath = path.join(AppRoot.path, csvPath);
    const csvString = await fs.readFile(filePath, "utf-8");
    const rowString = _.split(csvString, "\n");

    return new CSVReader({
      csvString,
      rowString,
    });
  }

  get rows(): string[][] {
    const rows = _.map(this.rowString, (row) => _.split(row, ","));
    const rowLength = rows[0].length;

    return _.filter(rows, (row) => row.length === rowLength);
  }

  get header(): string[] {
    const rows = this.rows;

    return _.filter(rows[0], (row) => row !== "");
  }

  get rowsWithoutHeader(): string[][] {
    const rows = this.rows;

    return _.drop(rows);
  }
}

export default CSVReader;
