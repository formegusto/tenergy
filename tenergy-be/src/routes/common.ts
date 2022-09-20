import Express from "express";
import { setRoutes } from "@utils";

export class AutoRoutes {
  routes: Express.Router;

  constructor(dirname: string) {
    this.routes = Express.Router();
    setRoutes.call(this, dirname);
  }
}
