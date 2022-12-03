import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { AddAccount } from "@/domain/usecases";

import { Footer } from "@/presentation/atoms/Footer";
import { Input } from "@/presentation/atoms/Input";
import { Button } from "@/presentation/atoms/Button";

import { LoginHeader } from "@/presentation/molecules/LoginHeader";
import { IValidation } from "@/presentation/protocols/validation";
import { FormStatus } from "@/presentation/molecules/FormStatus";

import Styles from "../shared/styles.module.scss";

type TSignUpProps = {
  validation: IValidation;
  addAccount: AddAccount;
};

export const SignUp = ({ validation, addAccount }: TSignUpProps) => {
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

  const isButtonFormDisable =
    formState.emailError ||
    formState.passwordError ||
    formState.nameError ||
    formState.passwordConfirmationError;

  const isInvalidForm =
    formState.isLoading ||
    formState.emailError ||
    formState.passwordError ||
    formState.nameError ||
    formState.passwordConfirmationError;

  const handleSubmitForm = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      if (isInvalidForm) return;
      setFormState((previous) => ({ ...previous, isLoading: true }));
      await addAccount.add({
        name: formState.name,
        email: formState.email,
        password: formState.password,
        passwordConfirmation: formState.passwordConfirmation,
      });
    } catch (error) {
      setFormState({
        ...formState,
        isLoading: false,
        errorMessage: error.message,
      });
    }
  };

  return (
    <div className={Styles.wrapper}>
      <LoginHeader />

      <form role="form" className={Styles.form} onSubmit={handleSubmitForm}>
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
        <Input
          type="password"
          title={formState.passwordConfirmationError}
          name="passwordConfirmation"
          aria-label="form passwordConfirmation field"
          placeholder="Digite novamente sua senha"
          onChange={(event) =>
            setFormState({
              ...formState,
              passwordConfirmation: event.target.value,
            })
          }
        />

        <Button
          data-testid="buttonFormSubmit"
          type="submit"
          disabled={!!isButtonFormDisable}
          textButton="Entrar"
          className={Styles.submit}
        />

        <span className={Styles.link}>Voltar para Login</span>
        <FormStatus
          isLoading={formState.isLoading}
          errorMessage={formState.errorMessage}
        />
      </form>

      <Footer />
    </div>
  );
};
