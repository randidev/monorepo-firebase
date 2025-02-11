import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./data";
import { ToastState } from "./@types";

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setToast: (state, { payload }: PayloadAction<ToastState>) => {
      state.toast = { ...payload };
    },
    PURGE: (state) => {
      // eslint-disable-next-line
      state = initialState;
    },
  },
});

export const { actions: utilsActions, reducer: utilsReducers } = utilsSlice;
