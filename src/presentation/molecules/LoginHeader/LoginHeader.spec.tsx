import React from "react";
import { render, screen } from "@testing-library/react";

import { LoginHeader } from ".";

describe("<LoginHeader />", () => {
  it("should render correctly", () => {
    render(<LoginHeader />);

    expect(screen.getByTestId("projectLogo")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /4Dev - Enquetes para Programadores/i,
      })
    );
  });
});
