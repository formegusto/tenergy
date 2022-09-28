import { TradeRole } from "@api/types";
import { tag2 } from "@styles/font";
import { TradeRoleViewProps } from "./types";

const RoleText: { [key in TradeRole]: string } = {
  BUYER: "구매자",
  NONE: "참여 안함",
  SELLER: "판매자",
};

function TradeRoleView({ role }: TradeRoleViewProps) {
  return (
    <div
      className={[
        "px-1",
        "py-0.5",
        "rounded",
        role === "NONE" ? "text-rose-600" : "text-cyan-600",
        role === "NONE" ? "bg-rose-100" : "bg-cyan-100",
        tag2,
      ].join(" ")}
    >
      {RoleText[role]}
    </div>
  );
}

export default TradeRoleView;
