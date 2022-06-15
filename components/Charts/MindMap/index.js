// import React, { useState, useEffect } from "react";
// import { Map } from "./Map";
// import * as d3 from "d3";
// import { useSelector } from "react-redux";
// import short from "short-uuid";

// const styles = { width: 40, height: 40, cursor: "pointer" };

// const App = () => {
//   const [data, setData] = useState(null);
//   const { chartData, title } = useSelector((state) => state.matrix);

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
//       connectorLineWidth: 5,
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
//       <Map onNodeClick={onNodeClick} data={data} />
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";

// import { OrgChartComponent } from "./Map";
// import * as d3 from "d3";
// import { useSelector } from "react-redux";
// import shortUUID from "short-uuid";

// const translator = shortUUID();
// const App = (props) => {
//   const [data, setData] = useState(null);
//   let addNodeChildFunc = null;
//   const { chartData, title } = useSelector((state) => state.matrix);

//   function addNode() {
//     const node = {
//       nodeId: "testtt",
//       parentNodeId: "O-1",
//       width: 330,
//       height: 147,
//       borderWidth: 1,
//       borderRadius: 5,
//       nodeImage: {
//         url: "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
//         width: 100,
//         height: 100,
//         centerTopDistance: 0,
//         centerLeftDistance: 0,
//         cornerShape: "ROUNDED",
//         shadow: true,
//         borderWidth: 0,
//       },
//       nodeIcon: {
//         icon: "https://to.ly/1yZnX",
//         size: 30,
//       },
//       connectorLineColor: {
//         red: 220,
//         green: 189,
//         blue: 207,
//         alpha: 1,
//       },
//       connectorLineWidth: 1,
//       dashArray: "",
//       expanded: false,
//       template: `<div>
//                   <div style="margin-left:80px;
//                               margin-top:10px;
//                               font-size:20px;
//                               font-weight:bold;
//                          ">Added Root Child </div>
//                  <div style="margin-left:80px;
//                               margin-top:3px;
//                               font-size:16px;
//                          ">Added position </div>

//                  <div style="margin-left:80px;
//                               margin-top:3px;
//                               font-size:14px;
//                          ">Added unit</div>

//                  <div style="margin-left:200px;
//                              margin-top:15px;
//                              font-size:13px;
//                              position:absolute;
//                              bottom:5px;
//                             ">
//                       <div>Added office</div>
//                       <div style="margin-top:5px">Added area</div>
//                  </div>
//               </div>`,
//     };

//     addNodeChildFunc(node);
//   }

//   function onNodeClick(nodeId) {
//     console.log("d3", d3.event);
//     alert("clicked " + nodeId);
//   }

//   const defaults = {
//     width: 330,
//     height: 147,
//     borderWidth: 1,
//     borderRadius: 5,
//     nodeIcon: {
//       icon: "https://to.ly/1yZnX",
//       size: 30,
//     },
//     connectorLineColor: {
//       red: 0,
//       green: 0,
//       blue: 0,
//       alpha: 1,
//     },
//     connectorLineWidth: 1,
//     dashArray: "",
//     expanded: false,
//   };

//   const template = (title) => {
//     return `<div>
//                   <div style="margin-left:40px;
//                               margin-top:10px;
//                               font-size:20px;
//                               font-weight:bold;
//                          ">${title}</div>

//               </div>`;
//   };

//   const modifyOrgChartData = () => {
//     const modifiedData = [];
//     const titleRow = {
//       ...defaults,
//       nodeId: "title",
//       parentNodeId: "",
//       _directSubordinates: chartData.slice(1).length,
//       value: title,
//       template: template(title),
//     };
//     modifiedData.push(titleRow);
//     chartData.slice(1).map((array, index) => {
//       const categoryRow = {
//         ...defaults,
//         nodeId: translator.new(),
//         parentNodeId: "title",
//         directSubordinates: array.length,
//         value: array[0][0],
//         template: template(array[0][0]),
//       };
//       modifiedData.push(categoryRow);
//       array.map((subArray, idx) => {
//         const causeRow = {
//           ...defaults,
//           parentNodeId: categoryRow.nodeId,
//           nodeId: translator.new(),
//           value: subArray[1],
//           _directSubordinates: subArray.slice(2).length,
//           template: template(subArray[1]),
//         };

//         modifiedData.push(causeRow);
//         const ideasRows = subArray.slice(2).map((value, i) => ({
//           ...defaults,
//           nodeId: translator.new(),
//           parentNodeId: causeRow.nodeId,
//           value,
//           _directSubordinates: 0,
//           template: template(value),
//         }));
//         modifiedData.push(...ideasRows);
//       });
//     });
//     setData(modifiedData);
//     console.log(modifiedData);
//   };

//   useEffect(() => {
//     // d3.json(
//     //   "https://gist.githubusercontent.com/bumbeishvili/dc0d47bc95ef359fdc75b63cd65edaf2/raw/c33a3a1ef4ba927e3e92b81600c8c6ada345c64b/orgChart.json"
//     // ).then((data) => {
//     //   setData(data);
//     //   console.log(data);
//     // });
//     modifyOrgChartData();
//   }, [true]);

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

{
  /* <div style="margin-left:80px;
                              margin-top:3px;
                              font-size:16px;
                         ">Added position </div>

                 </div> */
}
//  <div style="margin-left:80px;
//               margin-top:3px;
//               font-size:14px;
//          ">Added unit</div>

//  <div style="margin-left:200px;
//              margin-top:15px;
//              font-size:13px;
//              position:absolute;
//              bottom:5px;
//             ">
//       <div>Added office</div>
//       <div style="margin-top:5px">Added area</div>

// import React, { useEffect } from "react";
// import * as d3 from "d3";
// import { useSelector } from "react-redux";

// const MindMap = () => {
//   const { chartData, rows } = useSelector((state) => state.matrix);
//   console.log(chartData, rows);

// const createMindMap = () => {
//   const svg = d3
//     .select("#mind-map")
//     .append("svg")
//     .style("width", "100vw")
//     .style("height", "100vh");

//   svg
//     .append("line")
//     .attr("x1", 100)
//     .attr("y1", 100)
//     .attr("x2", 200)
//     .attr("y2", 100)
//     .attr("stroke-width", 1)
//     .attr("stroke", "black")
//     .attr("marker-end", "url(#triangle)");

//   svg
//     .append("rect")
//     .style("width", "50px")
//     .style("height", "80px")
//     .style("fill", "purple");

//   svg
//     .append("text")
//     .attr("x", "20")
//     .attr("y", "80")
//     .attr("dy", ".15em")
//     .text("Manufacturing Problem");
// };

// useEffect(() => {
//   console.log("creating map");
//   createMindMap();
// }, [true]);

//   return <div></div>;
// };

// export default MindMap;
// import React, { useEffect, useRef } from "react";
// import {
//   mxGraph,
//   mxRubberband,
//   mxClient,
//   mxUtils,
//   mxEvent,
//   mxCircleLayout,
//   mxCompactTreeLayout,
//   mxFastOrganicLayout,
//   mxParallelEdgeLayout,
//   mxCompositeLayout,
//   mxRadialTreeLayout,
//   mxStackLayout,
// } from "mxgraph-js";
// import { useSelector } from "react-redux";
// import { main } from "./draw";

// const App = () => {
//   const divGraph = useRef(null);
//   const { chartData, rows, title } = useSelector((state) => state.matrix);
//   console.log(chartData);
//   let x = 0;
//   let y = 0;
//   let width = 200;
//   let height = 30;
//   let v = 300;

//   useEffect(() => {
//     if (!mxClient.isBrowserSupported()) {
//       mxUtils.error("Browser is not supported!", 200, false);
//     } else {
//       mxEvent.disableContextMenu(divGraph.current);
//       const graph = new mxGraph(divGraph.current);
//       new mxRubberband(graph);
//       const parent = graph.getDefaultParent();
//       graph.getModel().beginUpdate();

//       try {
//         const titleCell = graph.insertVertex(
//           parent,
//           null,
//           title,
//           -1200,
//           500,
//           width,
//           height
//         );
//         const totalCategories = chartData.slice(1).length;
//         chartData.slice(1).map((array, index) => {
//           console.log(totalCategories);
//           const categoryCell = graph.insertVertex(
//             parent,
//             null,
//             array[0][0],
//             x,
//             y,
//             width,
//             height
//           );
//           const e1 = graph.insertEdge(
//             parent,
//             null,
//             "",
//             titleCell,
//             categoryCell
//           );
//           array.map((subArray) => {
//             const causeCell = graph.insertVertex(
//               parent,
//               null,
//               subArray[1],
//               x,
//               y,
//               width,
//               height
//             );

//             const e2 = graph.insertEdge(
//               parent,
//               null,
//               "",
//               categoryCell,
//               causeCell
//             );
//           });
//           // y += 200;
//           // v += 300;
//         });
//         // const v2 = graph.insertVertex(parent, null, "World!", 200, 150, 80, 30);
//       } finally {
//         graph.getModel().endUpdate();
//         // var layout = new mxRadialTreeLayout(graph);
//         // console.log(layout);
//         // layout.levelDistance = 240;
//         // layout.execute(graph.getDefaultParent());
//         var layout = new mxStackLayout(graph, true);
//         layout.execute(graph.getDefaultParent());
//       }
//     }
//   }, [true]);

//   return (
//     <div
//       style={{ width: "100vw", height: "100vh" }}
//       ref={divGraph}
//       id="divGraph"
//     />
//   );
// };

// export default App;
import React, { useEffect } from "react";
import MindElixir, { E } from "mind-elixir";
import { useSelector } from "react-redux";

const MindMap = () => {
  const { chartData } = useSelector((state) => state.matrix);
  console.log(chartData);
  useEffect(() => {
    const ME = new MindElixir({
      el: "#map",
      direction: MindElixir.LEFT,
      data: data,
      draggable: true, // default true
      contextMenu: true, // default true
      toolBar: true, // default true
      nodeMenu: true, // default true
      keypress: true, // default true
    });
    ME.init();
    console.log("did mount");
  }, []);
  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default MindMap;

const data = {
  nodeData: {
    id: "root",
    topic: "Mind Elixir",
    root: true,
    children: [
      {
        topic: "What is Minde Elixir",
        id: "bd4313fbac40284b",
        direction: 0,
        expanded: true,
        children: [
          { topic: "A mind map core", id: "beeb823afd6d2114" },
          { topic: "Free", id: "c1f068377de9f3a0" },
          { topic: "Open-Source", id: "c1f06d38a09f23ca" },
          {
            topic: "Use without JavaScript framework",
            id: "c1f06e4cbcf16463",
            expanded: true,
            children: [],
          },
          {
            topic: "Use in your own project",
            id: "c1f1f11a7fbf7550",
            children: [
              {
                topic: "import MindElixir from 'mind-elixir'",
                id: "c1f1e245b0a89f9b",
              },
              { topic: "new MindElixir({...}).init()", id: "c1f1ebc7072c8928" },
            ],
          },
          {
            topic: "Easy to use",
            id: "c1f0723c07b408d7",
            expanded: true,
            children: [
              {
                topic: "Use it like other mind map application",
                id: "c1f09612fd89920d",
              },
            ],
          },
        ],
      },
      {
        topic: "Basics",
        id: "bd1b66c4b56754d9",
        direction: 0,
        expanded: true,
        children: [
          { topic: "tab - Create a child node", id: "bd1b6892bcab126a" },
          { topic: "enter - Create a sibling node", id: "bd1b6b632a434b27" },
          { topic: "del - Remove a node", id: "bd1b983085187c0a" },
        ],
      },
      {
        topic: "Focus mode",
        id: "bd1b9b94a9a7a913",
        direction: 1,
        expanded: true,
        children: [
          {
            topic: "Right click and select Focus Mode",
            id: "bd1bb2ac4bbab458",
          },
          {
            topic: "Right click and select Cancel Focus Mode",
            id: "bd1bb4b14d6697c3",
          },
        ],
      },
      {
        topic: "Left menu",
        id: "bd1b9d1816ede134",
        direction: 0,
        expanded: true,
        children: [
          {
            topic: "Node distribution",
            id: "bd1ba11e620c3c1a",
            expanded: true,
            children: [
              { topic: "Left", id: "bd1c1cb51e6745d3" },
              { topic: "Right", id: "bd1c1e12fd603ff6" },
              { topic: "Both l & r", id: "bd1c1f03def5c97b" },
            ],
          },
        ],
      },
      {
        topic: "Bottom menu",
        id: "bd1ba66996df4ba4",
        direction: 1,
        expanded: true,
        children: [
          { topic: "Full screen", id: "bd1ba81d9bc95a7e" },
          { topic: "Return to Center", id: "bd1babdd5c18a7a2" },
          { topic: "Zoom in", id: "bd1bae68e0ab186e" },
          { topic: "Zoom out", id: "bd1bb06377439977" },
        ],
      },
      {
        topic: "Link",
        id: "bd1beff607711025",
        direction: 0,
        expanded: true,
        children: [
          { topic: "Right click and select Link", id: "bd1bf320da90046a" },
          {
            topic: "Click the target you want to link",
            id: "bd1bf6f94ff2e642",
          },
          { topic: "Modify link with control points", id: "bd1c0c4a487bd036" },
        ],
      },
      {
        topic: "Node style",
        id: "bd1c217f9d0b20bd",
        direction: 0,
        expanded: true,
        children: [
          {
            topic: "Font Size",
            id: "bd1c24420cd2c2f5",
            style: { fontSize: "32", color: "#3298db" },
          },
          {
            topic: "Font Color",
            id: "bd1c2a59b9a2739c",
            style: { color: "#c0392c" },
          },
          {
            topic: "Background Color",
            id: "bd1c2de33f057eb4",
            style: { color: "#bdc3c7", background: "#2c3e50" },
          },
          { topic: "Add tags", id: "bd1cff58364436d0", tags: ["Completed"] },
          {
            topic: "Add icons",
            id: "bd1d0317f7e8a61a",
            icons: ["😂"],
            tags: ["www"],
          },
          {
            topic: "Bolder",
            id: "bd41fd4ca32322a4",
            style: { fontWeight: "bold" },
          },
          {
            topic: "Hyper link",
            id: "bd41fd4ca32322a5",
            hyperLink: "https://github.com/ssshooter/mind-elixir-core",
          },
          // {
          //   topic: 'Image URL',
          //   id: 'bd41fd4ca32322a6',
          //   image: {
          //     url: 'https://cdn.jsdelivr.net/gh/ssshooter/mind-elixir-core/logo.png',
          //     width: 200,
          //   },
          // },
        ],
      },
      {
        topic: "Draggable",
        id: "bd1f03fee1f63bc6",
        direction: 1,
        expanded: true,
        children: [
          {
            topic:
              "Drag a node to another node\nand the former one will become a child node of latter one",
            id: "bd1f07c598e729dc",
          },
        ],
      },
      {
        topic: "TODO",
        id: "bd1facea32a1967c",
        direction: 1,
        expanded: true,
        children: [
          { topic: "Add image", id: "bd1fb1ec53010749" },
          { topic: "Free node (position)", id: "bd42d3e3bee992b9" },
          { topic: "Style adjustment", id: "beeb7f3db6ad6496" },
        ],
      },
      {
        topic: "Export data",
        id: "beeb7586973430db",
        direction: 1,
        expanded: true,
        children: [
          { topic: "JSON", id: "beeb784cc189375f" },
          { topic: "HTML", id: "beeb7a6bec2d68f5" },
        ],
      },
      {
        topic: "Caution",
        id: "bd42dad21aaf6bae",
        direction: 0,
        style: { background: "#f1c40e" },
        expanded: true,
        children: [
          {
            topic: "Only save manually",
            id: "bd42e1d0163ebf04",
            expanded: true,
            children: [
              {
                topic: "Save button in the top-right corner",
                id: "bd42e619051878b3",
                expanded: true,
                children: [],
              },
              { topic: "ctrl + S", id: "bd42e97d7ac35e99" },
            ],
          },
        ],
      },
    ],
    expanded: true,
  },
  linkData: {},
};
