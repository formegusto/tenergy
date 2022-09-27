import { ApartmentContainer } from "@container/apartment";
import { WithAuth } from "@hoc";

function _ApartmentPage() {
  return <ApartmentContainer />;
}

export const ApartmentPage = WithAuth(_ApartmentPage);
