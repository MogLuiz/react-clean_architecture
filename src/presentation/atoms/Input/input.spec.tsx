import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from ".";

describe("Input Atom Component", () => {
  test("should begin with readOnly", () => {
    render(<Input name="field" />);
    const input = screen.getByTestId("field") as HTMLInputElement;

    expect(input.readOnly).toBe(true);
  });
});
