import Express from "express";
import { ResponseError, ServerError } from "@common";

export default function errorHandler(
  err: ResponseError,
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  if (!err.hasOwnProperty("statusCode")) return next(ServerError);

  return res.status(err.statusCode).json({
    name: err.name,
    message: err.message,
  });
}
