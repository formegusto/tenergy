import { getChart } from "@api";
import { AdminMainComponent, HouseholdMainComponent } from "@component";
import { useToken } from "@hook";
import { authState } from "@store/atom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { HouseholdContainer } from "./HouseholdContainer";
import HouseholdFeedbackContainer from "./HouseholdFeedbackContainer";
import HouseholdPublicContainer from "./HouseholdPublicContainer";

export function MainContainer() {
  const auth = useRecoilValue(authState);

  return auth && auth.role === "ADMIN" ? (
    <AdminMainContainer />
  ) : (
    <HouseholdMainContainer />
  );
}

export function AdminMainContainer() {
  const token = useToken();
  const { data: aptData } = useQuery(
    ["getChart", token],
    () => getChart(token!),
    {
      enabled: token !== null,
    }
  );

  return aptData ? (
    <AdminMainComponent total={aptData.total} datas={aptData.usages} />
  ) : (
    <></>
  );
}

export function HouseholdMainContainer() {
  return (
    <>
      <HouseholdMainComponent />
      <HouseholdContainer />
      <HouseholdPublicContainer />
      <HouseholdFeedbackContainer />
    </>
  );
}
