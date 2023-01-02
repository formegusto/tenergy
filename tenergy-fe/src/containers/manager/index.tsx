import { getManager, setNewManager } from "@api";
import { ManagerComponent } from "@component/manager";
import { useMutation, useQuery } from "@tanstack/react-query";

export function ManagerContainer() {
  const { data, refetch } = useQuery(["getManagers"], getManager);
  const { mutate: setManagerMutate } = useMutation(
    ["setNewManager"],
    setNewManager,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return data ? (
    <ManagerComponent
      manager={data}
      refetch={refetch}
      setManagerMutate={setManagerMutate}
    />
  ) : (
    <></>
  );
}
