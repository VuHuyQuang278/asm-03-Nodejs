import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";

// Tạo redux store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

// xuất dữ liệu
export const authActions = authSlice.actions;

export default store;
