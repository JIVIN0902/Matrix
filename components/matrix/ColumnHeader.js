import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  setColumns,
  setData,
  setSelectedColumn,
} from "../../state/matrix/matrixSlice";
import ClearIcon from "@mui/icons-material/Clear";

const ColumnHeader = ({ column, idx }) => {
  const [visibility, setVisibility] = React.useState("hidden");
  const columns = useSelector((state) => state.matrix.columns);
  const data = useSelector((state) => state.matrix.data);
  const dispatch = useDispatch();

  const addColumn = (direction) => {
    if (direction > 0) {
      const before = columns.slice(0, idx + 4);
      const after = columns.slice(idx + 4).map((col) => {
        return {
          ...col,
          Header: String.fromCharCode(col.Header.charCodeAt(0) + 1),
        };
      });
      const newCol = {
        accessor: Math.random().toString(),
        Header: String.fromCharCode(
          before[before.length - 1].Header.charCodeAt(0) + 1
        ),
      };
      console.log(before, newCol, after);
      dispatch(setColumns([...before, newCol, ...after]));
    } else {
      const before = columns.slice(0, idx + 3);
      const after = columns.slice(idx + 3).map((col) => {
        return {
          ...col,
          Header: String.fromCharCode(col.Header.charCodeAt(0) + 1),
        };
      });
      const newCol = {
        accessor: Math.random().toString(),
        Header: String.fromCharCode(
          before[before.length - 1].Header.charCodeAt(0) + 1
        ),
      };
      // console.log(before,newCol,after)
      dispatch(setColumns([...before, newCol, ...after]));
    }
    setVisibility("hidden");
  };

  const deleteColumn = () => {
    const before = columns.slice(0, idx + 3);
    const after = columns.slice(idx + 4).map((col) => {
      return {
        ...col,
        Header: String.fromCharCode(col.Header.charCodeAt(0) - 1),
      };
    });

    dispatch(setColumns([...before, ...after]));
    setVisibility("hidden");
  };

  const clearColumn = () => {
    const newData = [...data].map((item) => {
      return {
        ...item,
        [column.id]: "",
      };
    });
    dispatch(setData(newData));
    setVisibility("hidden");
  };
  const selectedColumn = useSelector((state) => state.matrix.selectedColumn);
  // console.log(selectedColumn)
  return (
    <th
      onClick={() => dispatch(setSelectedColumn(columns[idx + 3]))}
      {...column.getHeaderProps()}
    >
      <span>
        <div>{column.render("Header")}</div>
        <ArrowDropDownIcon
          onClick={() =>
            setVisibility((prev) => (prev === "hidden" ? "visible" : "hidden"))
          }
        />
        <ColumnMenu visibility={visibility}>
          <div onClick={() => addColumn(-1)}>
            <AddIcon /> Insert 1 Column left
          </div>
          <div onClick={() => addColumn(1)}>
            <AddIcon />
            Insert 1 Column right
          </div>
          <div onClick={deleteColumn}>
            <DeleteIcon />
            Delete Column
          </div>
          <div onClick={clearColumn}>
            <ClearIcon />
            Clear Column
          </div>
        </ColumnMenu>
      </span>
    </th>
  );
};

export default ColumnHeader;

const ColumnMenu = styled.div`
  position: absolute;
  background: white;
  top: 25px;
  left: 10%;
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
