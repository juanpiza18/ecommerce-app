import { createSlice } from "@reduxjs/toolkit";

export type UserState = {
  currentUser: any;
  isLoading: boolean;
  error: string | null;
};

const userInitialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setIsLoading(state, action: { payload: boolean }) {
      state.isLoading = action.payload;
    },
    checkUserSession(state, action) {
      state.currentUser = action.payload;
    },
    login(state, action) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
    loginOrLogoutFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const { login, logout, loginOrLogoutFailure, setIsLoading } =
  userSlice.actions;

export default userSlice.reducer;
