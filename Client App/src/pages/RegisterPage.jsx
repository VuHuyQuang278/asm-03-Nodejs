import { Link, useNavigate } from "react-router-dom";

import useInput from "../hooks/use-input";
import { saveToStorage, getFromStorage } from "../storage";
import { request } from "../api/request";

const RegisterPage = () => {
  const navigate = useNavigate();

  // Lấy dữ liệu từ localStorage
  const userArr = getFromStorage("userArr") ?? [];

  // Xử lý dữ liệu input bằng custom hook useInput
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.length > 5);

  const regex = /^[0-9]{10}$/;

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneChangedHandler,
    inputBlurHandler: phonedBlurHandler,
    reset: resetPhoneInput,
  } = useInput((value) => regex.test(value));

  // Kiểm tra tính hợp lệ của form
  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredPhoneIsValid
  ) {
    formIsValid = true;
  }

  // Xử lý sự kiện submit form
  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    // Kiểm tra tính hợp lệ của các trường input
    if (!enteredNameIsValid) {
      return;
    }

    if (!enteredEmailIsValid) {
      return;
    }

    if (!enteredPasswordIsValid) {
      return;
    }

    if (!enteredPhoneIsValid) {
      return;
    }

    try {
      const response = await fetch(request + "auth/signup", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          phone: enteredPhone,
        }),
        mode: "cors",
      });

      if (response.status === 422) {
        throw new Error(
          "Validation failed. Make sure the email address isn't used yet!",
        );
      }

      if (response.status !== 200 && response.status !== 201) {
        console.log("Error!");
        throw new Error("Creating a user failed!");
      }

      const data = await response.json();
      console.log(data);

      // Reset các trường input
      resetNameInput();
      resetEmailInput();
      resetPasswordInput();
      resetPhoneInput();

      // Thông báo đăng ký tài khoản thành công
      alert(data.message);

      // Chuyển hướng về LoginPage
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="mb-32 h-screen bg-cover bg-center bg-repeat"
      style={{ backgroundImage: 'url("src/assets/banner1.jpg")' }}
    >
      <div className="py-4">
        <form
          className=" mx-auto w-[30rem] border bg-white px-14  py-20 shadow-[10px_35px_60px_-15px_rgba(0,0,0,0.3)]"
          onSubmit={formSubmissionHandler}
        >
          <h2 className="pb-10 text-center text-3xl italic text-slate-500">
            Sign Up
          </h2>
          <div className="mb-10 flex border-collapse flex-col">
            <input
              type="text"
              onChange={nameChangedHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
              placeholder="Full Name"
              name="fullName"
              className="border px-4 py-4 focus:outline-none"
            />
            {nameInputHasError && (
              <p className="ml-4 py-2 text-red-600">Name must not be empty.</p>
            )}
            <input
              type="email"
              onChange={emailChangedHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
              placeholder="Email"
              name="email"
              className="border px-4 py-4 focus:outline-none"
            />
            {emailInputHasError && (
              <p className="ml-4 py-2 text-red-600">
                Please enter a valid email.
              </p>
            )}
            <input
              type="password"
              onChange={passwordChangedHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
              placeholder="Password"
              name="password"
              className="border px-4 py-4 focus:outline-none"
            />
            {passwordInputHasError && (
              <p className="ml-4 py-2 text-red-600">
                Password must be more than 5 characters.
              </p>
            )}
            <input
              type="text"
              onChange={phoneChangedHandler}
              onBlur={phonedBlurHandler}
              value={enteredPhone}
              placeholder="Phone"
              name="phone"
              className="border px-4 py-4 focus:outline-none"
            />
            {phoneInputHasError && (
              <p className="ml-4 py-2 text-red-600">
                Please enter a valid phone.
              </p>
            )}
          </div>
          <button
            className="mb-10 w-full bg-slate-800 py-4 text-slate-100 disabled:cursor-not-allowed disabled:bg-slate-600"
            disabled={!formIsValid}
          >
            SIGN UP
          </button>
          <p className="text-center text-lg italic text-slate-400">
            Login?{" "}
            <Link to={"/login"} className="text-teal-500">
              Click
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
