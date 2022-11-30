import faker from "faker";
import { screen, fireEvent } from "@testing-library/react";

type TValidField = "email" | "password" | "name" | "passwordConfirmation";

export const testStatusForField = (
  fieldName: TValidField,
  validationError?: string
): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-input-status`);

  expect(fieldStatus.title).toBe(validationError || "Tudo certo!");
  expect(fieldStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};

export const populateFormField = (
  fieldName: string,
  fieldValue = faker.random.word()
): void => {
  const emailInput = screen.getByLabelText(`form ${fieldName} field`);
  fireEvent.input(emailInput, { target: { value: fieldValue } });
};
