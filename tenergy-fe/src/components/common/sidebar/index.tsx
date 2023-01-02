import { useLocation } from "react-router-dom";
import AuthComponent from "./auth";
import SimpleChart from "./simpleChart";
import { SideBarWrap } from "./styles";

export function SideBar() {
  const { pathname } = useLocation();

  return (
    <SideBarWrap
      className={`fixed bg-slate-900 shadow box-border pt-12 flex flex-col items-center ${
        pathname === "/auth" ? "auth" : ""
      }`}>
      {pathname === "/auth" ? <AuthComponent /> : <SimpleChart />}
    </SideBarWrap>
  );
}
