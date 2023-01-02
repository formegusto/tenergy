import { postManager } from "@api";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";

type InputProps = {
  setShowInput: (state: boolean) => void;
  refetch: any;
};

export function FileInput({ setShowInput, refetch }: InputProps) {
  const { mutate } = useMutation(["postManagerMutation"], postManager, {
    onSuccess: () => {
      refetch();
      setShowInput(false);
    },
  });
  const [comment, setComment] = React.useState<string>("");
  const [meterData, setMeterData] = React.useState<Blob>();

  React.useEffect(() => {
    console.log(meterData);
  }, [meterData]);

  const onSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (meterData) {
        const formData = new FormData();
        formData.append("comment", comment);
        formData.append("meterData", meterData);
        mutate(formData);
      }
    },
    [comment, meterData, mutate]
  );

  const onChange = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.name === "comment") setComment(e.target.value);
      else setMeterData(e.target.files![0]);
    },
    []
  );

  return (
    <Wrap>
      <ModalBack onClick={() => setShowInput(false)} />
      <Title>새 파일 업로드</Title>
      <Form onSubmit={onSubmit}>
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor="file_input">
          아파트명_년도-월 형식의 CSV를 업로드 해주세요.
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          onChange={onChange}
          name="meterData"
          accept=".csv"
        />
        <p className="mt-1 text-sm text-gray-500" id="file_input_help">
          ex)아파트1_2019-04.csv
        </p>
        <label
          htmlFor="last_name"
          className="block mt-4 mb-2 text-sm font-medium text-gray-900">
          간단한 설명을 적어주세요.
        </label>
        <input
          type="text"
          id="last_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Comment"
          required
          onChange={onChange}
          name="comment"
          value={comment}
        />
        <ButtonGroup>
          <button
            type="button"
            className="bg-slate-900 text-white font-bold py-2 px-6 rounded"
            onClick={() => setShowInput(false)}>
            닫기
          </button>
          <button
            type="submit"
            className="bg-slate-900 text-white font-bold py-2 px-6 rounded">
            생성
          </button>
        </ButtonGroup>
      </Form>
    </Wrap>
  );
}

const Title = styled.h1``;

const ButtonGroup = styled.div`
  align-self: flex-end;

  display: flex;
  column-gap: 8px;
  margin: 24px 0 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  position: absolute;

  width: 600px;

  background: white;

  padding: 28px 32px;
  border-radius: 16px;
  box-shadow: 4px 4px 2px rgba(51, 51, 51, 0.4);

  & > input[type="file"]::file-selector-button {
    border: none;
    outline: none;

    height: 42px;

    cursor: pointer;
    padding: 0 32px;

    color: #fff;
    background: #0f172a;
  }
`;

const ModalBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background: rgba(51, 51, 51, 0.5);
`;

const Wrap = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
`;
