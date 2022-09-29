import { getHouseholdInformation } from "@api";
import { HouseholdComponent } from "@component/main/HouseholdComponent";
import { useToken } from "@hook";
import { useQuery } from "@tanstack/react-query";

export function HouseholdContainer() {
  const token = useToken();
  const { data } = useQuery(
    ["getHouseholdInformation", token],
    () => getHouseholdInformation(token!),
    {
      enabled: token !== null,
    }
  );

  return <HouseholdComponent data={data} />;
}
