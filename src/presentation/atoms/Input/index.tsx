import { useLoginForm } from "@/presentation/pages/Login/hooks/useLoginForm";
import React from "react";

import Styles from "./styles.module.scss";

type TInputProps = {
  title?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ title = "", ...rest }: TInputProps) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  return (
    <div className={Styles.inputWrap}>
      <input {...rest} data-testid={rest.name} readOnly onFocus={enableInput} />
      <span
        data-testid={`${rest.name}-input-status`}
        title={title}
        className={Styles.status}
      >
        🔴
      </span>
    </div>
  );
};
