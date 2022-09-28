import client from "../client";
import { ResGetPublic, ResGetPublicDetail, ResGetPublicPrice } from "./types";

const BASEPATH = "/public";

export const getPublic = async (token: string) =>
  (
    await client.get<ResGetPublic>(`${BASEPATH}`, {
      headers: {
        authorization: token,
      },
    })
  ).data;

export const getPublicPrice = async (token: string) =>
  (
    await client.get<ResGetPublicPrice>(`${BASEPATH}/price`, {
      headers: {
        authorization: token,
      },
    })
  ).data;

export const getPublicDetail = async (token: string) =>
  (
    await client.get<ResGetPublicDetail>(`${BASEPATH}/detail`, {
      headers: {
        authorization: token,
      },
    })
  ).data;
