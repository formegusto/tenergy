import styled from "styled-components";

export const SideBarWrap = styled.section`
  width: 316px;
  height: 100vh;
  min-height: 780px;

  & > .logo {
    width: 109px;
  }

  transition: 0.75s;

  &.auth {
    width: 100vw;
  }
`;
