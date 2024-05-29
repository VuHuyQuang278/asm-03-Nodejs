import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo Redux state slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null,
    showPopup: false,
  },
  reducers: {
    SHOW_POPUP(state, action) {
      state.data = action.payload;
      state.showPopup = true;
    },
    HIDE_POPUP(state) {
      state.data = null;
      state.showPopup = false;
    },
  },
});

export default productSlice;
