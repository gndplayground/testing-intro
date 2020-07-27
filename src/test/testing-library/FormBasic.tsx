import React, { useState } from "react";

export type FormBasicProps = {
  onSubmit?: (
    data: { email: string; password: string },
    cb?: (error: string) => void
  ) => void;
};

function FormBasic({ onSubmit }: FormBasicProps) {
  const [submitError, setSubmitError] = useState("");

  const [data, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (onSubmit) {
      setSubmitting(true);
      setSubmitError("");
      event.preventDefault();

      onSubmit(data, (error) => {
        setSubmitting(false);
        setSubmitError(error);
      });
    }
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      password: event.target.value,
    });

    let validationMessage = "";

    if (!event.target.value) {
      validationMessage = "Password is required.";
    }

    if (!validationMessage && event.target.value.length < 6) {
      validationMessage = "Password length must be at least 6 characters.";
    }

    // Just simple validation
    setValidation({
      ...validation,
      password: validationMessage,
    });
  }

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      email: event.target.value,
    });

    // Just simple validation
    setValidation({
      ...validation,
      email: !event.target.value ? "Email is required." : "",
    });
  }

  const canSubmit =
    data.password && data.email && !validation.email && !validation.password;

  return (
    <form data-testid="login-form" noValidate={true} onSubmit={handleSubmit}>
      <h1>Login form</h1>
      {submitError && (
        <p role="alert" aria-live="assertive">
          {submitError}
        </p>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <br />
        <input
          aria-describedby="email-helper"
          onChange={handleChangeEmail}
          value={data.email}
          id="email"
          name="email"
          type="text"
        />
        {validation.email && (
          <p id="email-helper" aria-live="polite">
            {validation.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input
          aria-describedby="password-helper"
          onChange={handleChangePassword}
          value={data.password}
          id="password"
          name="password"
          type="text"
        />
        {validation.password && (
          <p id="password-helper" aria-live="polite">
            {validation.password}
          </p>
        )}
      </div>
      <button
        type="submit"
        data-testid="submit-login"
        disabled={submitting || !canSubmit}
      >
        Submit
      </button>
    </form>
  );
}

export default FormBasic;
