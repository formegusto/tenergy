import { setNewManager } from "@api";
import { Manager } from "@store/types";
import { UseMutateFunction } from "@tanstack/react-query";
import _ from "lodash";
import React from "react";
import styled from "styled-components";
import { FileInput } from "./FileInput";
import { FileManagerButton, ManagerItem } from "./ManagetItem";

type Props = {
  manager: Manager[];
  refetch: any;
  setManagerMutate: UseMutateFunction<any, unknown, string, unknown>;
};

export function ManagerComponent({ manager, refetch }: Props) {
  const [showInput, setShowInput] = React.useState<boolean>(false);

  return (
    <Wrap>
      <FileManagerButton setShowInput={setShowInput} />
      {_.map(manager, (man) => (
        <ManagerItem
          key={man._id}
          {...man}
          onClick={() => setNewManager(man._id)}
        />
      ))}
      {showInput && <FileInput setShowInput={setShowInput} refetch={refetch} />}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;

  display: flex;
  column-gap: 16px;
  row-gap: 16px;
  flex-wrap: wrap;
`;
