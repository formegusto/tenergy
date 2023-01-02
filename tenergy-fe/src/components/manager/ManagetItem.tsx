import styled from "styled-components";
import { TbReportSearch } from "react-icons/tb";

type ButtonProps = {
  setShowInput: (state: boolean) => void;
};

export function FileManagerButton({ setShowInput }: ButtonProps) {
  return (
    <Wrap onClick={() => setShowInput(true)}>
      <ManagerWrap>
        <TbReportSearch size={48} color="#999" />
        <Title>New Report</Title>
      </ManagerWrap>
    </Wrap>
  );
}

const ManagerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  color: #333;
`;

export function ManagerItem() {
  return (
    <Wrap>
      <Title>아파트1</Title>

      <Title>2019년 04월</Title>

      <Divide />
      <Comment>아파트1의 2019년 4월 미터데이터 asdfasfas</Comment>

      <Status>활성</Status>

      <DateText>
        {new Date("2022-12-29T05:55:48.907+00:00").toLocaleString("ko-KR")}
      </DateText>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;

  width: 350px;

  border: 2px solid #ccc;
  border-radius: 16px;

  cursor: pointer;

  padding: 16px 24px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;

  color: #444;
  padding: 0 6px;
`;

const Comment = styled.p`
  font-size: 18px;
  color: #999;

  padding: 0 6px;

  word-break: break-all;
`;

const Divide = styled.div`
  width: 100%;
  height: 2px;

  background: #ccc;

  margin: 12px 0;
`;

const Status = styled.h2`
  font-size: 36px;
  font-weight: bold;

  align-self: flex-end;
  color: #666;

  margin: 12px 0 0;
`;

const DateText = styled.h3`
  font-weight: 700;
  color: #333;
  align-self: flex-end;
`;
