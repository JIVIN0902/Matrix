import { createSlice } from "@reduxjs/toolkit";
import {
  DEFAULT_CHART_CELL_HEIGHT,
  DEFAULT_CHART_CELL_WIDTH,
  DEFAULT_CHART_LINE_HEIGHT,
  DEFAULT_COL_WIDTH,
} from "../../constants";
import rows from "../../public/data.json";

function getValue(params, field) {
  return params?.row[field]?.value;
}

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
      valueGetter: (params) => getValue(params, "a"),
      groupingValueGetter: (params) => getValue(params, "a"),
    },
    {
      field: "b",
      headerName: "B",
      width: DEFAULT_COL_WIDTH,
      editable: true,
      cellClassName: "col-b",
      headerClassName: "col-b",
      valueGetter: (params) => getValue(params, "b"),
      groupingValueGetter: (params) => getValue(params, "b"),
    },
    {
      field: "c",
      headerName: "C",
      // type: "number",
      width: DEFAULT_COL_WIDTH,
      editable: true,
      valueGetter: (params) => getValue(params, "c"),
    },
  ],
  originalData: [],
  skipPcReset: false,
  selectedColumn: {},
  title: "",
  rows,
  pasteColumnContent: {},
  pasteRowContent: {},
  chartData: [],
  orgChartData: [],
  chartCellDimensions: {
    width: DEFAULT_CHART_CELL_WIDTH,
    height: DEFAULT_CHART_CELL_HEIGHT,
    lineHeight: DEFAULT_CHART_LINE_HEIGHT,
  },
  nodeOption: "",
  framework: "Framework",
  weights: {
    cost: 0,
    time: 0,
    resources: 0,
    intangibles: 0,
    total: 0,
  },
  rowSelection: {},
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
    setOrgChartData: (state, action) => {
      state.orgChartData = action.payload;
    },
    setChartCellDimensions: (state, action) => {
      state.chartCellDimensions = action.payload;
    },
    setNodeOption: (state, action) => {
      state.nodeOption = action.payload;
    },
    setFramework: (state, action) => {
      state.framework = action.payload;
    },
    setWeights: (state, action) => {
      state.weights = action.payload;
    },
    setRowSelection: (state, action) => {
      state.rowSelection = action.payload;
    },
  },
});

export const {
  setColumns,
  setRows,
  setTitle,
  setSkipPcReset,
  setSelectedColumn,
  setPasteColumnContent,
  setPasteRowContent,
  setChartData,
  setChartCellDimensions,
  setNodeOption,
  setFramework,
  setWeights,
  setOrgChartData,
  setRowSelection,
} = matrixSlice.actions;

export default matrixSlice.reducer;
