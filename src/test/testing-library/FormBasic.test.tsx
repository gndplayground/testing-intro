import { render, fireEvent, screen, act, within } from "@testing-library/react";
import React from "react";
import FormBasic, { FormBasicProps } from "./FormBasic";

function renderForm(props: FormBasicProps) {
  return <FormBasic {...props} />;
}

describe("<FormBasic />", () => {
  it("Should disabled submit button by default", () => {
    const { getByTestId } = render(renderForm({}));
    const btn = getByTestId("submit-login") as HTMLButtonElement;

    expect(btn.disabled).toEqual(true);
  });

  it("Should display validation error", () => {
    const { getByLabelText } = render(renderForm({}));
    const email = getByLabelText("Email") as HTMLInputElement;
    const password = getByLabelText("Password") as HTMLInputElement;

    fireEvent.change(password, {
      target: {
        value: "12345",
      },
    });

    // Email now is dirty
    fireEvent.change(email, {
      target: {
        value: "s",
      },
    });

    fireEvent.change(email, {
      target: {
        value: "",
      },
    });

    expect(password).toHaveDescription(
      "Password length must be at least 6 characters."
    );

    expect(email).toHaveDescription("Email is required.");
  });

  it("Should submit callback and display error", () => {
    const mockSubmit = jest.fn();

    let savedCb: (error: string) => void = () => {};

    mockSubmit.mockImplementation((data, cb) => {
      savedCb = cb;
    });

    const { getByLabelText, getByTestId, getByRole } = render(
      renderForm({
        onSubmit: mockSubmit,
      })
    );

    const btn = getByTestId("submit-login") as HTMLButtonElement;

    const email = getByLabelText("Email") as HTMLInputElement;

    const password = getByLabelText("Password") as HTMLInputElement;

    fireEvent.change(password, {
      target: {
        value: "123456",
      },
    });

    fireEvent.change(email, {
      target: {
        value: "abc@example.com",
      },
    });

    expect(btn.disabled).toEqual(false);

    fireEvent.click(getByTestId("submit-login"));

    expect(btn.disabled).toEqual(true);

    expect(mockSubmit.mock.calls[0][0]).toEqual({
      email: "abc@example.com",
      password: "123456",
    });

    act(() => {
      savedCb("Error Server");
    });

    const alert = getByRole("alert");

    const { getByText } = within(alert);

    expect(getByText("Error Server")).toBeInTheDocument();
  });
});
