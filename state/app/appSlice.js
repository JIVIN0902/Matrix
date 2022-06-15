import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showState: "matrix",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowState: (state, action) => {
      state.showState = action.payload;
    },
  },
});

export const { setShowState } = appSlice.actions;

export default appSlice.reducer;
