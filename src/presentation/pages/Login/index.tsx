import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Footer } from "@/presentation/atoms/Footer";
import { Input } from "@/presentation/atoms/Input";
import { Button } from "@/presentation/atoms/Button";

import { LoginHeader } from "@/presentation/molecules/LoginHeader";
import { FormStatus } from "@/presentation/molecules/FormStatus";

import { Authentication } from "@/domain/usecases";
import { IValidation } from "@/presentation/protocols/validation";

import Styles from "./styles.module.scss";

type TLoginprops = {
  validation?: IValidation;
  authentication?: Authentication;
};

export const Login = ({ validation, authentication }: TLoginprops) => {
  const navigate = useNavigate();
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
  const isInvalidForm =
    formState.isLoading || formState.emailError || formState.passwordError;

  const handleSubmitForm = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (isInvalidForm) return;
      setFormState((previous) => ({ ...previous, isLoading: true }));
      const account = await authentication.auth({
        email: formState.email,
        password: formState.password,
      });
      localStorage.setItem("accessToken", account.accessToken);
      navigate("/", { replace: true });
    } catch (error) {
      setFormState({
        ...formState,
        isLoading: false,
        errorMessage: error.message,
      });
    }
  };
  return (
    <div className={Styles.login}>
      <LoginHeader />

      <form role="form" className={Styles.form} onSubmit={handleSubmitForm}>
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
          type="submit"
          textButton="Entrar"
          disabled={!!isButtonFormDisable}
          className={Styles.submit}
        />

        <Link to="/signup" className={Styles.link}>
          Criar conta
        </Link>
        <FormStatus
          isLoading={formState.isLoading}
          errorMessage={formState.errorMessage}
        />
      </form>

      <Footer />
    </div>
  );
};
