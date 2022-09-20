import Express from "express";
import { adminCheck, loginCheck } from "@mw";
import { APT } from "@models/APT/types";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";
import { ResGetChartBody } from "./types";

const routes = Express.Router();

// APT 간단 통합정보, 아파트, 세대, 전력거래, 공동설비
routes.get(
  "/",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    return res.send("test");
  }
);

// APT 상세 통합정보, 아파트, 세대, 전력거래, 공동설비
routes.get(
  "/detail",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    return res.send("test");
  }
);

// chart data
routes.get(
  "/chart",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response<ResGetChartBody>) => {
    const apt = await APT.init();
    const chartDatas = _.map(apt.timeMeterDatas, (timeMeter) => timeMeter.sum);

    return res.status(StatusCodes.OK).json({
      total: apt.usage,
      usages: chartDatas,
    });
  }
);

// analyzer
routes.get(
  "/analysis",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    return res.send("test");
  }
);

export default routes;
