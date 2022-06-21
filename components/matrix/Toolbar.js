import React from "react";
import { Chip, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-premium";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { setRows } from "../../state/matrix/matrixSlice";
import { setShowState } from "../../state/app/appSlice";

const Toolbar = ({ rowGroupingModelStr, readExcelFile, groupRows }) => {
  const { rows, title } = useSelector((state) => state.matrix);

  const dispatch = useDispatch();

  const clearAll = () => {
    const clearedRows = rows.map((row, index) => {
      const newRow = {};
      Object.keys(row).map((key) => {
        if (key !== "id") {
          newRow[key] = "";
        }
      });
      newRow.id = index;
      return newRow;
    });
    dispatch(setRows(clearedRows));
  };

  const exceljsPreProcess = ({ workbook, worksheet }) => {
    workbook.created = new Date(); // Add metadata
    worksheet.name = title; // Modify worksheet name
  };

  return (
    <GridToolbarContainer>
      <Stack
        sx={{ width: "100%", mb: 1 }}
        direction="row"
        alignItems="flex-start"
        columnGap={1}
      >
        <Chip
          label="Group by col A"
          onClick={() => groupRows("a")}
          variant="outlined"
          color={rowGroupingModelStr === "a" ? "primary" : undefined}
        />
        <Chip
          label="Group by col B"
          onClick={() => groupRows("b")}
          variant="outlined"
          color={rowGroupingModelStr === "b" ? "primary" : undefined}
        />
        <Chip
          label="Org Chart"
          onClick={() => dispatch(setShowState("orgChart"))}
          variant="outlined"
        />
        <Chip
          label="Fish Bone"
          onClick={() => dispatch(setShowState("fishbone"))}
          variant="outlined"
        />
        <Chip
          label="Mind Map"
          onClick={() => dispatch(setShowState("mindMap"))}
          variant="outlined"
        />
        <Chip
          label="Word Cloud"
          onClick={() => dispatch(setShowState("wordCloud"))}
          variant="outlined"
        />
      </Stack>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        excelOptions={{
          exceljsPreProcess,
          fileName: title,
          includeHeaders: false,
        }}
      />

      <ClearAll onClick={clearAll}>
        <ClearIcon color="primary" />
        <Typography fontSize={15} color="primary" component="h6">
          Clear All
        </Typography>
      </ClearAll>
      <input
        type="file"
        id="import-file"
        onChange={(e) => readExcelFile(e.target.files[0], "import")}
      />
    </GridToolbarContainer>
  );
};

const ClearAll = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding-right: 5px;
`;
export default Toolbar;
