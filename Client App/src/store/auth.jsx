import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "../storage";

// Lấy dữ liệu từ localStorage
let isLogin = getFromStorage("isLogin") ?? [];
let currentUser = getFromStorage("currentUser") ?? [];

// Khởi tạo Redux state slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin,
    user: isLogin ? currentUser : {},
    token: "",
  },
  reducers: {
    ON_LOGIN(state, action) {
      state.isLogin = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    ON_LOGOUT(state) {
      state.isLogin = false;
      state.user = {};
      state.token = "";
    },
  },
});

export default authSlice;
