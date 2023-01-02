import { FileManager } from "@models/types";
import Express from "express";
import { StatusCodes } from "http-status-codes";

const routes = Express.Router();

routes.get(
  "/manager",
  async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    try {
      const managers = await FileManager.getList();

      return res.status(StatusCodes.OK).json(managers);
    } catch (err) {
      return next(err);
    }
  }
);

export default routes;
