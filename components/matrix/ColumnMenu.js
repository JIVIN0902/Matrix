import React, { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import {
  setColumns,
  setPasteColumnContent,
  setRows,
} from "../../state/matrix/matrixSlice";
import { MenuItem } from "@mui/material";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

export function incrementString(value) {
  let carry = 1;
  let res = "";

  for (let i = value.length - 1; i >= 0; i--) {
    let char = value.toUpperCase().charCodeAt(i);

    char += carry;

    if (char > 90) {
      char = 65;
      carry = 1;
    } else {
      carry = 0;
    }

    res = String.fromCharCode(char) + res;

    if (!carry) {
      res = value.substring(0, i) + res;
      break;
    }
  }

  if (carry) {
    res = "A" + res;
  }

  return res;
}

const ColumnMenu = ({ currentColumn }) => {
  const { columns, rows } = useSelector((state) => state.matrix);
  const [numColsLeft, setNumColsLeft] = useState(1);
  const [numColsRight, setNumColsRight] = useState(1);
  const dispatch = useDispatch();
  const idx = columns.findIndex((col) => col.field === currentColumn.field);

  const { pasteColumnContent } = useSelector((state) => state.matrix);

  const changeRows = (colName) => {
    dispatch(
      setRows(
        rows.map((row) => {
          return { ...row, [colName]: "" };
        })
      )
    );
  };

  const addColumn = (direction) => {
    console.log(direction);
    const idx = columns.findIndex((col) => col.field === currentColumn.field);
    if (direction > 0) {
      const before = columns.slice(0, idx + 1);

      const newCols = [];
      for (let i = 0; i < numColsRight; i++) {
        const newCol = {
          field: Math.random().toString(),
          headerName:
            i === 0
              ? incrementString(before[before.length - 1].headerName)
              : incrementString(newCols[i - 1].headerName),
          width: 150,
          editable: true,
        };
        newCols.push(newCol);
      }
      const after = columns.slice(idx + 1).map((col) => {
        let newHeaderName = "";
        for (let i = 0; i < numColsRight; i++) {
          newHeaderName = newHeaderName
            ? incrementString(newHeaderName)
            : incrementString(col.headerName);
        }
        return {
          ...col,
          headerName: newHeaderName,
        };
      });
      console.log(before, newCols, after);
      changeRows(incrementString(before[before.length - 1].field));
      //   dispatch(setColumns([...before, ...newCols, ...after]));

      dispatch(
        setColumns(changeColumnColors([...before, ...newCols, ...after]))
      );
    } else {
      const before = columns.slice(0, idx);
      console.log(before);

      let newCols = [];
      for (let i = 0; i < numColsLeft; i++) {
        const newCol = {
          field: Math.random().toString(),
          headerName:
            i > 0
              ? incrementString(newCols[i - 1].headerName)
              : before.length > 1
              ? incrementString(before[before.length - 1].headerName)
              : "A",
          width: 150,
          editable: true,
        };
        newCols.push(newCol);
      }
      const after = columns.slice(idx).map((col) => {
        let newHeaderName = "";
        for (let i = 0; i < numColsLeft; i++) {
          newHeaderName = newHeaderName
            ? incrementString(newHeaderName)
            : incrementString(col.headerName);
        }
        return {
          ...col,
          headerName: newHeaderName,
        };
      });
      console.log(before, newCols, after);
      dispatch(
        setColumns(changeColumnColors([...before, ...newCols, ...after]))
      );
    }
  };

  const changeColumnColors = (columns) => {
    const cols = columns.map((col) => ({
      ...col,
      headerClassName: "",
      cellClassName: "",
    }));
    return cols.map((col) => ({
      ...col,
      headerClassName:
        col.headerName === "A"
          ? "col-a"
          : col.headerName === "B"
          ? "col-b"
          : "",
      cellClassName:
        col.headerName === "A"
          ? "col-a"
          : col.headerName === "B"
          ? "col-b"
          : "",
    }));
  };

  const deleteColumn = () => {
    const before = columns.slice(0, idx);
    const after = columns.slice(idx + 1).map((col) => {
      return {
        ...col,
        // field: String.fromCharCode(col.field.charCodeAt(0) - 1),
        headerName: String.fromCharCode(col.headerName.charCodeAt(0) - 1),
      };
    });

    dispatch(setColumns([...before, ...after]));
  };

  const clearColumn = () => {
    // console.log(rows[0][currentColumn.field]);
    const newRows = [...rows].map((item) => {
      return {
        ...item,
        [currentColumn.field]: "",
      };
    });
    dispatch(setRows(newRows));
  };

  const cutColumn = () => {
    const contentToPaste = rows.map((row) => row[currentColumn.field]);
    dispatch(setPasteColumnContent(contentToPaste));
    clearColumn();
  };

  const copyColumn = () => {
    const contentToPaste = rows.map((row) => row[currentColumn.field]);
    dispatch(setPasteColumnContent(contentToPaste));
  };

  const pasteColumn = () => {
    // console.log(currentColumn, pasteColumnContent);
    if (pasteColumnContent?.length > 0) {
      const newRows = [...rows].map((item, index) => {
        return {
          ...item,
          [currentColumn.field]: pasteColumnContent[index],
        };
      });
      dispatch(setRows(newRows));
    }
  };
  return (
    <div>
      <Menu>
        <MenuItem>
          <AddIcon onClick={() => addColumn(-1)} />
          <span onClick={() => addColumn(-1)}>Insert</span>
          <input
            type="number"
            min={1}
            max={10}
            value={numColsLeft}
            onChange={(e) => setNumColsLeft(e.target.value)}
            style={{ width: "35px", marginLeft: "5px", marginRight: "5px" }}
          />{" "}
          <span onClick={() => addColumn(-1)}>Columns Left</span>
        </MenuItem>
        <MenuItem>
          <AddIcon onClick={() => addColumn(1)} />
          <span onClick={() => addColumn(1)}>Insert</span>
          <input
            type="number"
            max={10}
            min={1}
            value={numColsRight}
            onChange={(e) => setNumColsRight(e.target.value)}
            style={{ width: "35px", marginLeft: "5px", marginRight: "5px" }}
          />{" "}
          <span onClick={() => addColumn(-1)}>Columns Right</span>
        </MenuItem>
        <MenuItem onClick={deleteColumn}>
          <DeleteIcon />
          Delete Column
        </MenuItem>
        <MenuItem onClick={clearColumn}>
          <ClearIcon />
          Clear Column
        </MenuItem>
        <MenuItem onClick={cutColumn}>
          <ContentCutIcon />
          Cut
        </MenuItem>
        <MenuItem onClick={copyColumn}>
          <ContentCopyIcon />
          Copy
        </MenuItem>
        <MenuItem onClick={pasteColumn}>
          <ContentPasteIcon />
          Paste
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ColumnMenu;

const Menu = styled.div`
  position: absolute;
  background: white;
  width: 250px;
  visibility: ${(props) => props.visibility};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;

  div {
    padding: 5px 0px;
    width: 100%;
    text-align: initial !important;
    padding-left: 10px;
    display: flex;
    cursor: pointer;
    align-items: center;
  }

  div:hover {
    background: #eee;
  }
`;
