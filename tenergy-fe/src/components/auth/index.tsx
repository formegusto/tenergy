import { p2 } from "@styles/font";
import { AuthWrap } from "./styles";
import { AuthComponentProps } from "./types";

export function AuthComponent({
  name,
  onChange,
  onSubmit,
}: AuthComponentProps) {
  return (
    <AuthWrap
      className="flex flex-row justify-center items-center"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder="가구명을 적어주세요."
        className="w-96 h-12  box-border bg-transparent border-b-2 border-slate-300 px-3 text-slate-200"
        onChange={onChange}
        value={name}
      />
      <button
        className={
          p2 +
          [
            " text-slate-100",
            "py-2.5",
            "px-8",
            "border-solid",
            "border-2",
            "border-slate-50",
            "rounded-lg",
            "ml-6",
          ].join(" ")
        }
      >
        로그인
      </button>
    </AuthWrap>
  );
}
