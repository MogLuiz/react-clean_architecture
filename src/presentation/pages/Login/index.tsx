import React from "react";

import { Spinner } from "@/presentation/atoms/Spinner";
import { Footer } from "@/presentation/atoms/Footer";
import { Input } from "@/presentation/atoms/Input";

import { LoginHeader } from "@/presentation/molecules/LoginHeader";

import Styles from "./styles.module.scss";

export const Login = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />

      <form className={Styles.form}>
        <h2>Login</h2>

        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />

        <button className={Styles.submit} type="submit">
          Entrar
        </button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>

      <Footer />
    </div>
  );
};
