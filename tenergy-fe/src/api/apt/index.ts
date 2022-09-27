import { APT } from "@store/types";
import client from "../client";
import { ResGetAptDetail, ResGetChart } from "./types";

const BASEPATH = "/apt";

export const getApt = async (token: string) =>
  (
    await client.get<APT>(`${BASEPATH}`, {
      headers: { authorization: token },
    })
  ).data;

export const getChart = async (token: string) =>
  (
    await client.get<ResGetChart>(`${BASEPATH}/chart`, {
      headers: {
        authorization: token,
      },
    })
  ).data;

export const getAptDetail = async (token: string) =>
  (
    await client.get<ResGetAptDetail>(`${BASEPATH}/detail`, {
      headers: {
        authorization: token,
      },
    })
  ).data;
