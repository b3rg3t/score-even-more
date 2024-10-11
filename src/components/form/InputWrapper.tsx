import { FC } from "react";
import { FieldError } from "react-hook-form";

interface IInputWrapper {
  label: string;
  error?: FieldError | any;
  children: React.ReactNode;
}

export const InputWrapper: FC<IInputWrapper> = ({ label, error, children }) => {
  return (
    <>
      <label>
        {label}
        {children}
      </label>
      {error && <div className="p-2 rounded bg-danger-subtle">{error.message}</div>}
    </>
  );
};
