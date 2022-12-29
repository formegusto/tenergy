import StoreGuide from "@libs/StoreGuide";
import Express from "express";
import { StatusCodes } from "http-status-codes";

const routes = Express.Router();

// routes.patch("/active", (req, res) => {
//   return res.status(StatusCodes.OK).send();
// });

routes.put(
  "/active/:id",
  async (req: Express.Request, res: Express.Response) => {
    const { id } = req.params;

    StoreGuide.recovery(id);

    return res.status(StatusCodes.OK).send({
      status: true,
      message: "작업 시작합니다.",
    });
  }
);

export default routes;
