import React from "react";
import { render, screen } from "@testing-library/react";

import { Login } from ".";

const setIsLoading = jest.fn();
const setErrorMessage = jest.fn();

jest.mock("./hooks/useLoginForm", () => {
  return {
    useLoginForm: () => ({
      errorMessage: "",
      isLoading: false,
      setErrorMessage,
      setIsLoading,
    }),
  };
});

describe("<FormStatus/>", () => {
  test("should start with initial state", () => {
   render(<Login />);

    const submitButton = screen.getByRole("button", { name: /entrar/i });

    expect(submitButton).toBeDisabled()
  });
});
