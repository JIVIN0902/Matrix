import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPasteRowContent, setRows } from "../../state/matrix/matrixSlice";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

const RowMenu = ({ contextMenu, handleClose, selectedRow: idx }) => {
  const { rows, pasteRowContent } = useSelector((state) => state.matrix);
  const [numRowsAbove, setNumRowsAbove] = useState(1);
  const [numRowsBelow, setNumRowsBelow] = useState(1);

  const dispatch = useDispatch();
  const sampleRow = rows[0];
  const newRow = {};
  Object.keys(sampleRow).map((key) => {
    newRow[key] = "";
  });

  const addRow = (direction) => {
    if (direction < 0) {
      const before = rows.slice(0, idx);
      const after = rows.slice(idx);
      let extraRows = [];

      for (let i = 0; i < numRowsAbove; i++) {
        extraRows.push(newRow);
      }
      const newRows = [...before, ...extraRows, ...after].map((row, index) => ({
        ...row,
        id: index,
      }));
      dispatch(setRows(newRows));
    } else {
      const before = rows.slice(0, idx + 1);
      const after = rows.slice(idx + 1);

      let extraRows = [];

      for (let i = 0; i < numRowsBelow; i++) {
        extraRows.push(newRow);
      }
      const newRows = [...before, ...extraRows, ...after].map((row, index) => ({
        ...row,
        id: index,
      }));
      dispatch(setRows(newRows));
    }
  };

  const deleteRow = () => {
    const before = rows.slice(0, idx);
    const after = rows.slice(idx + 1).map((row) => {
      return { ...row, id: row.id };
    });

    dispatch(
      setRows(
        [...before, ...after].map((row, index) => ({ ...row, id: index }))
      )
    );
  };

  const clearRow = () => {
    const newRows = rows.map((row, index) => {
      if (index === idx) {
        return {
          ...newRow,
          id: index,
        };
      }
      return row;
    });
    dispatch(setRows(newRows));
  };

  const cutRow = () => {
    dispatch(setPasteRowContent(rows[idx]));
    clearRow();
  };

  const copyRow = () => {
    dispatch(setPasteRowContent(rows[idx]));
  };
  const pasteRow = () => {
    const rowToPaste = { ...pasteRowContent };
    rowToPaste.id = idx;
    dispatch(
      setRows(
        [
          ...rows.slice(0, idx - 1),
          pasteRowContent,
          ...rows.slice(idx - 1),
        ].map((row, index) => ({ ...row, id: index + 1 }))
      )
    );
  };

  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
      componentsProps={{
        root: {
          onContextMenu: (e) => {
            e.preventDefault();
            handleClose();
          },
        },
      }}
    >
      <MenuItem>
        <AddIcon onClick={() => addRow(-1)} />
        <span onClick={() => addRow(-1)}>Insert</span>
        <input
          type="number"
          min={1}
          max={10}
          value={numRowsAbove}
          onChange={(e) => setNumRowsAbove(e.target.value)}
          style={{ width: "35px", marginLeft: "5px", marginRight: "5px" }}
        />{" "}
        <span onClick={() => addRow(-1)}>Rows Above</span>
      </MenuItem>
      <MenuItem>
        <AddIcon onClick={() => addRow(1)} />
        <span onClick={() => addRow(1)}>Insert</span>
        <input
          type="number"
          min={1}
          max={10}
          value={numRowsBelow}
          onChange={(e) => setNumRowsBelow(e.target.value)}
          style={{ width: "35px", marginLeft: "5px", marginRight: "5px" }}
        />{" "}
        <span onClick={() => addRow(1)}>Rows Below</span>
      </MenuItem>
      <MenuItem onClick={deleteRow}>
        <DeleteIcon /> Delete row
      </MenuItem>
      <MenuItem onClick={clearRow}>
        <ClearIcon /> Clear row
      </MenuItem>
      <MenuItem onClick={cutRow}>
        <ContentCutIcon />
        Cut
      </MenuItem>
      <MenuItem onClick={copyRow}>
        <ContentCopyIcon />
        Copy
      </MenuItem>
      <MenuItem onClick={pasteRow}>
        <ContentPasteIcon />
        Paste
      </MenuItem>
    </Menu>
  );
};

export default RowMenu;
