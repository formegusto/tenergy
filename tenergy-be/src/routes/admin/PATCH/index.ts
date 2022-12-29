import CSVReader from "@libs/CSVReader";
import { FileManager } from "@models/types";
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

    const fileManager = await FileManager.getById(id);

    const csvReader = await CSVReader.get(fileManager.path);
    await fileManager.updateStatus("READY");

    return res.status(StatusCodes.OK).send({
      status: true,
      message: "작업 시작합니다.",
    });
  }
);

export default routes;
