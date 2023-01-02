import { Manager } from "@store/types";
import _ from "lodash";
import React from "react";
import styled from "styled-components";
import { FileInput } from "./FileInput";
import { FileManagerButton, ManagerItem } from "./ManagetItem";

type Props = {
  manager: Manager[];
};

export function ManagerComponent({ manager }: Props) {
  const [showInput, setShowInput] = React.useState<boolean>(false);

  return (
    <Wrap>
      <FileManagerButton setShowInput={setShowInput} />
      {_.map(manager, (man) => (
        <ManagerItem key={man._id} {...man} />
      ))}
      {showInput && <FileInput setShowInput={setShowInput} />}
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
