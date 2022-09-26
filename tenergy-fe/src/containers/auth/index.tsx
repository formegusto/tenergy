import { AuthComponent } from "@component";
import { useAuth } from "@hook";
import React from "react";

export function AuthContainer() {
  const [name, setName] = React.useState<string>("");
  const [authMutate] = useAuth();

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    []
  );

  const onSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      authMutate({
        name,
      });
    },
    [name, authMutate]
  );

  return <AuthComponent name={name} onChange={onChange} onSubmit={onSubmit} />;
}
