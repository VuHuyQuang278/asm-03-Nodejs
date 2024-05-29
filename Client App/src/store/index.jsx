import { configureStore } from "@reduxjs/toolkit";

import productSlice from "./product";
import authSlice from "./auth";
import cartSlice from "./cart";

// Tạo redux store
const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});

// xuất dữ liệu
export const productActions = productSlice.actions;
export const authActions = authSlice.actions;
export const cartActions = cartSlice.actions;

export default store;
