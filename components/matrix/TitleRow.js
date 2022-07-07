import styled from "styled-components";
import { FormControl, Input, MenuItem, Select } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setColumns,
  setFramework,
  setRows,
  setTitle,
} from "../../state/matrix/matrixSlice";
import frameworks from "./frameworks";
import { DEFAULT_COL_WIDTH } from "../../constants";
import { incrementString } from "./ColumnMenu";

const TitleRow = () => {
  const { title, framework, rows } = useSelector((state) => state.matrix);
  const dispatch = useDispatch();
  const [version, setVersion] = React.useState("Version");

  function getValue(params, field) {
    return params?.row[field]?.value;
  }

  const modifyRows = (rows) => {
    let headerName = "A";
    let newCols = [
      {
        field: "id",
        headerName: "S No.",
        width: 90,
        disableExport: true,
      },
    ];
    let newCol = {
      width: DEFAULT_COL_WIDTH,
      editable: true,
    };
    rows[0].map((value, index) => {
      const field = headerName.toLowerCase();
      if (index < 2) {
        newCol = {
          ...newCol,
          field,
          headerName: headerName,
          valueGetter: (params) => getValue(params, field),
          groupingValueGetter: (params) => getValue(params, field),
        };
      } else {
        newCol = {
          ...newCol,
          field,
          headerName: headerName,
          valueGetter: (params) => getValue(params, field),
        };
      }
      headerName = incrementString(headerName);
      newCols.push(newCol);
    });

    dispatch(setColumns(newCols));

    const modifiedRows = rows.map((row, index) => {
      let field = "a";
      let newRow = { id: index, editable: true, editedCols: [] };
      row.map((value) => {
        newRow[field] = {
          value: value?.toString(),
          video: null,
          file: null,
          comment: "",
          link: "",
          votes: { up: 0, down: 0 },
          impact: 0,
        };
        field = incrementString(field).toLowerCase();
      });
      return newRow;
    });
    dispatch(setRows([...modifiedRows]));
  };

  return (
    <Container>
      <Flex>
        <span>Framework: </span>
        <FormControl sx={{ m: 0.5, minWidth: 120, height: 40 }}>
          <Select
            value={framework}
            style={{ height: 35 }}
            onChange={(e) => {
              dispatch(setFramework(e.target.value));
              modifyRows(frameworks[e.target.value], true);
            }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="Framework">Framework</MenuItem>
            {Object.keys(frameworks).map((key, index) => (
              <MenuItem key={index} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Flex>
      <Input
        id="outlined-basic"
        placeholder="Problem/Goal"
        variant="outlined"
        value={title}
        onChange={(e) => dispatch(setTitle(e.target.value))}
      />

      <Flex>
        <span>Version:</span>
        <FormControl sx={{ m: 0.5, minWidth: 120 }}>
          <Select
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            displayEmpty
            style={{ height: 35 }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="Version">Version</MenuItem>
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
          </Select>
        </FormControl>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;
export default TitleRow;
