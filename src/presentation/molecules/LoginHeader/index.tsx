import React, { memo } from "react";

import { Logo } from "@/presentation/atoms/Logo";

import Styles from "./styles.module.scss";

const LoginHeaderComponent = () => (
  <header className={Styles.header}>
    <Logo />
    <h1>4Dev - Enquetes para Programadores</h1>
  </header>
);

export const LoginHeader = memo(LoginHeaderComponent)
