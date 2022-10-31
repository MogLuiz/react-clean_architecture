import React from "react";
import { render, screen } from "@testing-library/react";

import { Login } from ".";

const handleChangeFormState = jest.fn();

jest.mock("./hooks/useLoginForm", () => {
  return {
    useLoginForm: () => ({
      formState: {
        errorMessage: "",
        isLoading: false,
        emailError: "Campo obrigatório",
        passwordError: "Campo obrigatório",
      },
      handleChangeFormState,
    }),
  };
});

describe("<FormStatus/>", () => {
  test("should start with initial state", () => {
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: /entrar/i });
    const emailInputStatus = screen.getByTestId("email-input-status");
    const passwordInputStatus = screen.getByTestId("password-input-status");

    expect(emailInputStatus.title).toBe("Campo obrigatório");
    expect(emailInputStatus.textContent).toBe("🔴");
    expect(passwordInputStatus.title).toBe("Campo obrigatório");
    expect(passwordInputStatus.textContent).toBe("🔴");
    expect(submitButton).toBeDisabled();
  });
});
