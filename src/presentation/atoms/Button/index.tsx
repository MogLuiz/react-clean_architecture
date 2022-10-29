import React from "react";

import "./styles.module.scss";

type TButtonProps = {
  textButton: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ textButton, ...rest }: TButtonProps) => (
  <button {...rest}>{textButton}</button>
);
