import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forceFieldOpen: false,
  forceFieldParams: {},
  analysisData: {
    for: [
      {
        number: 0,
        text: "",
        id: 1,
      },
      {
        number: 0,
        text: "",
        id: 2,
      },
      {
        number: 0,
        text: "",
        id: 3,
      },
      {
        number: 0,
        text: "",
        id: 4,
      },
      {
        number: 0,
        text: "",
        id: 5,
      },
    ],
    against: [
      {
        number: 0,
        text: "",
        id: 1,
      },
      {
        number: 0,
        text: "",
        id: 2,
      },
      {
        number: 0,
        text: "",
        id: 3,
      },
      {
        number: 0,
        text: "",
        id: 4,
      },
      {
        number: 0,
        text: "",
        id: 5,
      },
    ],
    totalFor: 0,
    totalAgainst: 0,
  },
  decisionRows: [],
};

export const decisionSlice = createSlice({
  name: "decision",
  initialState,
  reducers: {
    setForceFieldOpen: (state, action) => {
      state.forceFieldOpen = action.payload;
    },
    setForceFieldParams: (state, action) => {
      state.forceFieldParams = action.payload;
    },
    setAnalysisData: (state, action) => {
      state.analysisData = action.payload;
    },
    setDecisionRows: (state, action) => {
      state.decisionRows = action.payload;
    },
  },
});

export const {
  setForceFieldOpen,
  setAnalysisData,
  setForceFieldParams,
  setDecisionRows,
} = decisionSlice.actions;

export default decisionSlice.reducer;
