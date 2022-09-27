import { PartToKR } from "@component/common/chart/common";
import { PartPalette } from "@styles/colors";
import { h5, p2 } from "@styles/font";
import { DataCardProps } from "./types";

function DataCard({ type }: DataCardProps) {
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
        <h5>{(6439541).toLocaleString("ko-KR")} 원</h5>
      </div>
      <div className="flex flex-col values-group mt-8 gap-y-1">
        <div
          className={
            p2 +
            [" value-group-row", "flex", "flex-row", "justify-between"].join(
              " "
            )
          }
        >
          <p>세대</p>
          <p>{(2048418).toLocaleString("ko-KR")} 원</p>
        </div>
        <div
          className={
            p2 +
            [" value-group-row", "flex", "flex-row", "justify-between"].join(
              " "
            )
          }
        >
          <p>세대</p>
          <p>{(2048418).toLocaleString("ko-KR")} 원</p>
        </div>
        <div
          className={
            p2 +
            [" value-group-row", "flex", "flex-row", "justify-between"].join(
              " "
            )
          }
        >
          <p>세대</p>
          <p>{(2048418).toLocaleString("ko-KR")} 원</p>
        </div>
      </div>
    </div>
  );
}

export default DataCard;
