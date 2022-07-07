import { DataGridPremium } from "@mui/x-data-grid-premium";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import shortUUID from "short-uuid";
import { DEFAULT_COL_WIDTH } from "../../constants";
import GoBack from "../GoBack";

const translator = shortUUID();

const columns = [
  {
    field: "id",
    headerName: "S No.",
    width: 90,
    disableExport: true,
  },
  {
    field: "value",
    headerName: "Value",
    width: DEFAULT_COL_WIDTH,
  },
  {
    field: "file",
    headerName: "File",
    width: DEFAULT_COL_WIDTH,
  },
  {
    field: "video",
    headerName: "Video",
    width: DEFAULT_COL_WIDTH,
  },
  {
    field: "comment",
    headerName: "Comment",
    width: DEFAULT_COL_WIDTH,
  },
  {
    field: "impact",
    headerName: "Impact",
    width: DEFAULT_COL_WIDTH,
  },
  {
    field: "votes",
    headerName: "Votes",
    width: DEFAULT_COL_WIDTH,
    valueGetter: (params) => params.row.votes.up - params.row.votes.down,
  },
  {
    field: "link",
    headerName: "Link",
    width: DEFAULT_COL_WIDTH,
  },
  {
    field: "analysisData",
    headerName: "Force Field Value",
    width: DEFAULT_COL_WIDTH,
  },
];

const Collateral = () => {
  const { rows } = useSelector((state) => state.matrix);
  const [collateralRows, setCollateralRows] = useState([]);

  const modifyRows = () => {
    const newRows = [];
    let i = 0;
    rows.slice(1).map((row) => {
      Object.keys(row).map((key) => {
        if (row[key].value) {
          newRows.push({ ...row[key], id: i });
          i++;
        }
      });
    });

    setCollateralRows(newRows);
  };

  useEffect(() => {
    modifyRows();
  }, []);
  return (
    <>
      <GoBack title="Collateral" />
      <div style={{ width: "100vw", height: "93vh" }}>
        <DataGridPremium
          rows={collateralRows}
          checkboxSelection
          columns={columns}
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default Collateral;
