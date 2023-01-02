import { ManagerContainer } from "@container";
import { WithAuth } from "@hoc";

function _ManagerPage() {
  return <ManagerContainer />;
}

export const ManagerPage = WithAuth(_ManagerPage);
