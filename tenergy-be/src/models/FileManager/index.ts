import { model, Schema } from "mongoose";
import { IFileManager } from "./types";

const FileManagerSchema = new Schema<IFileManager>(
  {
    buildingName: { type: String, required: true },
    year: { type: String, required: true },
    month: { type: String, required: true },
    comment: { type: String, required: true },
    path: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    collection: "FileManager",
    timestamps: true,
    versionKey: false,
  }
);

export const FileManagerModel = model<typeof FileManagerSchema>(
  "FileManager",
  FileManagerSchema
);
