import * as React from "react";
import ColumnMenu, { incrementString } from "./ColumnMenu";
import { useDispatch, useSelector } from "react-redux";
import RowMenu from "./RowMenu";
import readXlsxFile from "read-excel-file";
import {
  setChartData,
  setColumns,
  setOrgChartData,
  setRows,
  setRowSelection,
  setTitle,
} from "../../state/matrix/matrixSlice";
import { LicenseInfo } from "@mui/x-license-pro";
import {
  DataGridPremium,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from "@mui/x-data-grid-premium";
import frameworks from "./frameworks";
import { DEFAULT_COL_WIDTH } from "../../constants";
import TitleRow from "./TitleRow";
import Toolbar from "./Toolbar";
import { changeColumnColors } from "./utils";

LicenseInfo.setLicenseKey(
  "aec5ab206639e137899abb37e2c619c2Tz00NDQ1MixFPTE2ODUxMTE4MjY4MzEsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y"
);

export default function Matrix() {
  const { rows, columns, chartData, framework } = useSelector(
    (state) => state.matrix
  );
  const [selectedRow, setSelectedRow] = React.useState();
  const [contextMenu, setContextMenu] = React.useState(null);
  const [rowGroupingModel, setRowGroupingModel] = React.useState([""]);
  const [isGrouped, setIsGrouped] = React.useState(false);
  const [mapData, setMapData] = React.useState({});
  const dispatch = useDispatch();

  const rowGroupingModelStr = rowGroupingModel.join("-");

  const handleClose = () => {
    setContextMenu(null);
  };

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
      let newRow = {
        id: index,
        editable: true,
        editedCols: [],
      };
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

  const readExcelFile = (file, type) => {
    if (
      type === "import" &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      alert("Please select an excel file(.xlsx format)");
      return;
    }
    dispatch(setTitle(file?.name?.split(".").slice(0, -1).join("")));

    if (type === "import") {
      readXlsxFile(file)
        .then(modifyRows)
        .catch((error) => {
          alert("There was a problem reading this file.");
          console.log(error);
        });
    } else {
    }
  };
  const apiRef = useGridApiRef();

  const handleContextMenu = (event) => {
    event.preventDefault();
    setSelectedRow(Number(event.currentTarget.getAttribute("data-id")));
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null
    );
  };

  const changeRows = (e) => {
    const before = rows.slice(0, e.id);
    const after = rows.slice(e.id + 1);
    const newRow = {
      ...rows[e.id],
      [e.field]: { ...rows[e.id][e.field], value: e.value },
    };
    dispatch(setRows([...before, newRow, ...after]));
  };

  const groupingColDef = (params) => {
    const override = {};
    if (params.fields.includes("a")) {
      return {
        headerName: "A",
        valueFormatter: (valueFormatterParams) => {
          const rowNode = apiRef.current.getRowNode(valueFormatterParams.id);

          if (rowNode?.groupingField === "a") {
            return `by ${rowNode.groupingKey ?? ""}`;
          }
          return undefined;
        },
      };
    }
  };

  const groupRows = (col) => {
    if (isGrouped) {
      setRowGroupingModel([""]);
      dispatch(setChartData([]));
      setIsGrouped(false);
    } else {
      setRowGroupingModel([col]);
      setIsGrouped(true);
    }
  };

  const updateGroupingData = (data) => {
    let keys = Object.keys(data.rows.tree);
    keys = keys.filter((key) => key.includes("auto-generated-row"));

    const mapData = {};

    keys.map((key) => {
      let groupName = key.split("/").slice(-1)[0];
      const group = data.rows.tree[key];

      const groupRows = group.children.map((child) => {
        return rows[child];
      });
      mapData[groupName] = groupRows;
    });

    if (mapData && Object.keys(mapData).length > 0 && chartData.length === 0) {
      setMapData(mapData);
      dispatch(setChartData(modifyChartData(mapData).slice(1)));
      dispatch(setOrgChartData(modifyChartData(mapData, true).slice(1)));
    }
  };

  const modifyChartData = (chartData, isOrgChart) => {
    const nodes = Object.keys(chartData).map((key) => {
      const node = chartData[key];
      const nodeData = node.map((subNode) => {
        const keys = Object.keys(subNode).filter(
          (val) => val !== "id" && val !== "editable"
        );
        const values = [];
        keys.map((key) => {
          if (isOrgChart) {
            if (subNode[key].value) {
              values.push({
                value: subNode[key].value,
                rowId: subNode.id,
                col: key,
              });
            }
          } else if (!isOrgChart) {
            values.push(subNode[key].value);
          }
        });
        return values;
      });
      return nodeData;
    });
    return nodes;
  };

  const changeGroups = (newData) => {
    const newMapData = {};
    newData.map((value) => {
      const split = value.split("/");
      const key = split[split.length - 1];
      newMapData[key] = mapData[key];
    });
    dispatch(setChartData(modifyChartData(newMapData)));
  };

  React.useEffect(() => {
    dispatch(setColumns(changeColumnColors(columns)));
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <TitleRow />
      <DataGridPremium
        rows={rows}
        checkboxSelection={isGrouped}
        columns={columns}
        apiRef={apiRef}
        onStateChange={(data) => updateGroupingData(data, false)}
        disableSelectionOnClick
        onSelectionModelChange={(data) => changeGroups(data, true)}
        groupingColDef={groupingColDef}
        rowGroupingModel={rowGroupingModel}
        components={{
          ColumnMenu: (column) => {
            return <ColumnMenu currentColumn={column.currentColumn} />;
          },
          Toolbar: () => (
            <Toolbar
              readExcelFile={readExcelFile}
              rowGroupingModelStr={rowGroupingModelStr}
              setRowGroupingModel={setRowGroupingModel}
              groupRows={groupRows}
            />
          ),
        }}
        onCellEditCommit={(e) => changeRows(e)}
        componentsProps={{
          row: {
            onContextMenu: handleContextMenu,
            style: { cursor: "context-menu" },
          },
        }}
      />

      <RowMenu
        selectedRow={selectedRow}
        contextMenu={contextMenu}
        handleClose={handleClose}
      />
    </div>
  );
}
