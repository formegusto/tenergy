import client from "../client";
import { ResGetPublic } from "./types";

const BASEPATH = "/public";

export const getPublic = async (token: string) =>
  (
    await client.get<ResGetPublic>(`${BASEPATH}`, {
      headers: {
        authorization: token,
      },
    })
  ).data;
