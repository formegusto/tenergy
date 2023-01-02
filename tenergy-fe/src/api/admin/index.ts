import { Manager } from "@store/types";
import client from "../client";

export const getManager = async () =>
  (await client.get<Manager[]>("/admin/manager")).data;

export const postManager = async (data: FormData) =>
  (
    await client.post<Manager>("/admin/meterData", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;

export const setNewManager = async (id: string) =>
  (await client.put(`/admin/active/${id}`)).data;
