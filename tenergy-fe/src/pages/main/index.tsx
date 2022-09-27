import { MainContainer } from "@container";
import { WithAuth } from "@hoc";

function _MainPage() {
  return <MainContainer />;
}

export const MainPage = WithAuth(_MainPage);
