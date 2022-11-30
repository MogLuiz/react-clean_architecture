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

const populateFormField = (
  fieldName: string,
  fieldValue = faker.random.word()
): void => {
  const emailInput = screen.getByLabelText(`form ${fieldName} field`);
  fireEvent.input(emailInput, { target: { value: fieldValue } });
};

describe("<SignUp Page/>", () => {
  afterEach(cleanup);
  const validationError = faker.random.words();

  it("should start with initial state", async () => {
    const { submitButton } = factorySetupTestHelper({ validationError });

    Helper.testStatusForField("name", validationError);
    Helper.testStatusForField("email", "Campo obrigatório");
    Helper.testStatusForField("password", "Campo obrigatório");
    Helper.testStatusForField("passwordConfirmation", "Campo obrigatório");

    expect(submitButton).toBeDisabled();
  });

  it("should show name error if Validation fails", () => {
    factorySetupTestHelper({ validationError });

    populateFormField("name");
    Helper.testStatusForField("name", validationError);
  });
});
