import { createSlice } from "@reduxjs/toolkit";
import makeData from "../../components/matrix/makeData";

const initialState = {
  columns: [
    {
      field: "id",
      headerName: "",
      width: 90,
    },
    {
      field: "a",
      headerName: "A",
      width: 150,
      editable: true,
      cellClassName: "col-a",
      headerClassName: "col-a",
    },
    {
      field: "b",
      headerName: "B",
      width: 150,
      editable: true,
      cellClassName: "col-b",
      headerClassName: "col-b",
    },
    {
      field: "c",
      headerName: "C",
      // type: "number",
      width: 110,
      editable: true,
    },
  ],
  data: makeData(100),
  originalData: [],
  skipPcReset: false,
  selectedColumn: {},
  title: "",
  rows: [
    { id: 0, b: "Snow", a: "Jon", c: 35, editable: true },
    { id: 1, b: "Lannister", a: "Cersei", c: 42 },
    { id: 2, b: "Lannister", a: "Jaime", c: 45 },
    { id: 3, b: "Stark", a: "Arya", c: 16 },
    { id: 4, b: "Targaryen", a: "Daenerys", c: null },
    { id: 5, b: "Melisandre", a: null, c: 150 },
    { id: 6, b: "Clifford", a: "Ferrara", c: 44 },
    { id: 7, b: "Frances", a: "Rossini", c: 36 },
    { id: 8, b: "Roxie", a: "Harvey", c: 65 },
    { id: 9, b: "Snow", a: "Jon", c: 35 },
    { id: 10, b: "Lannister", a: "Cersei", c: 42 },
    { id: 11, b: "Lannister", a: "Jaime", c: 45 },
    { id: 12, b: "Stark", a: "Arya", c: 16 },
    { id: 13, b: "Targaryen", a: "Daenerys", c: null },
    { id: 14, b: "Melisandre", a: null, c: 150 },
    { id: 15, b: "Clifford", a: "Ferrara", c: 44 },
    { id: 16, b: "Frances", a: "Rossini", c: 36 },
    { id: 17, b: "Roxie", a: "Harvey", c: 65 },
  ],
  pasteColumnContent: {},
  pasteRowContent: {},
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
} = matrixSlice.actions;

export default matrixSlice.reducer;
