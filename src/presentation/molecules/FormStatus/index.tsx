import React from "react";

import { Spinner } from "@/presentation/atoms/Spinner";

import Styles from "./styles.module.scss";

export type TFormStatusProps = {
  isLoading: boolean;
  errorMessage: string;
};

export const FormStatus = ({ isLoading, errorMessage }: TFormStatusProps) => (
  <div className={Styles.errorWrap}>
    {isLoading && <Spinner className={Styles.spinner} />}
     <span aria-label="error message" data-testid="main-error" className={Styles.error}>{errorMessage}</span>
  </div>
);
