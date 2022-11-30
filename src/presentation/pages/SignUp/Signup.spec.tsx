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
import { SignUp } from ".";

type TValidField = "email" | "password" | "name" | "passwordConfirmation"
type TFactorySetupTestHelperTypes = {
  submitButton: HTMLElement;
} & RenderResult;


const factorySetupTestHelper = (): TFactorySetupTestHelperTypes => {
  const utils = render(<SignUp />);

  const submitButton = screen.getByRole("button", {
    name: /Entrar/i,
  });

  return { ...utils, submitButton };
};

const testStatusForField = (
  fieldName: TValidField,
  validationError?: string
): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-input-status`);

  expect(fieldStatus.title).toBe(validationError || "Tudo certo!");
  expect(fieldStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};

describe("<SignUp Page/>", () => {
  it("should start with initial state", async () => {
    // const validationError = faker.random.words();
    const validationError = 'Campo obrigatório';
    const { submitButton } = factorySetupTestHelper();

    testStatusForField("name", validationError);
    testStatusForField("email", validationError);
    testStatusForField("password", validationError);
    testStatusForField("passwordConfirmation", validationError);

    expect(submitButton).toBeDisabled();
  });
});
