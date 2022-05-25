import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";

import React, { useState } from "react";

const Sheet = () => {
  const [grid, setGrid] = useState(
    [{ value: 1 }, { value: 3 }],
    [{ value: 2 }, { value: 4 }]
  );

  return (
    <ReactDataSheet
      data={grid}
      valueRenderer={(cell) => cell.value}
    //   onCellsChanged={(changes) => {
    //     const grid = grid.map((row) => [...row]);
    //     changes.forEach(({ cell, row, col, value }) => {
    //       grid[row][col] = { ...grid[row][col], value };
    //     });
    //     setGrid(grid);
    //   }}
    />
  );
};

export default Sheet;
