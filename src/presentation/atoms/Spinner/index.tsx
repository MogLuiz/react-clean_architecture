import React from "react";

import Styles from "./styles.module.scss";

type TSpinnerProps = React.HTMLAttributes<HTMLElement>;

export const Spinner = (props: TSpinnerProps) => (
  <div {...props} className={[Styles.spinner, props.className].join(" ")} data-testid="spinner">
    <div />
    <div />
    <div />
    <div />
  </div>
);
