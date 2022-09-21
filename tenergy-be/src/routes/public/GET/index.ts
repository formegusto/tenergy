import Express from "express";
import Distributor from "@libs/Distributor";
import { adminCheck, loginCheck } from "@mw";
import { StatusCodes } from "http-status-codes";

const routes = Express.Router();

routes.get(
  "/",
  loginCheck,
  adminCheck,
  async (req: Express.Request, res: Express.Response) => {
    const distributor = await Distributor.init();
    await distributor.build();

    return res.status(StatusCodes.OK).json({
      privatePrice: distributor.apt.compares![0].after.public,
      distributePrices: distributor.distributeGroup,
    });
  }
);

export default routes;
