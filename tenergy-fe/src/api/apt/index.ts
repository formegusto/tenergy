import client from "../client";

const BASEPATH = "/apt";

export const getChart = async (token: string) =>
  (
    await client.get(`${BASEPATH}/chart`, {
      headers: {
        authorization: token,
      },
    })
  ).data;
