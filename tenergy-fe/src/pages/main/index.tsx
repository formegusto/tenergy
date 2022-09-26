import { WithAuth } from "@hoc";

function _MainPage() {
  return <>메인</>;
}

export const MainPage = WithAuth(_MainPage);
