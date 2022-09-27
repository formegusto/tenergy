import { h4, h5, p2 } from "@styles/font";

export function GlobalDataCard() {
  return (
    <div className="data-card flex-1 bg-slate-100 shadow-md rounded-2xl text-slate-900">
      <div className="data-card-top px-6 py-4 box-border">
        <p className={h5 + [" data-card-title", "mb-1"].join(" ")}>아파트</p>
        <h4 className={h4 + [" text-center"].join(" ")}>
          {(39744).toLocaleString("ko-KR")}kWh
        </h4>
      </div>
      <div className="flex flex-col data-card-content px-6 py-4 box-border gap-y-1">
        <div
          className={
            p2 + [" content-row", "flex", "flex-row", "justify-end"].join(" ")
          }
        >
          <p>기본요금</p>
          <p className="flex-1 text-end">{(7300).toLocaleString("ko-KR")}</p>
        </div>
        <div
          className={
            p2 + [" content-row", "flex", "flex-row", "justify-end"].join(" ")
          }
        >
          <p>기본요금</p>
          <p className="flex-1 text-end">{(7300).toLocaleString("ko-KR")}</p>
        </div>
        <div
          className={
            p2 + [" content-row", "flex", "flex-row", "justify-end"].join(" ")
          }
        >
          <p>기본요금</p>
          <p className="flex-1 text-end">{(7300).toLocaleString("ko-KR")}</p>
        </div>
        <div
          className={
            p2 + [" content-row", "flex", "flex-row", "justify-end"].join(" ")
          }
        >
          <p className="flex-1 text-end">{(7300).toLocaleString("ko-KR")}</p>
        </div>
      </div>
    </div>
  );
}
