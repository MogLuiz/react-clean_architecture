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
import { Helper } from "@/presentation/test";

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

describe("<SignUp Page/>", () => {
  it("should start with initial state", async () => {
    // const validationError = faker.random.words();
    const validationError = "Campo obrigatório";
    const { submitButton } = factorySetupTestHelper();

    Helper.testStatusForField("name", validationError);
    Helper.testStatusForField("email", validationError);
    Helper.testStatusForField("password", validationError);
    Helper.testStatusForField("passwordConfirmation", validationError);

    expect(submitButton).toBeDisabled();
  });
});
