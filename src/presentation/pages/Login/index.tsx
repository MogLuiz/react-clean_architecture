import React, { useEffect, useState } from "react";

import { Footer } from "@/presentation/atoms/Footer";
import { Input } from "@/presentation/atoms/Input";
import { Button } from "@/presentation/atoms/Button";

import { LoginHeader } from "@/presentation/molecules/LoginHeader";
import { FormStatus } from "@/presentation/molecules/FormStatus";

import { IValidation } from "@/presentation/protocols/validation";

import Styles from "./styles.module.scss";

type TLoginprops = {
  validation?: IValidation;
};

export const Login = ({ validation }: TLoginprops) => {
  const [formState, setFormState] = useState({
    isLoading: false,
    errorMessage: "",
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });

  useEffect(() => {
    setFormState((previous) => ({
      ...previous,
      emailError: validation?.validate("email", formState.email),
    }));
  }, [formState.email]);

  useEffect(() => {
    setFormState((previous) => ({
      ...previous,
      passwordError: validation?.validate("password", formState.password),
    }));
  }, [formState.password]);

  const isButtonFormDisable = formState.emailError || formState.passwordError;

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFormState((previous) => ({ ...previous, isLoading: true }));
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <form className={Styles.form} onSubmit={handleSubmitForm}>
        <h2>Login</h2>

        <Input
          type="email"
          title={formState.emailError}
          name="email"
          aria-label="form email field"
          placeholder="Digite seu e-mail"
          onChange={(event) =>
            setFormState({ ...formState, email: event.target.value })
          }
        />
        <Input
          type="password"
          title={formState.passwordError}
          name="password"
          aria-label="form password field"
          placeholder="Digite sua senha"
          onChange={(event) =>
            setFormState({ ...formState, password: event.target.value })
          }
        />

        <Button
          data-testid="buttonFormSubmit"
          textButton="Entrar"
          disabled={!!isButtonFormDisable}
          className={Styles.submit}
        />

        <span className={Styles.link}>Criar conta</span>
        <FormStatus
          isLoading={formState.isLoading}
          errorMessage={formState.errorMessage}
        />
      </form>

      <Footer />
    </div>
  );
};
