import client from "../client";
import { ResGetTrade } from "./types";

const BASEPATH = "/trade";

export const getTrade = async (token: string) =>
  (
    await client.get<ResGetTrade>(`${BASEPATH}`, {
      headers: {
        authorization: token,
      },
    })
  ).data;
