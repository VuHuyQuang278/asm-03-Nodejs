import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "../storage";

// Lấy dữ liệu từ localStorage
const userArr = getFromStorage("userArr") ?? [];

let isLogin;

// Kiểm tra có người dũng đăng nhập chưa
for (let i = 0; i < userArr.length; i++) {
  if (userArr[i].isLogin === true) {
    isLogin = true;
  } else {
    isLogin = false;
  }
}

// Khởi tạo Redux state slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin,
  },
  reducers: {
    ON_LOGIN(state) {
      state.isLogin = true;
    },
    ON_LOGOUT(state) {
      state.isLogin = false;
    },
  },
});

export default authSlice;
