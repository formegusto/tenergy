import { PublicContainer } from "@container/public";
import { WithAuth } from "@hoc";

function _PublicPage() {
  return <PublicContainer />;
}

export const PublicPage = WithAuth(_PublicPage);
