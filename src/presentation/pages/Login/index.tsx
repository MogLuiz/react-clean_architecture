import React from "react";

import { Spinner } from "@/presentation/components/atoms/Spinner";
import { Footer } from "@/presentation/components/atoms/Footer";

import { LoginHeader } from "@/presentation/components/molecules/LoginHeader";

import Styles from "./styles.module.scss";

export const Login = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />

      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <span className={Styles.status}>🔴</span>
        </div>
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
