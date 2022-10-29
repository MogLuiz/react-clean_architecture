import React from "react";

import Styles from "./spinner-styles.scss";

type TSpinnerProps = React.HTMLAttributes<HTMLElement>;

export const Spinner = (props: TSpinnerProps) => (
  <div {...props} className={[Styles.spinner, props.className].join(" ")}>
    <div />
    <div />
    <div />
    <div />
  </div>
);
