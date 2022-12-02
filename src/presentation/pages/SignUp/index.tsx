import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Footer } from "@/presentation/atoms/Footer";
import { Input } from "@/presentation/atoms/Input";
import { Button } from "@/presentation/atoms/Button";

import { LoginHeader } from "@/presentation/molecules/LoginHeader";
import { IValidation } from "@/presentation/protocols/validation";
import { FormStatus } from "@/presentation/molecules/FormStatus";

import Styles from "../shared/styles.module.scss";

type TSignUpProps = {
  validation?: IValidation;
};

export const SignUp = ({ validation }: TSignUpProps) => {
  const [formState, setFormState] = useState({
    isLoading: false,
    errorMessage: "",
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    passwordConfirmationError: "",
  });

  useEffect(() => {
    setFormState((previous) => ({
      ...previous,
      nameError: validation.validate("name", formState.name),
      emailError: validation.validate("email", formState.email),
      passwordError: validation.validate("password", formState.password),
      passwordConfirmationError: validation.validate(
        "passwordConfirmation",
        formState.passwordConfirmation
      ),
    }));
  }, [
    formState.name,
    formState.email,
    formState.password,
    formState.passwordConfirmation,
  ]);

  return (
    <div className={Styles.wrapper}>
      <LoginHeader />

      <form role="form" className={Styles.form}>
        <h2>Criar Conta</h2>

        <Input
          type="text"
          title={formState.nameError}
          name="name"
          aria-label="form name field"
          placeholder="Digite seu nome"
          onChange={(event) =>
            setFormState({ ...formState, name: event.target.value })
          }
        />
        <Input
          type="email"
          title={formState.emailError}
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
          title={formState.passwordError}
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
          title={formState.passwordConfirmationError}
          name="passwordConfirmation"
          aria-label="form passwordConfirmation field"
          placeholder="Digite novamente sua senha"
          onChange={
            (event) => {}
            // setFormState({ ...formState, password: event.target.value })
          }
        />

        <Button
          data-testid="buttonFormSubmit"
          type="submit"
          disabled
          textButton="Entrar"
          className={Styles.submit}
        />

        <span className={Styles.link}>Voltar para Login</span>
        <FormStatus isLoading={false} errorMessage={""} />
      </form>

      <Footer />
    </div>
  );
};
