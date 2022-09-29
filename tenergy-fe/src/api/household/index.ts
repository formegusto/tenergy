import client from "../client";
import { ResGetHouseholdInformation } from "./types";

const BASEPATH = "/household";

export const getHouseholdInformation = async (token: string) =>
  (
    await client.get<ResGetHouseholdInformation>(`${BASEPATH}`, {
      headers: {
        authorization: token,
      },
    })
  ).data;
