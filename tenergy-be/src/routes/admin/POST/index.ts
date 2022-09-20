import { AdminModel } from "@models";
import Express from "express";
import { StatusCodes } from "http-status-codes";

const routes = Express.Router();

routes.post("/", async (_: Express.Request, res: Express.Response) => {
  const admin = await AdminModel.create({});

  return res.status(StatusCodes.CREATED).json(admin);
});

export default routes;
