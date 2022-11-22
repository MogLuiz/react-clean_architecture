import React from "react";
import faker from "faker";
import { fireEvent, render, screen } from "@testing-library/react";

import { Input } from ".";

const factorySetupTestHelper = (fieldName: string) => {
  render(<Input name={fieldName} />);
  const input = screen.getByTestId(fieldName) as HTMLInputElement;
  return { input };
};

describe("Input Atom Component", () => {
  const fieldName = faker.database.column();

  test("should begin with readOnly", () => {
    const { input } = factorySetupTestHelper(fieldName);
    expect(input.readOnly).toBe(true);
  });

  test("should remove readOnly on focus", () => {
    const { input } = factorySetupTestHelper(fieldName);
    fireEvent.focus(input);
    expect(input.readOnly).toBe(false);
  });
});
