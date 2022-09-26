import { INavItem, NavItems } from "./items";
import styled from "styled-components";

function NavItem({ title, isActive, value }: INavItem) {
  return <ItemWrap className="flex justify-between"></ItemWrap>;
}

const ItemWrap = styled.div``;

function Nav() {
  return (
    <NavWrap className="nav">
      {NavItems.map((item, idx) => (
        <NavItem {...item} key={`nav-${idx}`} />
      ))}
    </NavWrap>
  );
}

const NavWrap = styled.div``;

export default Nav;
