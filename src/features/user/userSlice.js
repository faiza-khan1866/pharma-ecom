import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  pageShow: false,
  userData: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return { ...state, ...action.payload, isAuthenticated: true };
    },
    logOutUser: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        auth_token: null,
        userData: {},
      };
    },
    showComponent: (state, action) => {
      state.pageShow = action.payload;
    },
    userInfo: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export let { loginUser, logOutUser, userInfo } = userSlice.actions;

export default userSlice.reducer;
