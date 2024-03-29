import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import faker from "faker";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import "jest-localstorage-mock";
import { Helper } from "@/presentation/test";
import { InvalidCredentialsError } from "@/domain/errors";

import {
  ValidationSpy,
  AuthenticationSpy,
  SaveAccessTokenMock,
} from "@/presentation/test";

import { Login } from ".";

type TFactorySetupTestHelperTypes = {
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
} & RenderResult;

type TFactorySetupTestHelperParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ["/login"] });

const factorySetupTestHelper = (
  params?: TFactorySetupTestHelperParams
): TFactorySetupTestHelperTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  validationSpy.errorMessage = params?.validationError;
  const saveAccessTokenMock = new SaveAccessTokenMock();

  const utils = render(
    <Router location={history.location} navigator={history}>
      <Login
        validation={validationSpy}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );

  return { ...utils, validationSpy, authenticationSpy, saveAccessTokenMock };
};

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  const submitButton = screen.getByRole("button", { name: /entrar/i });

  Helper.populateFormField("email", email);
  Helper.populateFormField("password", password);

  fireEvent.click(submitButton);
};

describe("<Login Page/>", () => {
  afterEach(cleanup);

  it("should start with initial state", async () => {
    const validationError = faker.random.words();
    factorySetupTestHelper({ validationError });

    const submitButton = screen.getByRole("button", { name: /entrar/i });

    Helper.testStatusForField("email", validationError);
    Helper.testStatusForField("password", validationError);

    expect(submitButton).toBeDisabled();
  });

  it("should call validation with correct email", () => {
    const { validationSpy } = factorySetupTestHelper();
    validationSpy.errorMessage = faker.random.words();

    const randomEmail = faker.internet.email();

    Helper.populateFormField("email", randomEmail);

    expect(validationSpy.fieldName).toBe("email");
    expect(validationSpy.fieldValue).toBe(randomEmail);
  });

  it("should call validation with correct password", () => {
    const { validationSpy } = factorySetupTestHelper();
    validationSpy.errorMessage = faker.random.words();

    const randomPassword = faker.internet.password();

    Helper.populateFormField("password", randomPassword);

    expect(validationSpy.fieldName).toBe("password");
    expect(validationSpy.fieldValue).toBe(randomPassword);
  });

  it("should show email error if Validation fails", () => {
    const validationError = faker.random.words();
    factorySetupTestHelper({ validationError });

    Helper.populateFormField("email");
    Helper.testStatusForField("email", validationError);
  });

  it("should show password error if Validation fails", () => {
    const validationError = faker.random.words();
    factorySetupTestHelper({ validationError });

    Helper.populateFormField("password");
    Helper.testStatusForField("password", validationError);
  });

  it("should show valid email state if Validation succeeds", () => {
    factorySetupTestHelper();

    Helper.populateFormField("email");
    Helper.testStatusForField("email");
  });

  it("should show valid password state if Validation succeeds", () => {
    factorySetupTestHelper();

    Helper.populateFormField("password");

    Helper.testStatusForField("password");
  });

  it("should enable submit button if form is valid", () => {
    factorySetupTestHelper();

    const submitButton = screen.getByRole("button", { name: /entrar/i });

    Helper.populateFormField("email");
    Helper.populateFormField("password");

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
    Helper.populateFormField("email");
    fireEvent.submit(form);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  it("should present error if Authentication fails", async () => {
    const { authenticationSpy } = factorySetupTestHelper();

    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, "auth")
      .mockReturnValueOnce(Promise.reject(error));

    simulateValidSubmit();

    await waitFor(() => {
      const mainError = screen.queryByTestId("main-error");
      expect(mainError.textContent).toBe(error.message);
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });
  });

  it("should call SaveAccessToken on success", async () => {
    const { authenticationSpy, saveAccessTokenMock } = factorySetupTestHelper();

    simulateValidSubmit();

    await waitFor(() => {
      expect(saveAccessTokenMock.accessToken).toBe(
        authenticationSpy.account.accessToken
      );
      expect(history.index).toBe(0);
      expect(history.location.pathname).toBe("/");
    });
  });

  it("should present error if SaveAccessToken fails", async () => {
    const { saveAccessTokenMock } = factorySetupTestHelper();

    const error = new InvalidCredentialsError();
    jest
      .spyOn(saveAccessTokenMock, "save")
      .mockReturnValueOnce(Promise.reject(error));

    simulateValidSubmit();

    await waitFor(() => {
      const mainError = screen.queryByTestId("main-error");
      expect(mainError.textContent).toBe(error.message);
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });
  });

  it("should go to signup page", () => {
    factorySetupTestHelper();

    const createAccountLinkButton = screen.getByRole("link", {
      name: /Criar conta/i,
    });
    fireEvent.click(createAccountLinkButton);

    expect(history.index).toBe(1);
    expect(history.location.pathname).toBe("/signup");
  });
});
