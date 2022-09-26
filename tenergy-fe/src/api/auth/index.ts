import { ReqAuth, ResAuth } from "./types";
import client from "../client";

const basePATH = "/auth";

export const signIn = async (data: ReqAuth) =>
  (await client.post<ResAuth>(`${basePATH}`, data)).data;
export const tokenCheck = async (token: string) =>
  (
    await client.get<any>(`${basePATH}`, {
      headers: {
        authorization: token,
      },
    })
  ).data;
