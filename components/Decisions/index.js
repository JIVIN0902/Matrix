import { Button } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import shortUUID from "short-uuid";
import { DECISIONS_COL_WIDTH } from "../../constants";
import {
  setDecisionRows,
  setForceFieldOpen,
  setForceFieldParams,
} from "../../state/decision/decisionSlice";
import GoBack from "../GoBack";
import ForceField from "./ForceField";

const translator = shortUUID();

const columns = [
  {
    field: "idea",
    headerName: "Idea",
    width: DECISIONS_COL_WIDTH,
    editable: true,
    resizable: true,
    valueGetter: (params) => params?.row?.value,
  },
  {
    field: "forceAnalysis",
    headerName: "Force Field Analysis",
    width: DECISIONS_COL_WIDTH,
    editable: false,
    renderCell: (params) => <ForceFieldButton params={params} />,
  },
  {
    field: "rating",
    headerName: "Cost-Effort(Min)",
    width: DECISIONS_COL_WIDTH,
    editable: true,
    // valueGetter: (params) => params?.row?.votes?.vote,
  },
  {
    field: "votes",
    headerName: "Votes(Max)",
    width: DECISIONS_COL_WIDTH,
    editable: true,
    valueGetter: (params) => params?.row?.votes?.vote,
  },
  {
    field: "impact",
    headerName: "Impact(Max)",
    width: DECISIONS_COL_WIDTH,
    editable: true,
  },
  {
    field: "forceField",
    headerName: "Force Field",
    width: DECISIONS_COL_WIDTH,
    editable: true,
  },
  {
    field: "deciderValues",
    headerName: "Decider Values(Min)",
    width: DECISIONS_COL_WIDTH,
    editable: true,
  },
];

const ForceFieldButton = ({ params }) => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(setForceFieldOpen(true));
        dispatch(setForceFieldParams(params.row));
      }}
    >
      Analyse
    </Button>
  );
};

const Decisions = () => {
  const { rows } = useSelector((state) => state.matrix);
  const { forceFieldOpen, decisionRows } = useSelector(
    (state) => state.decision
  );

  const dispatch = useDispatch();
  const modifyRows = () => {
    const newRows = [];
    rows.map((item) => {
      if (item.edited) {
        const keys = item.editedCols;
        keys.map((key) => {
          newRows.push({
            ...item[key],
            id: `${translator.new()}-${item.id}`,
          });
        });
      }
    });
    // console.log(decisionRows);

    dispatch(
      setDecisionRows(
        newRows.map((newRow) => {
          const rowId = parseInt(newRow.id.split("-")[1]);
          const existingRow = decisionRows.find(
            (row) => parseInt(row.id.split("-")[1]) === rowId
          );
          if (existingRow) {
            return { ...existingRow, ...newRow };
          }
          return newRow;
        })
      )
    );
  };

  const updateRows = (e) => {
    console.log(e);
    dispatch(
      setDecisionRows(
        decisionRows.map((row) => {
          if (row.id === e.id) {
            const newRow = { ...row, [e.field]: parseInt(e.value) };
            return newRow;
          }
          return row;
        })
      )
    );
  };

  useEffect(() => {
    modifyRows();
  }, []);

  return (
    <div>
      <GoBack title="Decisions" />

      <div style={{ height: "100vh", width: "100%" }}>
        <DataGridPremium
          rows={decisionRows}
          checkboxSelection
          columns={columns}
          disableSelectionOnClick
          onCellEditCommit={updateRows}
        />
      </div>
      <ForceField
        open={forceFieldOpen}
        handleClose={() => dispatch(setForceFieldOpen(false))}
      />
    </div>
  );
};

export default Decisions;
