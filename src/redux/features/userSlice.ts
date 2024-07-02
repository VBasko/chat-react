import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export interface UserState {
  value: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  value: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.value = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    clearUser: (state) => {
      state.value = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
