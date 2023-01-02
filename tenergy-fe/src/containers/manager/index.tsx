import { getManager } from "@api";
import { ManagerComponent } from "@component/manager";
import { useQuery } from "@tanstack/react-query";

export function ManagerContainer() {
  const { data, refetch } = useQuery(["getManagers"], getManager);

  return data ? <ManagerComponent manager={data} refetch={refetch} /> : <></>;
}
