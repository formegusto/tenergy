import Express from "express";

export type DefaultRoutes = {
  routes: Express.Router;
};

export const METHODS = ["GET", "POST", "PATCH", "PUT", "DELETE"];
