import "module-alias/register";
import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import http from "http";

import { init } from "@models/connect";
import routes from "@routes";
import errorHandler from "@routes/error";

dotenv.config();

class App {
  app: Express.Application;

  constructor() {
    this.app = Express();

    this.SetMW();
    this.SetRoutes();
  }

  SetMW() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(Express.json());
  }

  SetRoutes() {
    this.app.use(routes);
    this.app.use(errorHandler);
  }

  async Start() {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
    this.app.listen(port, () => {
      console.log(`[ Express ] Start Server PORT ${port}`);
    });

    await init();
  }
}

export default new App().Start();
