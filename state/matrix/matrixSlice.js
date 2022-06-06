import { createSlice } from "@reduxjs/toolkit";
import {
  DEFAULT_CHART_CELL_HEIGHT,
  DEFAULT_CHART_CELL_WIDTH,
  DEFAULT_COL_WIDTH,
} from "../../constants";

const initialState = {
  columns: [
    {
      field: "id",
      headerName: "S No.",
      width: 90,
      disableExport: true,
    },
    {
      field: "a",
      headerName: "A",
      width: DEFAULT_COL_WIDTH,
      editable: true,
      cellClassName: "col-a",
      headerClassName: "col-a",
      resizable: true,
    },
    {
      field: "b",
      headerName: "B",
      width: DEFAULT_COL_WIDTH,
      editable: true,
      cellClassName: "col-b",
      headerClassName: "col-b",
    },
    {
      field: "c",
      headerName: "C",
      // type: "number",
      width: DEFAULT_COL_WIDTH,
      editable: true,
    },
  ],
  originalData: [],
  skipPcReset: false,
  selectedColumn: {},
  title: "",
  rows: [
    { id: 0, a: "First Name", b: "Last Name", c: "Age" },
    { id: 1, b: "Lannister", a: "Cersei", c: 42 },
    { id: 2, b: "Lannister", a: "Jaime", c: 45 },
    { id: 3, b: "Stark", a: "Arya", c: 16 },
    { id: 4, b: "Targaryen", a: "Daenerys", c: null },
    { id: 5, b: "Melisandre", a: "Lady", c: 150 },
    { id: 6, b: "Clifford", a: "Ferrara", c: 44 },
    { id: 7, b: "Frances", a: "Rossini", c: 36 },
    { id: 8, b: "Roxie", a: "Harvey", c: 65 },
    { id: 9, b: "Snow", a: "Jon", c: 35 },
    { id: 10, b: "Lannister", a: "Cersei", c: 42 },
    { id: 11, b: "Lannister", a: "Jaime", c: 45 },
    { id: 12, b: "Stark", a: "Arya", c: 16 },
    { id: 13, b: "Targaryen", a: "Daenerys", c: null },
    { id: 14, b: "Melisandre", a: "Lady", c: 150 },
    { id: 15, b: "Clifford", a: "Ferrara", c: 44 },
    { id: 16, b: "Frances", a: "Rossini", c: 36 },
    { id: 17, b: "Roxie", a: "Harvey", c: 65 },
  ],
  pasteColumnContent: {},
  pasteRowContent: {},
  chartData: [],
  showState: "",
  chartCellDimensions: {
    width: DEFAULT_CHART_CELL_WIDTH,
    height: DEFAULT_CHART_CELL_HEIGHT,
  },
};

export const matrixSlice = createSlice({
  name: "matrix",
  initialState,
  reducers: {
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    setSkipPcReset: (state, action) => {
      state.skipPcReset = action.payload;
    },
    setSelectedColumn: (state, action) => {
      state.selectedColumn = action.payload;
    },
    setPasteColumnContent: (state, action) => {
      state.pasteColumnContent = action.payload;
    },
    setPasteRowContent: (state, action) => {
      state.pasteRowContent = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
    setShowState: (state, action) => {
      state.showState = action.payload;
    },
    setChartCellDimensions: (state, action) => {
      state.chartCellDimensions = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setColumns,
  setRows,
  setTitle,
  setSkipPcReset,
  setSelectedColumn,
  setPasteColumnContent,
  setPasteRowContent,
  setChartData,
  setShowState,
  setChartCellDimensions,
} = matrixSlice.actions;

export default matrixSlice.reducer;
