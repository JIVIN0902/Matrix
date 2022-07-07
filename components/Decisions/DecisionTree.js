import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useSelector } from "react-redux";
import GoBack from "../GoBack";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      //   attributes: {
      //     department: "Production",
      //   },
      children: [
        {
          name: "Foreman",
          //   attributes: {
          //     department: "Fabrication",
          //   },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          //   attributes: {
          //     department: "Assembly",
          //   },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
    {
      name: "Manager",
      //   attributes: {
      //     department: "Production",
      //   },
      children: [
        {
          name: "Foreman",
          //   attributes: {
          //     department: "Fabrication",
          //   },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          //   attributes: {
          //     department: "Assembly",
          //   },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};

export default function DecisionTree() {
  const straightPathFunc = (linkDatum, orientation) => {
    const { source, target } = linkDatum;
    return orientation === "horizontal"
      ? `M${source.y},${source.x}L${target.y},${target.x}`
      : `M${source.x},${source.y}L${target.x},${target.y}`;
  };

  const [data, setData] = useState();
  const { title, chartData, rows } = useSelector((state) => state.matrix);
  const { decisionRows } = useSelector((state) => state.decision);

  const modifyChartData = () => {
    const sortedRows = Array.from(decisionRows).sort(
      (x, y) => x.deciderValues - y.deciderValues
    );

    const existingNodes = {};
    const parentNodes = {};
    const childNodes = {};
    // console.log(sortedRows);

    sortedRows.map((sortedRow) => {
      const id = parseInt(sortedRow.id.split("-")[1]);
      const row = { ...rows[id] };
      console.log(row);

      const keys = row.editedCols;

      let children = [];
      let node = {};
      let parentNode = {};
      let childNode = {};

      let existingNode = parentNodes[row["a"].value];
      let existingChildNode = childNodes[row["b"].value];

      if (existingNode) {
        node = {
          ...existingNode,
          children: [{ ...existingChildNode, children }],
        };
      } else {
        childNode = {
          name: row["b"].value,
          children,
        };
        parentNode = {
          name: row["a"].value,
          children: [childNode],
        };
      }

      existingNodes[row["a"].value] = node;
      parentNodes[row["a"].value] = parentNode;
      childNodes[row["b"].value] = childNode;

      console.log(keys);
      keys.map((key) => {
        children.push({
          name: `${row[key].value}-${sortedRow.deciderValues}`,
        });
      });
    });
    console.log(existingNodes, parentNodes, childNodes);

    setData({
      name: title,
      children: Object.keys(existingNodes).map((key) => {
        return existingNodes[key];
      }),
    });
  };

  useEffect(() => {
    modifyChartData();
  }, []);

  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
  }) => (
    <g>
      <circle r={10}></circle>
      <foreignObject {...foreignObjectProps}>
        <div
          style={{
            border: "1px solid black",
            backgroundColor: "#dedede",
            overflow: "scroll",
          }}
        >
          <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
          {nodeDatum.children && (
            <button style={{ width: "100%" }} onClick={toggleNode}>
              {/* {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"} */}
              {nodeDatum.children.length}
            </button>
          )}
        </div>
      </foreignObject>
    </g>
  );
  const nodeSize = { x: 120, y: 200 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -13,
    y: -12,
  };

  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: "100vw", height: "100vh" }}>
      <GoBack />
      {data && (
        <Tree
          data={data}
          pathFunc={straightPathFunc}
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
          }
        />
      )}
    </div>
  );
}
