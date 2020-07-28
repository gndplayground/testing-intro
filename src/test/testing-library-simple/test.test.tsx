import React from "react";
import { render, screen } from "@testing-library/react";

import Simple from "./Simple";

// The test cases here are for demo purpose.

describe("simple", () => {
  it("Should render", () => {
    const { container } = render(<Simple />);

    expect(container.firstChild).toMatchSnapshot();

    screen.debug();
  });

  it("Should render with name", () => {
    const { container, rerender } = render(<Simple />);

    expect(container.firstChild).toMatchSnapshot();

    rerender(<Simple name="Tom" />);

    expect(container.firstChild).toMatchSnapshot();

    screen.debug();
  });

  it("Should render correct text", () => {
    const { getByText } = render(<Simple name="Jean" />);

    expect(getByText("Hello, Jean!"));
  });
});
