import Express from "express";

export type DefaultRoutes = {
  routes: Express.Router;
};

export const METHODS = ["GET", "POST", "PATCH", "PUT", "DELETE"];

export const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
