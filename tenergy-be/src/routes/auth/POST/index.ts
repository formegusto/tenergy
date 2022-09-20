import { Auth } from "@models/types";
import { generateToken } from "@utils";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import { ReqSignInBody, ResSignInBody } from "./types";
import _ from "lodash";

const routes = Express.Router();

routes.post(
  "/",
  async (
    req: Express.Request<any, ResSignInBody, ReqSignInBody>,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { name } = req.body;
    try {
      const auth = await Auth.find(name);
      const token = generateToken(_.toPlainObject(auth), "1d");

      return res.status(StatusCodes.OK).json({ token });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }
);

export default routes;
