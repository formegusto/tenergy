import { PartToKR } from "@component/common/chart/common";
import { PartPalette } from "@styles/colors";
import { h5 } from "@styles/font";
import { DataCardProps } from "./types";

function DataCard({ type }: DataCardProps) {
  return (
    <div className="datacard-wrap flex flex-col flex-1">
      <div className={"bg" + PartPalette[type] + [" w-12", "h-1"].join(" ")} />
      <h5 className={h5}>{PartToKR[type]}</h5>
    </div>
  );
}

export default DataCard;
