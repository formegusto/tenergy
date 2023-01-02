import { Manager } from "@store/types";
import client from "../client";

export const getManager = async () =>
  (await client.get<Manager[]>("/admin/manager")).data;
