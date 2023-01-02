import React from "react";
import styled from "styled-components";
import { FileInput } from "./FileInput";
import { FileManagerButton, ManagerItem } from "./ManagetItem";

export function ManagerComponent() {
  const [showInput, setShowInput] = React.useState<boolean>(false);

  return (
    <Wrap>
      <FileManagerButton setShowInput={setShowInput} />
      <ManagerItem />
      <ManagerItem />
      <ManagerItem />
      <ManagerItem />
      <ManagerItem />
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
