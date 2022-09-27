import { ReqAuth, ResAuth } from "./types";
import client from "../client";
import { IAuth } from "@store/types";

const basePATH = "/auth";

export const signIn = async (data: ReqAuth) =>
  (await client.post<ResAuth>(`${basePATH}`, data)).data;
export const tokenCheck = async (token: string) =>
  (
    await client.get<IAuth>(`${basePATH}`, {
      headers: {
        authorization: token,
      },
    })
  ).data;
