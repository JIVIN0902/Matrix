import { configureStore } from "@reduxjs/toolkit";
import matrixSlice from "./matrix/matrixSlice";

export const store = configureStore({
  reducer: {
    matrix: matrixSlice,
  },
});
