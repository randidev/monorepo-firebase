import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./data";
import { UserState } from "./@types";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<UserState>) => {
      state.list = payload.list;
      state.lastUpdated = payload.lastUpdated;
    },
    PURGE: (state) => {
      // eslint-disable-next-line
      state = initialState;
    },
  },
});

export const { actions: userActions, reducer: userReducers } = userSlice;
