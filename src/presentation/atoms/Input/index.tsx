import React from "react";

import Styles from "./styles.module.scss";

type TInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: TInputProps) => (
  <div className={Styles.inputWrap}>
    <input {...props} />
    <span className={Styles.status}>🔴</span>
  </div>
);
