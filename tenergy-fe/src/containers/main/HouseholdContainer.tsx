import { getHouseholdInformation } from "@api";
import { HouseholdComponent } from "@component/main/HouseholdComponent";
import { useToken } from "@hook";
import { householdState } from "@store/atom";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

export function HouseholdContainer() {
  const token = useToken();
  const setHousehold = useSetRecoilState(householdState);
  const { data } = useQuery(
    ["getHouseholdInformation", token],
    () => getHouseholdInformation(token!),
    {
      enabled: token !== null,
      onSuccess: ({ price }) => {
        setHousehold(price);
      },
    }
  );

  return <HouseholdComponent data={data} />;
}
