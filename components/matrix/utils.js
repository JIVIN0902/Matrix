export const changeColumnColors = (columns) => {
  const cols = columns.map((col) => ({
    ...col,
    headerClassName: "",
    cellClassName: "",
  }));
  return cols.map((col) => ({
    ...col,
    headerClassName:
      col.headerName === "A" ? "col-a" : col.headerName === "B" ? "col-b" : "",
    cellClassName:
      col.headerName === "A" ? "col-a" : col.headerName === "B" ? "col-b" : "",
  }));
};
