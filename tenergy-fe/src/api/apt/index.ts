import { APT } from "@store/types";
import client from "../client";
import { ResGetAnalysis, ResGetAptDetail, ResGetChart } from "./types";

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

export const getAptAnalysis = async (token: string) =>
  (
    await client.get<ResGetAnalysis>(`${BASEPATH}/analysis`, {
      headers: {
        authorization: token,
      },
    })
  ).data;
