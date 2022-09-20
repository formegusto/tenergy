import Express from "express";
import { adminCheck, loginCheck } from "@mw";
import { ReqChartDataParams } from "./types";

const routes = Express.Router();

// APT 통합정보, 아파트, 세대, 전력거래, 공동설비
routes.get(
  "/",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    return res.send("test");
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

// N d chart
routes.get(
  "/:d",
  loginCheck,
  adminCheck,
  async (req: Express.Request<ReqChartDataParams>, res: Express.Response) => {
    const { d } = req.params;

    return res.send(d);
  }
);

export default routes;
