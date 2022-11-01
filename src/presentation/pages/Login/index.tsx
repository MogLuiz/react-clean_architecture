import React, { useEffect } from "react";

import { useLoginForm } from "./hooks/useLoginForm";

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
  const {
    formState: { email, emailError, errorMessage, isLoading, passwordError },
    handleChangeFormState,
  } = useLoginForm();

  useEffect(() => {
    validation?.validate({ email: email });
  }, [email]);

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <form className={Styles.form}>
        <h2>Login</h2>

        <Input
          type="email"
          title={emailError}
          name="email"
          aria-label="form email field"
          placeholder="Digite seu e-mail"
          onChange={(event) =>
            handleChangeFormState("email", event.target.value)
          }
        />
        <Input
          type="password"
          title={passwordError}
          name="password"
          aria-label="form password field"
          placeholder="Digite sua senha"
        />

        <Button
          data-testid="buttonFormSubmit"
          textButton="Entrar"
          disabled
          className={Styles.submit}
        />

        <span className={Styles.link}>Criar conta</span>
        <FormStatus isLoading={isLoading} errorMessage={errorMessage} />
      </form>

      <Footer />
    </div>
  );
};
