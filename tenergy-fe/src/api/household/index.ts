import client from "../client";
import {
  FeedbackType,
  ResGetHouseholdFeedback,
  ResGetHouseholdInformation,
  ResGetHouseholdPublic,
} from "./types";

const BASEPATH = "/household";

export const getHouseholdInformation = async (token: string) =>
  (
    await client.get<ResGetHouseholdInformation>(`${BASEPATH}`, {
      headers: {
        authorization: token,
      },
    })
  ).data;

export const getHouseholdPublic = async (token: string) =>
  (
    await client.get<ResGetHouseholdPublic>(`${BASEPATH}/public`, {
      headers: {
        authorization: token,
      },
    })
  ).data;

export const getHouseholdFeedback = async (token: string, type: FeedbackType) =>
  (
    await client.get<ResGetHouseholdFeedback>(
      `${BASEPATH}/feedback?type=${type}`,
      {
        headers: {
          authorization: token,
        },
      }
    )
  ).data;
