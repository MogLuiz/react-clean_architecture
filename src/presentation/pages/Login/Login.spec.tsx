import React from "react";
import faker from "faker";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  RenderResult,
} from "@testing-library/react";

import { ValidationSpy, AuthenticationSpy } from "@/presentation/test";

import { Login } from ".";

const handleChangeFormState = jest.fn();
const setFormState = jest.fn();

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
      setFormState,
    }),
  };
});

type TFactorySetupTestHelperTypes = {
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
} & RenderResult;

type TFactorySetupTestHelperParams = {
  validationError: string;
};

const factorySetupTestHelper = (
  params?: TFactorySetupTestHelperParams
): TFactorySetupTestHelperTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  validationSpy.errorMessage = params?.validationError;

  const utils = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />
  );

  return { ...utils, validationSpy, authenticationSpy };
};

const populateEmailField = (email = faker.internet.email()): void => {
  const emailInput = screen.getByLabelText("form email field");
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (password = faker.internet.password()): void => {
  const passwordInput = screen.getByLabelText("form password field");
  fireEvent.input(passwordInput, { target: { value: password } });
};

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  const submitButton = screen.getByRole("button", { name: /entrar/i });

  populateEmailField(email);
  populatePasswordField(password);

  fireEvent.click(submitButton);
};

const simulateStatusForField = (
  fieldName: "email" | "password",
  validationError?: string
): void => {
  const passwordInputStatus = screen.getByTestId(`${fieldName}-input-status`);

  expect(passwordInputStatus.title).toBe(validationError || "Tudo certo!");
  expect(passwordInputStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};

describe("<FormStatus/>", () => {
  afterEach(cleanup);

  it("should start with initial state", async () => {
    const validationError = faker.random.words();
    factorySetupTestHelper({ validationError });

    const submitButton = screen.getByRole("button", { name: /entrar/i });

    simulateStatusForField("email", validationError);
    simulateStatusForField("password", validationError);

    expect(submitButton).toBeDisabled();
  });

  it("should call validation with correct email", () => {
    const { validationSpy } = factorySetupTestHelper();
    validationSpy.errorMessage = faker.random.words();

    const randomEmail = faker.internet.email();

    populateEmailField(randomEmail);

    expect(validationSpy.fieldName).toBe("email");
    expect(validationSpy.fieldValue).toBe(randomEmail);
  });

  it("should call validation with correct password", () => {
    const { validationSpy } = factorySetupTestHelper();
    validationSpy.errorMessage = faker.random.words();

    const randomPassword = faker.internet.password();

    populatePasswordField(randomPassword);

    expect(validationSpy.fieldName).toBe("password");
    expect(validationSpy.fieldValue).toBe(randomPassword);
  });

  it("should show email error if Validation fails", () => {
    const validationError = faker.random.words();
    factorySetupTestHelper({ validationError });

    populateEmailField();
    simulateStatusForField("email", validationError);
  });

  it("should show password error if Validation fails", () => {
    const validationError = faker.random.words();
    factorySetupTestHelper({ validationError });

    populatePasswordField();
    simulateStatusForField("password", validationError);
  });

  it("should show valid email state if Validation succeeds", () => {
    factorySetupTestHelper();

    populateEmailField();
    simulateStatusForField("email");
  });

  it("should show valid password state if Validation succeeds", () => {
    factorySetupTestHelper();

    populatePasswordField();

    simulateStatusForField("password");
  });

  it("should enable submit button if form is valid", () => {
    factorySetupTestHelper();

    const submitButton = screen.getByRole("button", { name: /entrar/i });

    populateEmailField();
    populatePasswordField();

    expect(submitButton).not.toBeDisabled();
  });

  it("should show spinner on submit", () => {
    factorySetupTestHelper();

    simulateValidSubmit();

    expect(screen.getByTestId("spinner")).toBeTruthy();
  });

  it("should call Authentication with correct values", () => {
    const { authenticationSpy } = factorySetupTestHelper();

    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit(email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  it("should call Authentication only once", () => {
    const { authenticationSpy } = factorySetupTestHelper();

    simulateValidSubmit();
    simulateValidSubmit();

    expect(authenticationSpy.callsCount).toBe(1);
  });

  it("should not call Authentication if form is invalid", () => {
    const validationError = faker.random.words();
    const { authenticationSpy } = factorySetupTestHelper({ validationError });

    const form = screen.getByRole("form");

    populateEmailField();

    fireEvent.submit(form);

    expect(authenticationSpy.callsCount).toBe(0);
  });
});
