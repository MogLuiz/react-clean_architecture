import React from "react";
import faker from "faker"
import {
  render,
  screen,
  fireEvent,
  cleanup,
  RenderResult,
  waitFor,
} from "@testing-library/react";

import { ValidationSpy } from "@/presentation/test";

import { Login } from ".";

const handleChangeFormState = jest.fn();

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
    const randomEmail = faker.internet.email()

    fireEvent.change(emailInput, { target: { value: randomEmail } });

    expect(validationSpy.fieldName).toBe("email");
    expect(validationSpy.fieldValue).toBe(randomEmail);
  });

  it("should call validation with correct password", () => {
    const { validationSpy } = factorySetupTestHelper();

    const passwordInput = screen.getByLabelText("form password field");
    const randomPassword = faker.internet.password()

    fireEvent.change(passwordInput, { target: { value: randomPassword } });

    expect(validationSpy.fieldName).toBe("password");
    expect(validationSpy.fieldValue).toBe(randomPassword);
  });
});
