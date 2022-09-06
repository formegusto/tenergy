import { dbConnect, dbDisconnect } from "./models";
import dotenv from "dotenv";
import _ from "lodash";
import APT from "./APT";

const publicPercentage = 30;
(async function () {
  dotenv.config();
  await dbConnect();

  const apt = await APT.init(publicPercentage);
  apt.show();

  //   const dataTest = await TimeMeterDataModel.aggregate([
  //     {
  //       $project: {
  //         data: {
  //           $filter: {
  //             input: "$data",
  //             as: "d",
  //             cond: { $eq: ["$$d.name", "아파트1-104-1206"] },
  //           },
  //         },
  //         time: 1,
  //       },
  //     },
  //   ]).sort({ time: "asc" });

  //   console.log(_.map(dataTest));

  dbDisconnect();
})();
