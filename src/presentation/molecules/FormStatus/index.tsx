import React from "react";

import { Spinner } from "@/presentation/atoms/Spinner";

import Styles from "./styles.module.scss";

export const FormStatus = () => (
  <div className={Styles.errorWrap}>
    <Spinner className={Styles.spinner} />
    <span className={Styles.error}>Erro</span>
  </div>
);
