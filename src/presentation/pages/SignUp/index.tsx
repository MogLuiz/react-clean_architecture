import React from "react";

import { Link, useNavigate } from "react-router-dom";

import { Footer } from "@/presentation/atoms/Footer";
import { Input } from "@/presentation/atoms/Input";
import { Button } from "@/presentation/atoms/Button";

import { LoginHeader } from "@/presentation/molecules/LoginHeader";
import { FormStatus } from "@/presentation/molecules/FormStatus";

import Styles from "@/presentation/pages/shared/styles.module.scss";

export const SignUp = () => {
  return (
    <div className={Styles.wrapper}>
      <LoginHeader />

      <form role="form" className={Styles.form}>
        <h2>Criar Conta</h2>

        <Input
          type="text"
          title={""}
          name="name"
          aria-label="form name field"
          placeholder="Digite seu nome"
          onChange={
            (event) => {}
            // setFormState({ ...formState, email: event.target.value })
          }
        />
        <Input
          type="email"
          title={""}
          name="email"
          aria-label="form email field"
          placeholder="Digite seu e-mail"
          onChange={
            (event) => {}
            // setFormState({ ...formState, email: event.target.value })
          }
        />
        <Input
          type="password"
          title={""}
          name="password"
          aria-label="form password field"
          placeholder="Digite sua senha"
          onChange={
            (event) => {}
            // setFormState({ ...formState, password: event.target.value })
          }
        />
        <Input
          type="password"
          title={""}
          name="passwordConfirmation"
          aria-label="form password confirmation field"
          placeholder="Digite novamente sua senha"
          onChange={
            (event) => {}
            // setFormState({ ...formState, password: event.target.value })
          }
        />

        <Button
          data-testid="buttonFormSubmit"
          type="submit"
          textButton="Entrar"
          className={Styles.submit}
        />

        <Link to="/login" className={Styles.link}>
          Voltar para Login
        </Link>
        <FormStatus isLoading={false} errorMessage={""} />
      </form>

      <Footer />
    </div>
  );
};
