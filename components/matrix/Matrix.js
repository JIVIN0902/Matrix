// import React from "react";
// import Table from "./Table";
// import styled from "styled-components";
// import makeData from "./makeData";
// import { useDispatch, useSelector } from "react-redux";
// import { setData } from "../../state/matrix/matrixSlice";
// import Toolbar from "./Toolbar";

// const Matrix = () => {
//   const columns = useSelector((state) => state.matrix.columns);
//   const dispatch = useDispatch();

//   const data = useSelector((state) => state.matrix.data);
//   const [originalData] = React.useState(data);
//   const [skipPageReset, setSkipPageReset] = React.useState(false);

//   // We need to keep the table from resetting the pageIndex when we
//   // Update data. So we can keep track of that flag with a ref.

//   // When our cell renderer calls updateMyData, we'll use
//   // the rowIndex, columnId and new value to update the
//   // original data

//   const updateMyData = (rowIndex, columnId, value) => {
//     // We also turn on the flag to not reset the page
//     setSkipPageReset(true);
//     dispatch(
//       setData(
//         data.map((row, index) => {
//           if (index === rowIndex) {
//             return {
//               ...data[rowIndex],
//               [columnId]: value,
//             };
//           }
//           return row;
//         })
//       )
//     );
//   };

//   // After data chagnes, we turn the flag back off
//   // so that if data actually changes when we're not
//   // editing it, the page is reset
//   React.useEffect(() => {
//     setSkipPageReset(false);
//   }, [data]);

//   // Let's add a data resetter/randomizer to help
//   // illustrate that flow...
//   const resetData = () => dispatch(setData(originalData));

//   return (
//     <Styles>
//       {/* <Toolbar updateMyData={updateMyData} /> */}
//       <Table
//         columns={columns}
//         data={data}
//         updateMyData={updateMyData}
//         skipPageReset={skipPageReset}
//         resetData={resetData}
//       />
//     </Styles>
//   );
// };

// export default Matrix;

// const Styles = styled.div`
//   /* padding: 1rem; */

//   height: 100vh;
//   overflow: scroll;

//   table {
//     border-spacing: 0;
//     border: 0.5px solid gray;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th {
//       background-color: #eee;
//       font-weight: 500;
//       border-right: 1px solid silver;
//       border-bottom: 1px solid silver;
//       font-size: 14px;
//       padding-top: 4px;
//       padding-bottom: 4px;
//       cursor: pointer;

//       span {
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         position: relative;

//         div {
//           flex: 1;
//           text-align: center;
//         }
//       }
//     }
//     td {
//       margin: 0;
//       border-bottom: 1px solid gray;
//       border-right: 1px solid gray;

//       :last-child {
//         border-right: 0;
//       }

//       input {
//         font-size: 1rem;
//         padding: 0;
//         margin: 0;
//         border: 0;
//         border: 1px solid transparent;
//         padding: 2px 6px;
//       }
//       input:focus {
//         outline: none;
//         border: 1px solid blue;
//       }
//     }
//   }

//   .pagination {
//     padding: 0.5rem;
//   }
// `;

import * as React from "react";
import ColumnMenu, { incrementString } from "./ColumnMenu";
import { useDispatch, useSelector } from "react-redux";
import RowMenu from "./RowMenu";
import readXlsxFile from "read-excel-file";
import { setColumns, setRows, setTitle } from "../../state/matrix/matrixSlice";
import { Input, TextField } from "@mui/material";
import { LicenseInfo } from "@mui/x-license-pro";
import {
  DataGridPremium,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from "@mui/x-data-grid-premium";
import { useDemoData } from "@mui/x-data-grid-generator";
import styled from "styled-components";

LicenseInfo.setLicenseKey(
  "aec5ab206639e137899abb37e2c619c2Tz00NDQ1MixFPTE2ODUxMTE4MjY4MzEsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y"
);

export default function Matrix() {
  const { rows, columns, title } = useSelector((state) => state.matrix);
  const [selectedRow, setSelectedRow] = React.useState();
  const [contextMenu, setContextMenu] = React.useState(null);
  const [openColumnMenu, setOpenColumnMenu] = React.useState(null);
  const dispatch = useDispatch();

  const { data, loading } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    visibleFields: [
      "commodity",
      "quantity",
      "filledQuantity",
      "status",
      "isFilled",
      "unitPrice",
      "unitPriceCurrency",
      "subTotal",
      "feeRate",
      "feeAmount",
      "incoTerm",
    ],
  });

  const handleClose = () => {
    setContextMenu(null);
  };

  const readExcelFile = (e) => {
    if (
      e.target.files[0].type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      alert("Please select an excel file(.xlsx format)");
      return;
    }
    dispatch(setTitle(e.target.files[0].name.split(".").slice(0, -1).join("")));

    readXlsxFile(e.target.files[0])
      .then((rows) => {
        let headerName = "D";
        let newCols = [];
        let newCol = {
          width: 150,
          editable: true,
        };
        rows[0].map((value, index) => {
          if (index > 3) {
            newCol = {
              ...newCol,
              field: headerName.toLowerCase(),
              headerName: headerName,
            };
            newCols.push(newCol);
            headerName = incrementString(headerName);
          }
        });
        dispatch(setColumns([...columns, ...newCols]));

        const modifiedRows = rows.map((row, index) => {
          let field = "a";
          let newRow = { id: index, editable: true };
          row.map((value) => {
            newRow[field] = value.toString();
            field = incrementString(field).toLowerCase();
          });
          return newRow;
        });
        dispatch(setRows(modifiedRows));
      })
      .catch((error) => alert("There was a problem reading this file."));
  };
  const apiRef = useGridApiRef();

  const exceljsPreProcess = ({ workbook, worksheet }) => {
    workbook.created = new Date(); // Add metadata
    worksheet.name = title; // Modify worksheet name

    // Write on first line the date of creation
    // worksheet.getCell("A1").value = `Values from the`;
    // worksheet.getCell("A2").value = new Date();
  };
  function exceljsPostProcess({ worksheet }) {
    // Add a text after the data
    // worksheet.addRow(); // Add empty row

    worksheet.fileName = title; // Modify worksheet name
    // const newRow = worksheet.addRow();
    // newRow.getCell(1).value = "Those data are for internal use only";
  }

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      ...data.initialState,
      rowGrouping: {
        ...data.initialState?.rowGrouping,
        model: ["commodity"],
      },
      sorting: {
        sortModel: [{ field: "__row_group_by_columns_group__", sort: "asc" }],
      },
    },
  });

  const handleContextMenu = (event) => {
    event.preventDefault();
    setSelectedRow(Number(event.currentTarget.getAttribute("data-id")));
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null
    );
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <TitleRow>
        <Input
          id="outlined-basic"
          placeholder="Problem/Goal"
          variant="outlined"
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
        />
      </TitleRow>
      <DataGridPremium
        // {...data}
        rows={rows}
        columns={columns}
        apiRef={apiRef}
        loading={loading}
        disableSelectionOnClick
        initialState={initialState}
        components={{
          ColumnMenu: (column) => {
            return <ColumnMenu currentColumn={column.currentColumn} />;
          },
          Toolbar: () => (
            <GridToolbarContainer>
              <GridToolbarColumnsButton />
              <GridToolbarFilterButton />
              <GridToolbarDensitySelector />
              <GridToolbarExport
                excelOptions={{
                  exceljsPreProcess,
                  exceljsPostProcess,
                  fileName: title,
                }}
              />
              <input
                type="file"
                id="import-file"
                onChange={(e) => readExcelFile(e)}
              />
            </GridToolbarContainer>
          ),
        }}
        onCellEditCommit={(e) => console.log(e)}
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

const TitleRow = styled.div`
  display: flex;
  justify-content: center;
`;

// export default function Matrix() {
//   const { rows, columns } = useSelector((state) => state.matrix);
//   const [selectedRow, setSelectedRow] = React.useState();
//   const [contextMenu, setContextMenu] = React.useState(null);
//   const [openColumnMenu, setOpenColumnMenu] = React.useState(null);
//   const dispatch = useDispatch();

//   const handleContextMenu = (event) => {
//     event.preventDefault();
//     setSelectedRow(Number(event.currentTarget.getAttribute("data-id")));
//     setContextMenu(
//       contextMenu === null
//         ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
//         : null
//     );
//   };

//   const handleClose = () => {
//     setContextMenu(null);
//   };

//   const readExcelFile = (e) => {
//     if (
//       e.target.files[0].type !==
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     ) {
//       alert("Please select an excel file(.xlsx format)");
//       return;
//     }

//     readXlsxFile(e.target.files[0])
//       .then((rows) => {
//         let headerName = "D";
//         let newCols = [];
//         let newCol = {
//           width: 150,
//           editable: true,
//         };
//         rows[0].map((value, index) => {
//           if (index > 3) {
//             newCol = {
//               ...newCol,
//               field: headerName.toLowerCase(),
//               headerName: headerName,
//             };
//             newCols.push(newCol);
//             headerName = incrementString(headerName);
//           }
//         });
//         dispatch(setColumns([...columns, ...newCols]));

//         const modifiedRows = rows.map((row, index) => {
//           let field = "a";
//           let newRow = { id: index, editable: true };
//           row.map((value) => {
//             newRow[field] = value.toString();
//             field = incrementString(field).toLowerCase();
//           });
//           return newRow;
//         });
//         dispatch(setRows(modifiedRows));
//       })
//       .catch((error) => alert("There was a problem reading this file."));
//   };
//   const apiRef = useGridApiRef();

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <div
//         style={{
//           padding: "10px",
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <TextField
//           inputProps={{ style: { height: "20px" } }}
//           id="outlined-basic"
//           label="Problem/Goal"
//           variant="outlined"
//         />
//       </div>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={100}
//         rowsPerPageOptions={[10, 20, 30, 50, 100]}
//         checkboxSelection
//         disableSelectionOnClick
//         components={{ Toolbar: GridToolbar }}
//       />
//       <RowMenu
//         selectedRow={selectedRow}
//         contextMenu={contextMenu}
//         handleClose={handleClose}
//       />
//     </div>
//   );
// }

// components={{
//   ColumnMenu: (column) => {
//     return <ColumnMenu currentColumn={column.currentColumn} />;
//   },
//   Toolbar: () => (
//     <div style={{ display: "flex" }}>
//       <GridToolbar />
//       <input
//         type="file"
//         id="import-file"
//         onChange={(e) => readExcelFile(e)}
//       />
//     </div>
//   ),
// }}
// onCellEditCommit={(e) => console.log(e)}
// componentsProps={{
//   row: {
//     onContextMenu: handleContextMenu,
//     style: { cursor: "context-menu" },
//   },
// }}

// <input
//   type="file"
//   id="import-file"
//   onChange={(e) => readExcelFile(e)}
// />
