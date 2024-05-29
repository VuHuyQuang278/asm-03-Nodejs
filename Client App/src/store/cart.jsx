import { createSlice } from "@reduxjs/toolkit";
import { saveToStorage, getFromStorage } from "../storage";

// lấy dữ liệu từ localStorage
let cart = getFromStorage("cart") ?? [];

// Khởi tạo state ban đầu dựa vào dữ liệu từ localStorage
const initialCartState =
  cart.length === 0
    ? {
        listCart: [],
        totalPrice: 0,
      }
    : {
        listCart: cart.listCart,
        totalPrice: cart.totalPrice,
      };

// Khởi tạo Redux state slice
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    ADD_CART(state, action) {
      // Update tổng tiền của giỏ hàng
      const updatedTotalPrice =
        state.totalPrice +
        Number(action.payload.price) * action.payload.quantity;

      // Tìm kiếm index của sản phẩm thêm vào giỏ hàng
      const existingCartItemIndex = state.listCart.findIndex(
        (item) => item._id.$oid === action.payload._id.$oid,
      );

      // Lấy thông tin item từ sản phảm có trong giỏ hàng
      const existingCartItem = state.listCart[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        // Nếu sản phẩm được thêm vào đã có sẵn trong giỏ hàng thì tăng số lượng sản phẩm
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + action.payload.quantity,
        };

        // Sao chép lại dữ liệu giỏ hàng
        updatedItems = [...state.listCart];
        // Cập nhật dữ liệu giỏ hàng tại vị trí sản phẩm thêm vào
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // Nếu sản phẩm được thêm vào chưa có trong giỏ hàng thì thêm sản phẩm đó vào giỏ hàng
        updatedItems = state.listCart.concat({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }

      // Cập nhật state
      state.listCart = updatedItems;
      state.totalPrice = updatedTotalPrice;

      // Lưu dữu liệu vào localStorage
      cart = {
        listCart: state.listCart,
        totalPrice: state.totalPrice,
      };
      saveToStorage("cart", cart);
    },
    DELETE_CART(state, action) {
      // Tìm kiếm index của sản phẩm muốn xoá khỏi giỏ hàng
      const existingCartItemIndex = state.listCart.findIndex(
        (item) => item._id.$oid === action.payload,
      );

      // Lấy sản phẩm muốn xoá từ giỏ hàng
      const existingItem = state.listCart[existingCartItemIndex];
      // Cập nhật tổng tiền của giỏ hàng
      const updatedTotalPrice =
        state.totalPrice - existingItem.price * existingItem.quantity;

      // Sao chép lại dữ liệu giỏ hàng
      const updatedItems = [...state.listCart];
      // Xoá sản phẩm khỏi giỏ hàng
      updatedItems.splice(existingCartItemIndex, 1);

      // Cập nhật state
      state.listCart = updatedItems;
      state.totalPrice = updatedTotalPrice;

      // Lưu dữu liệu vào localStorage
      cart = {
        listCart: state.listCart,
        totalPrice: state.totalPrice,
      };

      saveToStorage("cart", cart);
    },
    REMOVE_ITEM(state, action) {
      // Tìm kiếm index của sản phẩm muốn bỏ khỏi giỏ hàng
      const existingCartItemIndex = state.listCart.findIndex(
        (item) => item._id.$oid === action.payload,
      );

      // Lấy thông tin sản phẩm muốn bỏ từ giỏ hàng
      const existingItem = state.listCart[existingCartItemIndex];
      // Cập nhật tổng tiền của giỏ hàng
      const updatedTotalPrice = state.totalPrice - existingItem.price;

      let updatedItems;

      if (existingItem.quantity === 1) {
        // Nếu số lượng sản phẩm muốn bỏ = 1 thì xoá sản phẩm khỏi giỏ hàng
        updatedItems = state.listCart.filter(
          (item) => item.id !== action.payload,
        );
      } else {
        // Nếu không thì giảm bớt số lượng sản phẩm đi 1
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };

        // Sap chép dữ liệu giỏ hàng
        updatedItems = [...state.listCart];
        // Cập nhật dữ liệu giỏ hàng tại vị trí sản phẩm bỏ đi
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      // Cập nhật state
      state.listCart = updatedItems;
      state.totalPrice = updatedTotalPrice;

      // Lưu dữu liệu vào localStorage
      cart = {
        listCart: state.listCart,
        totalPrice: state.totalPrice,
      };

      saveToStorage("cart", cart);
    },
  },
});

export default cartSlice;
