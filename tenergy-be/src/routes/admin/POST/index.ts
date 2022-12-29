import { ResponseError } from "@common";
import { AdminModel } from "@models";
import { csvUpload } from "@mw";
import Express from "express";
import { StatusCodes } from "http-status-codes";

const routes = Express.Router();

routes.post("/", async (_: Express.Request, res: Express.Response) => {
  const admin = await AdminModel.create({});

  return res.status(StatusCodes.CREATED).json(admin);
});

routes.post(
  "/meterData",
  csvUpload,
  async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { comment } = req.body;
    const file = req.file;

    if (!file)
      return next(
        new ResponseError(
          StatusCodes.BAD_REQUEST,
          "CSV 파일이 발견되지 않았습니다."
        )
      );

    const { originalname, path } = file;
    const [buildingName, date] = originalname.split(".")[0].split("_");
    if (!buildingName || !date)
      return next(
        new ResponseError(
          StatusCodes.BAD_REQUEST,
          "올바르지 않은 파일 이름 형식 입니다."
        )
      );

    const [year, month] = date.split("-");
    if (!year || !month)
      return next(
        new ResponseError(
          StatusCodes.BAD_REQUEST,
          "올바르지 않은 파일 이름 형식 입니다."
        )
      );

    // 모두 끝난 상태를 기준으로
    // status : PENDING, READY, STEP1, STEP2, ACTIVE
    console.log({
      comment,
      path,
      buildingName,
      year,
      month,
      status: "PENDING",
    });

    return res.status(StatusCodes.CREATED).json();
  }
);

export default routes;
