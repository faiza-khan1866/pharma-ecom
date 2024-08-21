import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  items: [],
  cartCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      state.cartCount = state.cartCount + 1;
      state.items = state.items.concat(action.payload);
    },
    removeCartItem: (state, action) => {
      state.cartCount = state.cartCount - 1;
      state.items = action.payload;
      if (state.cartCount <= 0) {
        state.cartCount = 0;
      }
    },
    updateCartItem: (state, action) => {
      state.items = action.payload;
    },
    expiredItemCartUpdate: (state, action) => {
      state.items = action.payload;
      state.cartCount = action.payload?.length;
    },
    clearCartItems: (state) => {
      state.cartCount = 0;
      state.items = [];
    },
  },
});

export let { addtoCart, removeCartItem, updateCartItem, clearCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
