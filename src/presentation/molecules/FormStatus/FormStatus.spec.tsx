import React from "react";
import { render, screen } from "@testing-library/react";

import { FormStatus } from ".";

describe("<FormStatus/>", () => {
  test("should not render spinner and error when props is not passed", () => {
    render(<FormStatus isLoading={false} errorMessage={""} />);

    const spinner = screen.queryByTestId("spinner");
    const errorMessage = screen.queryByLabelText("error message");

    expect(spinner).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
  });
});
