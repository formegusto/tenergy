import { HouseholdNavItems, INavItem, NavItems } from "./items";
import styled from "styled-components";
import { p3 } from "@styles/font";
import { NavLink } from "react-router-dom";
import { NavProps } from "./types";

function NavItem({ title, to, value, isHousehold }: INavItem) {
  return isHousehold ? (
    <div className={["flex", "justify-between", "text-slate-50"].join(" ")}>
      <p>{title}</p>
      <p>{value && value.toLocaleString("ko-KR")}</p>
    </div>
  ) : (
    <NavLink
      to={to!}
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

function Nav({ price, isHousehold }: NavProps) {
  return (
    <NavWrap className="navs flex flex-col gap-y-3 mt-12">
      {isHousehold
        ? HouseholdNavItems.map((item, idx) => (
            <NavItem {...item} value={price[idx]} key={`nav-${idx}`} />
          ))
        : NavItems.map((item, idx) => (
            <NavItem
              {...item}
              value={idx !== 0 ? price[idx - 1] : undefined}
              key={`nav-${idx}`}
            />
          ))}
    </NavWrap>
  );
}

const NavWrap = styled.div`
  width: calc(100% - 64px);
`;

export default Nav;
