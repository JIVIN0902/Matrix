// import React, { useEffect, useRef } from "react";
// import styled from "styled-components";
// import { Tree, TreeNode } from "react-organizational-chart";
// import { useDispatch, useSelector } from "react-redux";
// import ZoomInIcon from "@mui/icons-material/ZoomIn";
// import ZoomOutIcon from "@mui/icons-material/ZoomOut";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import {
//   setChartCellDimensions,
//   setChartData,
// } from "../../../state/matrix/matrixSlice";
// import { ArrowDropDown } from "@mui/icons-material";
// import { setShowState } from "../../../state/app/appSlice";
// import Node from "./Node";
// import { useReactToPrint } from "react-to-print";

// const styles = { width: 40, height: 40, cursor: "pointer" };

// const OrgChart = () => {
//   const { chartData, chartCellDimensions, title } = useSelector(
//     (state) => state.matrix
//   );

//   console.log(chartData);

//   const dispatch = useDispatch();
//   let { width, height, lineHeight } = chartCellDimensions;

//   const zoom = (direction) => {
//     if (direction === 1 && width < 500) {
//       dispatch(
//         setChartCellDimensions({
//           width: width + 50,
//           lineHeight: lineHeight + 10,
//           height: height + 10,
//         })
//       );
//     } else if (direction === -1 && width > 50) {
//       dispatch(
//         setChartCellDimensions({
//           lineHeight: lineHeight > 20 ? lineHeight - 10 : lineHeight,
//           width: width - 50,
//           height: height - 10,
//         })
//       );
//     }
//   };
//   const ref = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => ref.current,
//   });

//   return (
//     <Container>
//       <ChartToolbar>
//         <ArrowBackIcon
//           sx={styles}
//           onClick={() => {
//             dispatch(setShowState("matrix"));
//             dispatch(setChartData([]));
//           }}
//         />
//         <ZoomInIcon sx={styles} onClick={() => zoom(1)} />
//         <ZoomOutIcon sx={styles} onClick={() => zoom(-1)} />
//         <button onClick={handlePrint}>Generate pdf</button>
//       </ChartToolbar>
//       <Chart ref={ref}>
//         <Tree
//           lineWidth={"2px"}
//           lineColor={"green"}
//           lineHeight={`${lineHeight}px`}
//           lineBorderRadius={"10px"}
//           label={<StyledNode>{title}</StyledNode>}
//         >
//           {chartData?.orgChart?.slice(1).map((node, index) => (
//             <Node key={index} node={node} />
//           ))}
//         </Tree>
//       </Chart>
//     </Container>
//   );
// };

// export default OrgChart;

// const StyledNode = styled.div`
//   padding: 5px;
//   border-radius: 8px;
//   display: inline-block;
//   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
//   min-width: ${(props) => props.theme.chartCellWidth}px;
//   min-height: ${(props) => props.theme.chartCellHeight}px;
//   background: #eee;
// `;

// const Container = styled.div`
//   display: flex;
// `;

// const ChartToolbar = styled.div`
//   position: fixed;
//   display: flex;
//   width: 100vw;
// `;
// const Chart = styled.div`
//   margin-top: 50px;
//   margin-left: auto;
//   margin-right: auto;
// `;
// import React, { useState, useEffect } from "react";
// import { OrgChartComponent } from "./Chart";
// import * as d3 from "d3";
// import { useSelector } from "react-redux";
// import short from "short-uuid";

// const styles = { width: 40, height: 40, cursor: "pointer" };

// const translator = short();
// const App = () => {
//   const [data, setData] = useState(null);
//   const { chartData, title } = useSelector((state) => state.matrix);
//   let addNodeChildFunc = null;

//   function onNodeClick(nodeId) {
//     console.log("d3", d3.event);
//     // alert("clicked " + nodeId);
//   }

//   useEffect(() => {
//     modifyOrgChartData();
//   }, []);

//   const modifyOrgChartData = () => {
//     const modifiedData = [];
//     const titleRow = {
//       id: "title",
//       parentId: "",
//       _directSubordinates: chartData.slice(1).length,
//       value: title,
//     };
//     modifiedData.push(titleRow);
//     chartData.slice(1).map((array, index) => {
//       const categoryRow = {
//         id: translator.new(),
//         parentId: "title",
//         _directSubordinates: array.length,
//         value: array[0][0],
//       };
//       modifiedData.push(categoryRow);
//       array.map((subArray, idx) => {
//         const causeRow = {
//           parentId: categoryRow.id,
//           id: translator.new(),
//           value: subArray[1],
//           _directSubordinates: subArray.slice(2).length,
//         };

//         modifiedData.push(causeRow);
//         const ideasRows = subArray.slice(2).map((value, i) => ({
//           id: translator.new(),
//           parentId: causeRow.id,
//           value,
//           _directSubordinates: 0,
//         }));
//         modifiedData.push(...ideasRows);
//       });
//     });
//     setData(modifiedData);
//   };

//   return (
//     <div>
//       <OrgChartComponent
//         setClick={(click) => (addNodeChildFunc = click)}
//         onNodeClick={onNodeClick}
//         data={data}
//       />
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";

import { OrgChartComponent } from "./Chart";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import shortUUID from "short-uuid";

const translator = shortUUID();
const App = (props) => {
  const [data, setData] = useState(null);
  let addNodeChildFunc = null;
  const { chartData, title } = useSelector((state) => state.matrix);

  function addNode() {
    const node = {
      nodeId: "testtt",
      parentNodeId: "O-1",
      width: 330,
      height: 147,
      borderWidth: 1,
      borderRadius: 5,
      nodeImage: {
        url: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
        width: 100,
        height: 100,
        centerTopDistance: 0,
        centerLeftDistance: 0,
        cornerShape: "ROUNDED",
        shadow: true,
        borderWidth: 0,
      },
      nodeIcon: {
        icon: "https://to.ly/1yZnX",
        size: 30,
      },
      connectorLineColor: {
        red: 220,
        green: 189,
        blue: 207,
        alpha: 1,
      },
      connectorLineWidth: 1,
      dashArray: "",
      expanded: false,
      template: `<div>
                  <div style="margin-left:80px;
                              margin-top:10px;
                              font-size:20px;
                              font-weight:bold;
                         ">Added Root Child </div>
                 <div style="margin-left:80px;
                              margin-top:3px;
                              font-size:16px;
                         ">Added position </div>

                 <div style="margin-left:80px;
                              margin-top:3px;
                              font-size:14px;
                         ">Added unit</div>

                 <div style="margin-left:200px;
                             margin-top:15px;
                             font-size:13px;
                             position:absolute;
                             bottom:5px;
                            ">
                      <div>Added office</div>
                      <div style="margin-top:5px">Added area</div>
                 </div>
              </div>`,
    };

    addNodeChildFunc(node);
  }

  function onNodeClick(nodeId) {
    console.log("d3", d3.event);
    alert("clicked " + nodeId);
  }

  const defaults = {
    width: 330,
    height: 147,
    borderWidth: 1,
    borderRadius: 5,
    nodeIcon: {
      icon: "https://to.ly/1yZnX",
      size: 30,
    },
    connectorLineColor: {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    },
    connectorLineWidth: 1,
    dashArray: "",
    expanded: false,
  };

  const template = (title) => {
    return `<div>
                  <div style="margin-left:40px;
                              margin-top:10px;
                              font-size:20px;
                              font-weight:bold;
                         ">${title}</div>
                 
              </div>`;
  };

  const modifyOrgChartData = () => {
    const modifiedData = [];
    const titleRow = {
      ...defaults,
      nodeId: "title",
      parentNodeId: "",
      _directSubordinates: chartData.slice(1).length,
      value: title,
      template: template(title),
    };
    modifiedData.push(titleRow);
    chartData.slice(1).map((array, index) => {
      const categoryRow = {
        ...defaults,
        nodeId: translator.new(),
        parentNodeId: "title",
        directSubordinates: array.length,
        value: array[0][0],
        template: template(array[0][0]),
      };
      modifiedData.push(categoryRow);
      array.map((subArray, idx) => {
        const causeRow = {
          ...defaults,
          parentNodeId: categoryRow.nodeId,
          nodeId: translator.new(),
          value: subArray[1],
          _directSubordinates: subArray.slice(2).length,
          template: template(subArray[1]),
        };

        modifiedData.push(causeRow);
        const ideasRows = subArray.slice(2).map((value, i) => ({
          ...defaults,
          nodeId: translator.new(),
          parentNodeId: causeRow.nodeId,
          value,
          _directSubordinates: 0,
          template: template(value),
        }));
        modifiedData.push(...ideasRows);
      });
    });
    setData(modifiedData);
    console.log(modifiedData);
  };

  useEffect(() => {
    // d3.json(
    //   "https://gist.githubusercontent.com/bumbeishvili/dc0d47bc95ef359fdc75b63cd65edaf2/raw/c33a3a1ef4ba927e3e92b81600c8c6ada345c64b/orgChart.json"
    // ).then((data) => {
    //   setData(data);
    //   console.log(data);
    // });
    modifyOrgChartData();
  }, [true]);

  return (
    <div>
      <OrgChartComponent
        setClick={(click) => (addNodeChildFunc = click)}
        onNodeClick={onNodeClick}
        data={data}
      />
    </div>
  );
};

export default App;
