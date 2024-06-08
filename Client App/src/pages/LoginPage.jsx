import { Link, useNavigate } from "react-router-dom";

import useInput from "../hooks/use-input";
import { saveToStorage } from "../storage";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { request } from "../api/request";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Xử lý dữ liệu input bằng custom hook useInput
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  // Kiểm tra tính hợp lệ của form
  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  // Xử lý sự kiện submit form
  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    // Kiểm tra tính hợp lệ của các trường input
    if (!enteredEmailIsValid) {
      return;
    }

    if (!enteredPasswordIsValid) {
      return;
    }

    try {
      const res = await fetch(request + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
        mode: "cors",
      });

      if (res.status === 422) {
        throw new Error("Validation failed.");
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log("Error!");
        throw new Error("Could not authenticate you!");
      }

      const data = await res.json();
      console.log(data);

      // lưu dữ liệu vào localStorage
      saveToStorage("isLogin", true);
      saveToStorage("token", data.token);
      saveToStorage("currentUser", data.user);
      // Gửi hành động đến redux store
      dispatch(authActions.ON_LOGIN(data));

      // Xoá dữ liệu các trường input
      resetEmailInput();
      resetPasswordInput();

      // Thông báo đăng nhập thành công
      alert("Logged in successfully!");

      // Chuyển về trang chủ
      navigate("/");
    } catch (error) {
      console.log(error.message);
      // Không thoả mãn điều kiện sẽ thông báo lỗi
      alert("E-mail or password is incorrect!");
      resetPasswordInput();
    }
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("src/assets/banner1.jpg")' }}
    >
      <form
        className="relative top-10 mx-auto w-[30rem] border bg-white px-14  py-20 shadow-[10px_35px_60px_-15px_rgba(0,0,0,0.3)]"
        onSubmit={formSubmissionHandler}
      >
        <h2 className="pb-10 text-center text-3xl italic text-slate-500">
          Sign In
        </h2>
        <div className="mb-10 flex border-collapse flex-col">
          <input
            type="email"
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            placeholder="Email"
            className="border px-4 py-4 focus:outline-none"
          />
          {emailInputHasError && (
            <p className="ml-4 py-2 text-red-600">Email must not be empty.</p>
          )}
          <input
            type="password"
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
            placeholder="Password"
            className="border px-4 py-4 focus:outline-none"
          />
          {passwordInputHasError && (
            <p className="ml-4 py-2 text-red-600">
              Password must not be empty.
            </p>
          )}
        </div>
        <button
          className="mb-10 w-full bg-slate-800 py-4 text-slate-100 disabled:cursor-not-allowed disabled:bg-slate-600"
          disabled={!formIsValid}
        >
          SIGN IN
        </button>
        <p className="text-center text-lg italic text-slate-400">
          Create an account?{" "}
          <Link to={"/register"} className="text-teal-500">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
