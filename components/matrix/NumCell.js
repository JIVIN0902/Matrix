import React from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { setColumns, setData } from "../../state/matrix/matrixSlice";
import ClearIcon from "@mui/icons-material/Clear";

const NumCell = ({ cell, index }) => {
  const [visibility, setVisibility] = React.useState("hidden");
  const data = useSelector((state) => state.matrix.data);
  const dispatch = useDispatch();

  const formatRow = (row) => {
    let newObj = {};
    for (let key in row) {
      newObj[key] = "";
    }
    return newObj;
  };

  const addRow = (direction) => {
    if (direction > 0) {
      const before = data.slice(0, index + 1);
      const after = data.slice(index + 1);
      formatRow(data[0]);
      dispatch(setData([...before, formatRow(data[0]), ...after]));
    } else {
      const before = data.slice(0, index);
      const after = data.slice(index);
      formatRow(data[0]);
      dispatch(setData([...before, formatRow(data[0]), ...after]));
    }
    setVisibility("hidden");
  };

  const deleteRow = () => {
    dispatch(setData(data.filter((row, i) => i !== index)));
    setVisibility("hidden");
  };

  const clearRow = () => {
    dispatch(
      setData(data.map((row, i) => (i === index ? formatRow(row) : row)))
    );
    setVisibility("hidden");
  };
  return (
    <td
      style={{ background: "#eee", position: "relative" }}
      {...cell.getCellProps()}
    >
      <Cell
        onClick={() =>
          setVisibility((prev) => (prev === "hidden" ? "visible" : "hidden"))
        }
      >
        {cell.render(index)}
      </Cell>

      <ColumnMenu visibility={visibility}>
        <div onClick={() => addRow(1)}>
          <AddIcon /> Insert 1 Row Down
        </div>
        <div onClick={() => addRow(-1)}>
          <AddIcon />
          Insert 1 Row up
        </div>
        <div onClick={deleteRow}>
          <DeleteIcon />
          Delete Row
        </div>
        <div onClick={clearRow}>
          <ClearIcon />
          Clear Row
        </div>
      </ColumnMenu>
    </td>
  );
};

export default NumCell;

const Cell = styled.span`
  padding: 20px;
  cursor: pointer;
  position: relative;
`;

const ColumnMenu = styled.div`
  position: absolute;
  background: white;
  top: 15px;
  left: 20%;
  width: 250px;
  visibility: ${(props) => props.visibility};
  z-index: 100;
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
    align-items: center;
    cursor: pointer;
  }

  div:hover {
    background: #eee;
  }
`;
