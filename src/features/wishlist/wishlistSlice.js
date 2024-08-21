import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  items: [],
  wishCount: 0,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addtoWishlist: (state, action) => {
      state.wishCount = state.wishCount + 1;
      state.items = state.items.concat(action.payload);
    },
    removeWishlistItem: (state, action) => {
      state.wishCount = state.wishCount - 1;
      state.items = action.payload;
      if (state.wishCount <= 0) {
        state.wishCount = 0;
      }
    },
    expiredWishlistItemUpdate: (state, action) => {
      state.items = action.payload;
      state.wishCount = action.payload?.length;
    },
    clearWishListItems: (state) => {
      state.wishCount = 0;
      state.items = [];
    },
  },
});

export let { addtoCart, removeCartItem, updateCartItem, clearCartItems } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
