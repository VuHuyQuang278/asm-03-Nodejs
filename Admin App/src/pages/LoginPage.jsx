import useInput from "../hooks/use-input";

import { useDispatch } from "react-redux";
import { authActions } from "../store/index";
import { useNavigate } from "react-router-dom";
import { request } from "../api/request";
import { saveToStorage } from "../storage";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"), "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.length > 5, "");

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredEmailIsValid) {
      return;
    }

    if (!enteredPasswordIsValid) {
      return;
    }

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    const res = await fetch(request + "auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      mode: "cors",
    });

    if (res.status === 401) {
      return;
    }

    if (!res.ok) throw new Error("Something went wrong!");

    const data = await res.json();
    console.log(data);

    // lưu dữ liệu vào localStorage
    saveToStorage("isLogin", true);
    saveToStorage("token", data.token);
    saveToStorage("currentUser", data.user);

    // Gửi hành động đến redux store
    dispatch(authActions.ON_LOGIN(data));

    // Thông báo đăng nhập thành công
    alert("Logged in successfully!");

    resetEmailInput();
    resetPasswordInput();

    navigate("/");
  };

  return (
    <>
      <h2 className="mb-8 mt-20 text-center text-2xl font-medium">Login</h2>
      <form className="mx-auto w-1/3" onSubmit={formSubmissionHandler}>
        <input
          type="email"
          className="mx-14 w-3/4 border-2 px-4 py-2"
          placeholder="Email"
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="mx-14 pb-2 pt-1 text-red-600">
            Please enter a valid email.
          </p>
        )}
        <input
          type="password"
          className="mx-14 mt-4 w-3/4 border-2 px-4 py-2"
          placeholder="Password"
          onChange={passwordChangedHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
        />
        {passwordInputHasError && (
          <p className="mx-14 pt-1 text-red-600">
            Password must be more than 8 characters.
          </p>
        )}
        <button
          type="submit"
          className="mx-14 my-8 w-3/4 border-2 bg-blue-700 px-4 py-2 font-medium text-slate-200"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginPage;
