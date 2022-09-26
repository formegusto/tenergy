import { signIn, tokenCheck } from "@api";
import { authState, tokenState } from "@store/atom";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export function useAuth() {
  const [token, setToken] = useRecoilState(tokenState);
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  useQuery(["tokenCheck", token], () => tokenCheck(token!), {
    enabled: token !== null,
    onSuccess: (data) => {
      setAuth(data);
    },
  });
  const { mutate: authMutate } = useMutation(["authing"], signIn, {
    onSuccess: ({ token }) => {
      setToken(token);
    },
  });

  React.useEffect(() => {
    if (auth) navigate("/");
  }, [auth, navigate]);

  return [authMutate];
}
