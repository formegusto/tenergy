import { getHouseholdPublic } from "@api";
import HouseholdPublicComponent from "@component/main/HouseholdPublicComponent";
import { useToken } from "@hook";
import { useQuery } from "@tanstack/react-query";

function HouseholdPublicContainer() {
  const token = useToken();
  const { data } = useQuery(
    ["getHouseholdPublic", token],
    () => getHouseholdPublic(token!),
    {
      enabled: token !== null,
    }
  );

  return <HouseholdPublicComponent data={data} />;
}

export default HouseholdPublicContainer;
