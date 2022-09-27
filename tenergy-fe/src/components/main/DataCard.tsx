import { PartToKR } from "@component/common/chart/common";
import { PartPalette } from "@styles/colors";
import { h5, p2 } from "@styles/font";
import _ from "lodash";
import { DataCardProps } from "./types";

function DataCard({
  type,
  titleValue,
  titleUnit,
  keys,
  values,
}: DataCardProps) {
  return (
    <div className="datacard-wrap flex flex-col flex-1">
      <div
        className={
          "bg" + PartPalette[type] + [" w-12", "h-1", "mb-1"].join(" ")
        }
      />
      <div
        className={
          h5 + [" top-group", "flex", "flex-row", "justify-between"].join(" ")
        }
      >
        <h5>{PartToKR[type]}</h5>
        <h5>
          {titleValue.toLocaleString("ko-KR")} {titleUnit}
        </h5>
      </div>
      <div className="flex flex-col values-group mt-8 gap-y-1">
        {_.map(_.zip(keys, values), ([key, value]) => (
          <div
            className={
              p2 +
              [" value-group-row", "flex", "flex-row", "justify-between"].join(
                " "
              )
            }
          >
            <p>{key}</p>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataCard;
