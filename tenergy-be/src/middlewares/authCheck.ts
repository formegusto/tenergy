import Express from "express";
import jwt from "jsonwebtoken";

import { StatusCodes } from "http-status-codes";

import { ResponseError } from "@common";

export function loginCheck(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  const secret = process.env.JWT_SECRET!;
  const { authorization: token } = req.headers;

  if (!token)
    return next(
      new ResponseError(StatusCodes.FORBIDDEN, "올바르지 않은 접근 입니다.")
    );

  try {
    const tokenCheck = jwt.verify(token, secret) as any;
  } catch (err) {
    return next(
      new ResponseError(StatusCodes.UNAUTHORIZED, "올바르지 않은 접근 입니다.")
    );
  }

  return next();
}
