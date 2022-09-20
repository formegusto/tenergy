import { UnauthError } from "@common";
import { Auth } from "@models/types";
import { decryptToken } from "@utils";
import Express from "express";
import { StatusCodes } from "http-status-codes";

const routes = Express.Router();

routes.get(
  "/",
  async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) throw UnauthError;

      const authByToken = decryptToken(token);
      const auth = await Auth.find(authByToken.name);

      return res.status(StatusCodes.OK).json(auth);
    } catch (err) {
      return next(err);
    }
  }
);

export default routes;
