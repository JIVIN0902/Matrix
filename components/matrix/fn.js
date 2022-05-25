// import { useTable } from "react-table";
// import React from "react";
// import * as styles from "./Table.module.css";

// export default function App() {
//   const data = React.useMemo(
//     () => [
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//     ],
//     []
//   );

//   const columns = React.useMemo(() => {
//     const alpha = Array.from(Array(26)).map((e, i) => i + 65);
//     const alphabet = [
//       {
//         Header: "",
//         accessor: "0",
//       },
//     ];
//     alpha.map((x) => {
//       alphabet.push({
//         Header: String.fromCharCode(x),
//         accessor: String.fromCharCode(x),
//       });
//     });
//     return alphabet;
//   }, []);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   const handleCellChange = (e, cell) => {
//     console.log(cell.row.cells);
//   };
//   // console.log(rows[0]);

//   return (
//     <table className={styles.matrix} {...getTableProps()}>
//       <thead>
//         {headerGroups.map((headerGroup, idx) => (
//           <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column, index) => (
//               <th
//                 key={index}
//                 {...column.getHeaderProps()}
//                 className={styles.columnHeader}
//               >
//                 {column.render("Header")}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row, idx) => {
//           prepareRow(row);
//           return (
//             <tr key={idx} {...row.getRowProps()}>
//               {row.cells.map((cell, index) => {
//                 return (
//                   <React.Fragment key={index}>
//                     {index === 0 ? (
//                       <td
//                         key={index}
//                         {...cell.getCellProps()}
//                         className={(styles.cell, styles.number)}
//                       >
//                         <span className={styles.numCell}>{idx}</span>
//                       </td>
//                     ) : (
//                       <td
//                         key={index}
//                         {...cell.getCellProps()}
//                         className={styles.cell}
//                       >
//                         <input
//                           type="text"
//                           value={cell.value}
//                           className={styles.cellInput}
//                           onChange={(e) => handleCellChange(e, cell, index)}
//                         />
//                       </td>
//                     )}
//                   </React.Fragment>
//                 );
//               })}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// }

// // import DataGrid from "react-data-grid";
// // import { useState } from "react";

// // const Matrix = () => {
// //   const columns = [
// //     { key: "id", name: "ID", editable: true },
// //     { key: "title", name: "Title", editable: true },
// //     { key: "complete", name: "Complete", editable: true },
// //   ];

// //   const [rows, setRows] = useState([
// //     { id: 0, title: "Task 1", complete: 20 },
// //     { id: 1, title: "Task 2", complete: 40 },
// //     { id: 2, title: "Task 3", complete: 60 },
// //   ]);

// //   return (
// //     <DataGrid
// //       className="rdg-light"
// //       onSelectedRowsChange={setRows}
// //       columns={columns}
// //       rows={rows}
// //       enableCellSelect={true}
// //     />
// //   );
// // };

// // export default Matrix;

// import React from "react";
// import { DataGrid } from "@mui/x-data-grid";

// const rows = [
//   { id: 1, col1: "Hello", col2: "World" },
//   { id: 2, col1: "DataGridPro", col2: "is Awesome", editable: true },
//   { id: 3, col1: "MUI", col2: "is Amazing", editable: true },
// ];

// const columns = [
//   {
//     field: "col1",
//     headerName: "A",
//     width: 150,
//     editable: true,
//     renderHeader: (params) => (
//       <strong>
//         {"A"}
//         <span role="img" aria-label="enjoy">
//         </span>
//       </strong>
//     ),
//   },
//   {
//     field: "col2",
//     headerName: "B",
//     width: 150,
//     editable: true,
//   },
// ];

// export default function App() {
//   return (
//     <div style={{ height: 300, width: "100%" }}>
//       <DataGrid
//         rowHeight={30}
//         disableSelectionOnClick
//         checkboxSelection={true}
//         onCellColumnHeaderDoubleClick={(e) => console.log(e)}
//         rows={rows}
//         columns={columns}
//         onRowEditStart={(rows) => console.log(rows)}
//         // disableColumnMenu
//         disableColumnSelector
//       />
//     </div>
//   );
// }
