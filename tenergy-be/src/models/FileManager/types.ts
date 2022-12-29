import { Schema } from "mongoose";
import { FileManagerModel } from ".";

export type FileStatus = "PENDING" | "READY" | "STEP1" | "STEP2" | "ACTIVE";

export interface IFileManager {
  id?: Schema.Types.ObjectId;

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
  id!: Schema.Types.ObjectId;

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

  static async save(fileManager: IFileManager): Promise<IFileManager> {
    return (await FileManagerModel.create(fileManager)).toObject();
  }
}
