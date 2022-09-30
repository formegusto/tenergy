import { householdState } from "@store/atom";
import { useRecoilValue } from "recoil";

function AuthComponent() {
  const household = useRecoilValue(householdState);

  return <></>;
}

export default AuthComponent;
