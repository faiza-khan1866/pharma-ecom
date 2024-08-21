import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  shippingOptions: {},
  shipping: {
    type: "",
    price: "",
  },
};

export const shippingSlice = createSlice({
  name: "shippingType",
  initialState,
  reducers: {
    setShippingOptions: (state, action) => {
      state.shippingOptions = action.payload;
    },
    setShipping: (state, action) => {
      state.shipping = action.payload;
    },
    clearShipping: (state) => {
      state = initialState;
    },
  },
});

export let { setShippingOptions, clearShipping, setShipping } =
  shippingSlice.actions;

export default shippingSlice.reducer;
