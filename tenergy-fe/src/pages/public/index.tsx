import { WithAuth } from "@hoc";

function _PublicPage() {
  return <>퍼블릭</>;
}

export const PublicPage = WithAuth(_PublicPage);
