import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from ".";

const factorySetupTestHelper = () => {
  render(<Input name="field" />);
  const input = screen.getByTestId("field") as HTMLInputElement;
  return { input };
};

describe("Input Atom Component", () => {
  test("should begin with readOnly", () => {
    const { input } = factorySetupTestHelper();
    expect(input.readOnly).toBe(true);
  });
});
