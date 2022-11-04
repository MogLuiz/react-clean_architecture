import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  RenderResult,
  waitFor,
} from "@testing-library/react";

import { IValidation } from "@/presentation/protocols/validation";

import { Login } from ".";

const handleChangeFormState = jest.fn();

class ValidationSpy implements IValidation {
  errorMessage: string;
  fieldName: string;
  fieldValue: string;

  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
}

jest.mock("./hooks/useLoginForm", () => {
  return {
    useLoginForm: () => ({
      formState: {
        errorMessage: "",
        isLoading: false,
        email: "",
        emailError: "Campo obrigatório",
        passwordError: "Campo obrigatório",
      },
      handleChangeFormState,
    }),
  };
});

type factorySetupTestHelperTypes = {
  validationSpy: ValidationSpy;
} & RenderResult;

const factorySetupTestHelper = (): factorySetupTestHelperTypes => {
  const validationSpy = new ValidationSpy();
  const utils = render(<Login validation={validationSpy} />);

  return { ...utils, validationSpy };
};

describe("<FormStatus/>", () => {
  afterEach(cleanup);

  it("should start with initial state", () => {
    factorySetupTestHelper();

    const submitButton = screen.getByRole("button", { name: /entrar/i });
    const emailInputStatus = screen.getByTestId("email-input-status");
    const passwordInputStatus = screen.getByTestId("password-input-status");

    expect(emailInputStatus.title).toBe("Campo obrigatório");
    expect(emailInputStatus.textContent).toBe("🔴");
    expect(passwordInputStatus.title).toBe("Campo obrigatório");
    expect(passwordInputStatus.textContent).toBe("🔴");
    expect(submitButton).toBeDisabled();
  });

  it("should call validation with correct email", () => {
    const { validationSpy } = factorySetupTestHelper();

    const emailInput = screen.getByLabelText("form email field");

    fireEvent.change(emailInput, { target: { value: "any_email" } });

    expect(validationSpy.fieldName).toBe("email");
    expect(validationSpy.fieldValue).toBe("any_email");
  });
});
