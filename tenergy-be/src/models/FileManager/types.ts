import { ResponseError } from "@common";
import { StatusCodes } from "http-status-codes";
import { Schema } from "mongoose";
import { FileManagerModel } from ".";

export type FileStatus = "PENDING" | "READY" | "STEP1" | "STEP2" | "ACTIVE";

export interface IFileManager {
  _id?: Schema.Types.ObjectId;

  buildingName: string;
  year: string;
  month: string;
  comment: string;

  path: string;
  status: FileStatus;

  createdAt?: Date;
  updatedAt?: Date;
}

export class FileManager implements IFileManager {
  _id!: Schema.Types.ObjectId;

  buildingName!: string;
  year!: string;
  month!: string;
  comment!: string;

  path!: string;
  status!: FileStatus;

  createdAt!: Date;
  updatedAt!: Date;

  constructor(model: IFileManager) {
    Object.assign(this, model);
  }

  async updateStatus(status: FileStatus): Promise<boolean> {
    try {
      await FileManagerModel.updateOne({ _id: this._id }, { $set: { status } });
      return true;
    } catch (err) {
      console.error(err);

      return false;
    }
  }

  static async getById(id: string): Promise<FileManager> {
    const doc = await FileManagerModel.findById(id);
    if (!doc)
      throw new ResponseError(
        StatusCodes.NOT_FOUND,
        "해당 정보를 찾지 못했습니다."
      );
    return new FileManager(doc.toObject());
  }

  static async save(fileManager: IFileManager): Promise<IFileManager> {
    return (await FileManagerModel.create(fileManager)).toObject();
  }
}
