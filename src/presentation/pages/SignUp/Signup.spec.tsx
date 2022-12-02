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
import { Helper, ValidationSpy } from "@/presentation/test";

type TFactorySetupTestHelperTypes = {
  submitButton: HTMLElement;
} & RenderResult;

type TFactorySetupTestHelperParams = {
  validationError: string;
};

const factorySetupTestHelper = (
  params?: TFactorySetupTestHelperParams
): TFactorySetupTestHelperTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = params?.validationError;
  const utils = render(<SignUp validation={validationSpy} />);

  const submitButton = screen.getByRole("button", {
    name: /Entrar/i,
  });

  return { ...utils, submitButton };
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
});
