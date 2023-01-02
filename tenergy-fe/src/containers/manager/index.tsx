import { getManager } from "@api";
import { ManagerComponent } from "@component/manager";
import { useQuery } from "@tanstack/react-query";

export function ManagerContainer() {
  const { data } = useQuery(["getManagers"], getManager);

  return data ? <ManagerComponent manager={data} /> : <></>;
}
