import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { UserState } from "./user.reducer";

const userSelector = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  [userSelector],
  (user) => user.currentUser
);
