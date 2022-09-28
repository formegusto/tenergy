import { h4, h5, p2 } from "@styles/font";
import _ from "lodash";
import { GlobalDataCardProps } from "./types";

export function GlobalDataCard({
  title,
  titleValue,
  titleUnit,
  keys,
  values,
}: GlobalDataCardProps) {
  return (
    <div className="data-card flex-1 bg-slate-100 shadow-md rounded-2xl text-slate-900">
      <div className="data-card-top px-6 py-4 box-border">
        <p className={h5 + [" data-card-title", "mb-1"].join(" ")}>{title}</p>
        <h4 className={h4 + [" text-center"].join(" ")}>
          {titleValue.toLocaleString("ko-KR")}
          {titleUnit}
        </h4>
      </div>
      {keys && values && (
        <div className="flex flex-col data-card-content px-6 py-4 box-border gap-y-1">
          {_.map(_.zip(keys, values), ([key, value]) => (
            <div
              className={
                p2 +
                [" content-row", "flex", "flex-row", "justify-end"].join(" ")
              }
            >
              <p>{key}</p>
              <p className="flex-1 text-end">
                {value!.toLocaleString("ko-KR")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
