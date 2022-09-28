import client from "../client";
import { ResGetCompare, ResGetTrade, ResGetTradeDetail } from "./types";

const BASEPATH = "/trade";

export const getTrade = async (token: string) =>
  (
    await client.get<ResGetTrade>(`${BASEPATH}`, {
      headers: {
        authorization: token,
      },
    })
  ).data;

export const getTradeDetail = async (token: string) =>
  (
    await client.get<ResGetTradeDetail>(`${BASEPATH}/detail`, {
      headers: {
        authorization: token,
      },
    })
  ).data;

export const getCompare = async (token: string) =>
  (
    await client.get<ResGetCompare>(`${BASEPATH}/compare`, {
      headers: {
        authorization: token,
      },
    })
  ).data;
