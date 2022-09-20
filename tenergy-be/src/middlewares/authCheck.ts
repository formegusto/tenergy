import Express from "express";
import jwt from "jsonwebtoken";

import { StatusCodes } from "http-status-codes";

import { ResponseError, UnauthError } from "@common";
import { Auth } from "@models/types";

export async function loginCheck(
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
    const authByToken = jwt.verify(token, secret) as Auth;
    const auth = await Auth.find(authByToken.name);
    req.auth = auth;

    return next();
  } catch (err) {
    return next(err);
  }
}

export async function adminCheck(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  const auth = req.auth;
  if (!auth || auth.role !== "ADMIN") return next(UnauthError);

  return next();
}
