import client from "../client";
import { ResGetChart } from "./types";

const BASEPATH = "/apt";

export const getChart = async (token: string) =>
  (
    await client.get<ResGetChart>(`${BASEPATH}/chart`, {
      headers: {
        authorization: token,
      },
    })
  ).data;
