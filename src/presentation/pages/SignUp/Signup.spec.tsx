import React from "react";
import "jest-localstorage-mock";
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
import { SignUp } from ".";
import { Helper, ValidationSpy, AddAccountSpy } from "@/presentation/test";

type TFactorySetupTestHelperTypes = {
  submitButton: HTMLElement;
  addAccountSpy: AddAccountSpy;
} & RenderResult;

type TFactorySetupTestHelperParams = {
  validationError: string;
};

const factorySetupTestHelper = (
  params?: TFactorySetupTestHelperParams
): TFactorySetupTestHelperTypes => {
  const addAccountSpy = new AddAccountSpy();
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = params?.validationError;
  const utils = render(
    <SignUp validation={validationSpy} addAccount={addAccountSpy} />
  );

  const submitButton = screen.getByRole("button", {
    name: /Entrar/i,
  });

  return { ...utils, submitButton, addAccountSpy };
};

const simulateValidSubmit = (
  name = faker.internet.userName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  const submitButton = screen.getByRole("button", { name: /entrar/i });

  Helper.populateFormField("name", name);
  Helper.populateFormField("email", email);
  Helper.populateFormField("password", password);
  Helper.populateFormField("passwordConfirmation", password);

  fireEvent.click(submitButton);
};

describe("<SignUp Page/>", () => {
  afterEach(cleanup);
  const validationError = faker.random.words();

  it("should start with initial state", async () => {
    const { submitButton } = factorySetupTestHelper({ validationError });

    Helper.testStatusForField("name", validationError);
    Helper.testStatusForField("email", validationError);
    Helper.testStatusForField("password", validationError);
    Helper.testStatusForField("passwordConfirmation", validationError);

    expect(submitButton).toBeDisabled();
  });

  it("should show name error if Validation fails", () => {
    factorySetupTestHelper({ validationError });

    Helper.populateFormField("name");
    Helper.testStatusForField("name", validationError);
  });

  it("should show email error if Validation fails", () => {
    factorySetupTestHelper({ validationError });

    Helper.populateFormField("email");
    Helper.testStatusForField("email", validationError);
  });

  it("should show password error if Validation fails", () => {
    factorySetupTestHelper({ validationError });

    Helper.populateFormField("password");
    Helper.testStatusForField("password", validationError);
  });

  it("should show passwordConfirmation error if Validation fails", () => {
    factorySetupTestHelper({ validationError });

    Helper.populateFormField("passwordConfirmation");
    Helper.testStatusForField("passwordConfirmation", validationError);
  });

  it("should show valid name state if Validation succeeds", () => {
    factorySetupTestHelper();

    Helper.populateFormField("name");
    Helper.testStatusForField("name");
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

  it("should show valid passwordConfirmation state if Validation succeeds", () => {
    factorySetupTestHelper();

    Helper.populateFormField("passwordConfirmation");
    Helper.testStatusForField("passwordConfirmation");
  });

  it("should enable submit button if form is valid", () => {
    factorySetupTestHelper();

    const submitButton = screen.getByTestId("buttonFormSubmit");

    Helper.populateFormField("name");
    Helper.populateFormField("email");
    Helper.populateFormField("password");
    Helper.populateFormField("passwordConfirmation");

    expect(submitButton).not.toBeDisabled();
  });

  it("should show spinner on submit", () => {
    factorySetupTestHelper();
    simulateValidSubmit();

    expect(screen.getByTestId("spinner")).toBeTruthy();
  });

  it("should call AddAccount with correct values", () => {
    const { addAccountSpy } = factorySetupTestHelper();

    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit(name, email, password);

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });
});
