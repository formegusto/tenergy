import { SideBar } from "@component/common";
import { Outlet } from "react-router-dom";
import { ContentWrap, RootWrap } from "./styles";

export function RootPage() {
  return (
    <RootWrap>
      <SideBar />
      <ContentWrap className="bg-slate-50">
        <Outlet />
      </ContentWrap>
    </RootWrap>
  );
}
