import React from "react";

import Styles from "./styles.module.scss";

type TInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: TInputProps) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span className={Styles.status}>🔴</span>
    </div>
  );
};
