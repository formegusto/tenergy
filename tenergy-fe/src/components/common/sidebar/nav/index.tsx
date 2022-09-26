import { INavItem, NavItems } from "./items";
import styled from "styled-components";
import { p3 } from "@styles/font";
import { NavLink } from "react-router-dom";

function NavItem({ title, to, value }: INavItem) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        "flex justify-between " +
        p3 +
        (isActive ? " text-slate-50 " : " text-slate-400 ") +
        "hover:text-slate-50 transition-colors"
      }
    >
      <p>{title}</p>
      {value && <p>{value.toLocaleString("ko-KR")}</p>}
    </NavLink>
  );
}

function Nav() {
  return (
    <NavWrap className="navs flex flex-col gap-y-3 mt-12">
      {NavItems.map((item, idx) => (
        <NavItem {...item} key={`nav-${idx}`} />
      ))}
    </NavWrap>
  );
}

const NavWrap = styled.div`
  width: calc(100% - 64px);
`;

export default Nav;
