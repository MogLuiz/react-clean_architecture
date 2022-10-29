import React from "react";
import { render, screen } from "@testing-library/react";

import { FormStatus, TFormStatusProps } from ".";

const factorySetupTestHelper = (props: TFormStatusProps) => {
  const utils = render(<FormStatus {...props} />);

  const spinner = screen.queryByTestId("spinner");
  const errorMessage = screen.queryByLabelText("error message");

  return { ...utils, spinner, errorMessage };
};

describe("<FormStatus/>", () => {
  test("should not render spinner and error when props is not passed", () => {
    const { spinner, errorMessage } = factorySetupTestHelper({
      errorMessage: "",
      isLoading: false,
    });

    expect(spinner).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
  });
});
