import Express from "express";
import { setRoutes } from "@utils";
import { adminCheck, loginCheck } from "@mw";

export class AutoRoutes {
  routes: Express.Router;

  constructor(dirname: string, setMW?: (this: AutoRoutes) => void) {
    this.routes = Express.Router();
    if (setMW) setMW.call(this);
    setRoutes.call(this, dirname);
  }
}

export function setLoginCheckMW(this: AutoRoutes) {
  this.routes.use(loginCheck);
}

export function setAdminCheckMW(this: AutoRoutes) {
  this.routes.use(loginCheck);
  this.routes.use(adminCheck);
}
