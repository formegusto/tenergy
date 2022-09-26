import { Logo } from "@assets";
import Nav from "./nav";
import { SideBarWrap } from "./styles";

export function SideBar() {
  return (
    <SideBarWrap className="bg-slate-900 shadow box-border pt-12 flex flex-col items-center relative">
      <img className="logo" src={Logo.LogoX3} alt="tenergy-logo" />
      <Nav />
    </SideBarWrap>
  );
}
