import { tokenState } from "@store/atom";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export function useToken() {
  const token = useRecoilValue(tokenState);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) navigate("/auth");
  }, [navigate, token]);

  return token;
}
