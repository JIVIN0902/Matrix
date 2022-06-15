// import React, { useLayoutEffect, useRef, useEffect } from "react";
// import TreeChart from "d3-org-chart";
// import { jsPDF } from "jspdf";
// import styled from "styled-components";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ZoomInIcon from "@mui/icons-material/ZoomIn";
// import ZoomOutIcon from "@mui/icons-material/ZoomOut";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import { useDispatch } from "react-redux";
// import { setShowState } from "../../../state/app/appSlice";
// import { setChartData } from "../../../state/matrix/matrixSlice";

// const styles = { width: 40, height: 40, cursor: "pointer" };

// export const Map = (props, ref) => {
//   const dispatch = useDispatch();
//   const d3Container = useRef(null);
//   let chart = null;

//   function addNode(node) {
//     chart.addNode(node);
//   }

//   // We need to manipulate DOM
//   useLayoutEffect(() => {
//     if (props.data && d3Container.current) {
//       if (!chart) {
//         chart = new TreeChart();
//       }
//       chart
//         .container(d3Container.current)
//         .data(props.data)
//         .svgWidth(500)
//         .initialZoom(0.4)
//         // .nodeWidth((d) => 200)
//         // .nodeHeight((d) => 120)
//         .onNodeClick((d, i, arr) => {
//           console.log(d, "Id of clicked node ");
//           props.onNodeClick(d);
//         })
//         .buttonContent(({ node, state }) => {
//           return `<div style="px;color:#716E7B;border-radius:5px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">${
//             node.children
//               ? `<i class="fas fa-angle-up"></i>`
//               : `<i class="fas fa-angle-down"></i>`
//           }</span> ${node.data._directSubordinates}  </div>`;
//         })
//         .nodeContent(function (d, i, arr, state) {
//           const color = "#FFFFFF";
//           return `
//             <div style="font-family: 'Inter', sans-serif;background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:10px;border: 1px solid #E4E2E9">
//               <div style="color:#08011E;position:absolute;right:20px;top:17px;font-size:10px;"><i class="fas fa-ellipsis-h"></i></div>
//               <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:32px"> ${d.data.value} </div>

//            </div>
//   `;
//         })
//         .render();
//     }
//   }, [props.data, d3Container.current]);

//   function downloadPdf() {
//     chart.exportImg({
//       save: false,
//       onLoad: (base64) => {
//         var pdf = new jsPDF();
//         var img = new Image();
//         img.src = base64;
//         img.onload = function () {
//           pdf.addImage(
//             img,
//             "JPEG",
//             5,
//             5,
//             595 / 3,
//             ((img.height / img.width) * 595) / 3
//           );
//           pdf.save("chart.pdf");
//         };
//       },
//     });
//   }

//   return (
//     <div>
//       <ChartToolbar>
//         <ArrowBackIcon
//           sx={styles}
//           onClick={() => {
//             dispatch(setShowState("matrix"));
//             dispatch(setChartData([]));
//           }}
//         />
//         <PictureAsPdfIcon sx={styles} onClick={downloadPdf} />
//       </ChartToolbar>
//       <div ref={d3Container} />
//     </div>
//   );
// };

// const ChartToolbar = styled.div`
//   position: fixed;
//   display: flex;
//   width: 100vw;
// `;

import React, { useLayoutEffect, useRef, useEffect } from "react";
import TreeChart from "d3-org-chart";

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  let chart = null;

  function addNode(node) {
    chart.addNode(node);
  }
  console.log(props.data);

  props.setClick(addNode);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new TreeChart();
      }
      chart
        .container(d3Container.current)
        .data(props.data)
        .svgWidth(500)
        .initialZoom(0.4)
        .onNodeClick((d) => {
          console.log(d + " node clicked");
          console.log("props", Object.keys(props), d);
          props.onNodeClick(d);
        })
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};
