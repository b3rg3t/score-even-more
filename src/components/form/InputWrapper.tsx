import { FC } from "react";
import { FieldError } from "react-hook-form";

interface IInputWrapper {
  label: string;
  name: string;
  error?: FieldError | any;
  children: React.ReactNode;
  checkbox?: boolean;
}

export const InputWrapper: FC<IInputWrapper> = ({
  label,
  name,
  error,
  children,
  checkbox,
}) => {
  if (checkbox) {
    return (
      <div className="w-100 d-flex flex-column">
        <label htmlFor={name} className="text-white d-flex gap-2">
          {children}
          {label}
        </label>
        {error && (
          <div className="p-2 rounded bg-danger-subtle mt-2" role="alert">
            <span>{error.message}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-100 d-flex flex-column">
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      {children}
      {error && (
        <div className="p-2 rounded bg-danger-subtle mt-2" role="alert">
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
};
