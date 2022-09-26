import React from "react";
import { useRecoilValue } from "recoil";
import { authState } from "@store/atom";
import { useNavigate } from "react-router-dom";

export function WithAuth(Component: React.ComponentType) {
  return function WithAuthComponent() {
    const auth = useRecoilValue(authState);
    const navigate = useNavigate();

    React.useEffect(() => {
      console.log(auth);
      if (!auth) {
        navigate("/auth");
      }
    }, [auth, navigate]);

    return auth ? <Component /> : <></>;
  };
}
