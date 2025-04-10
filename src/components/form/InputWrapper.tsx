import { FC } from "react";
import { FieldError } from "react-hook-form";

interface IInputWrapper {
  label: string;
  name: string;
  error?: FieldError | any;
  children: React.ReactNode;
  checkbox?: boolean;
  className?: string;
  helpText?: string
}

export const InputWrapper: FC<IInputWrapper> = ({
  label,
  name,
  error,
  children,
  checkbox,
  className,
  helpText
}) => {
  const containerClasses = `w-100 d-flex flex-column ${className}`

  if (checkbox) {
    return (
      <div className={containerClasses}>
        <div className="form-check form-switch">
          {children}
          <label htmlFor={name} className="text-white d-flex gap-2">
            {label}
          </label>
          <span className="font-sm text-lightgray">{helpText}</span>
        </div>
        {error && (
          <div className="p-2 rounded bg-danger-subtle mt-2" role="alert">
            <span>{error.message}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      {children}
      <span className="font-sm text-lightgray">{helpText}</span>
      {error && (
        <div className="p-2 rounded bg-danger-subtle mt-2" role="alert">
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
};
