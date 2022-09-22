import { useState } from "react";
import useInput from "../hooks/use-input";
import classes from "./SimpleInput.module.css";
const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput((value) => value.includes("@"));

  let formValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }
    if (!enteredEmailIsValid) {
      return;
    }
    resetNameInput();

    resetEmailInput();
    // setEnteredEmailTouched(false);
  };

  const nameInputClasses = enteredNameIsValid
    ? "form-control "
    : "form-control invalid";
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={classes["form-control"]}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          value={enteredName}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && (
          <p className={classes["error-text"]}>
            The entered value is not valid
          </p>
        )}
      </div>
      <div className={classes["form-control"]}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          value={enteredEmail}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && (
          <p className={classes["error-text"]}>Please enter valid input</p>
        )}
      </div>
      <div className={classes["form-actions"]}>
        <button disabled={!formValid} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
