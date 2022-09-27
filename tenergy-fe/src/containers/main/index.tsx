import { getChart } from "@api";
import { MainComponent } from "@component";
import { useToken } from "@hook";
import { useQuery } from "@tanstack/react-query";

export function MainContainer() {
  const token = useToken();
  const { data } = useQuery(["getChart", token], () => getChart(token!), {
    enabled: token !== null,
  });

  return data ? <MainComponent datas={data.usages} /> : <></>;
}
