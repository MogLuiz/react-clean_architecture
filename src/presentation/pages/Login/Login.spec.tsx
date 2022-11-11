import React from "react";
import faker from "faker";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  RenderResult,
} from "@testing-library/react";

import { ValidationSpy } from "@/presentation/test";

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
} & RenderResult;

type TFactorySetupTestHelperParams = {
  validationError: string;
};

const factorySetupTestHelper = (
  params?: TFactorySetupTestHelperParams
): TFactorySetupTestHelperTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = params?.validationError;

  const utils = render(<Login validation={validationSpy} />);

  return { ...utils, validationSpy };
};

describe("<FormStatus/>", () => {
  afterEach(cleanup);

  it("should start with initial state", async () => {
    const validationError = faker.random.words();
    factorySetupTestHelper({ validationError });

    const submitButton = screen.getByRole("button", { name: /entrar/i });
    const emailInputStatus = screen.getByTestId("email-input-status");
    const passwordInputStatus = screen.getByTestId("password-input-status");

    expect(emailInputStatus.title).toBe(validationError);
    expect(emailInputStatus.textContent).toBe("🔴");
    expect(passwordInputStatus.title).toBe(validationError);
    expect(passwordInputStatus.textContent).toBe("🔴");
    expect(submitButton).toBeDisabled();
  });

  it("should call validation with correct email", () => {
    const { validationSpy } = factorySetupTestHelper();
    validationSpy.errorMessage = faker.random.words();

    const emailInput = screen.getByLabelText("form email field");
    const randomEmail = faker.internet.email();

    fireEvent.change(emailInput, { target: { value: randomEmail } });

    expect(validationSpy.fieldName).toBe("email");
    expect(validationSpy.fieldValue).toBe(randomEmail);
  });

  it("should call validation with correct password", () => {
    const { validationSpy } = factorySetupTestHelper();
    validationSpy.errorMessage = faker.random.words();

    const passwordInput = screen.getByLabelText("form password field");
    const randomPassword = faker.internet.password();

    fireEvent.change(passwordInput, { target: { value: randomPassword } });

    expect(validationSpy.fieldName).toBe("password");
    expect(validationSpy.fieldValue).toBe(randomPassword);
  });

  it("should show email error if Validation fails", () => {
    const validationError = faker.random.words();
    factorySetupTestHelper({ validationError });

    const emailInput = screen.getByLabelText("form email field");
    const emailInputStatus = screen.getByTestId("email-input-status");

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    expect(emailInputStatus.title).toBe(validationError);
    expect(emailInputStatus.textContent).toBe("🔴");
  });

  it("should show password error if Validation fails", () => {
    const validationError = faker.random.words();
    factorySetupTestHelper({ validationError });

    const passwordInput = screen.getByLabelText("form password field");
    const passwordInputStatus = screen.getByTestId("password-input-status");

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    expect(passwordInputStatus.title).toBe(validationError);
    expect(passwordInputStatus.textContent).toBe("🔴");
  });

  it("should show valid email state if Validation succeeds", () => {
    factorySetupTestHelper();

    const emailInput = screen.getByLabelText("form email field");
    const emailInputStatus = screen.getByTestId("email-input-status");

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    expect(emailInputStatus.title).toBe("Tudo certo!");
    expect(emailInputStatus.textContent).toBe("🟢");
  });

  it("should show valid password state if Validation succeeds", () => {
    factorySetupTestHelper();

    const passwordInput = screen.getByLabelText("form password field");
    const passwordInputStatus = screen.getByTestId("password-input-status");

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    expect(passwordInputStatus.title).toBe("Tudo certo!");
    expect(passwordInputStatus.textContent).toBe("🟢");
  });

  it("should enable submit button if form is valid", () => {
    factorySetupTestHelper();

    const passwordInput = screen.getByLabelText("form password field");
    const emailInput = screen.getByLabelText("form email field");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    expect(submitButton).not.toBeDisabled();
  });

  it("should show spinner on submit", () => {
    factorySetupTestHelper();

    const passwordInput = screen.getByLabelText("form password field");
    const emailInput = screen.getByLabelText("form email field");
    const submitButton = screen.getByRole("button", { name: /entrar/i });
   

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    fireEvent.click(submitButton)

    expect(screen.getByTestId('spinner')).toBeTruthy()
  });
});
