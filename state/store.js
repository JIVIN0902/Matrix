import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import matrixSlice from "./matrix/matrixSlice";

export const store = configureStore({
  reducer: {
    matrix: matrixSlice,
    app: appSlice,
  },
});
