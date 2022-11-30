import { screen } from "@testing-library/react";

type TValidField = "email" | "password" | "name" | "passwordConfirmation";

export const testStatusForField = (
  fieldName: TValidField,
  validationError?: string
): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-input-status`);

  expect(fieldStatus.title).toBe(validationError || "Tudo certo!");
  expect(fieldStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};
