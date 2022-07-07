import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import decisionSlice from "./decision/decisionSlice";
import matrixSlice from "./matrix/matrixSlice";

export const store = configureStore({
  reducer: {
    matrix: matrixSlice,
    app: appSlice,
    decision: decisionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
