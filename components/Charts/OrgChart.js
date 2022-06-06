import React, { useEffect } from "react";
import styled from "styled-components";
import { Tree, TreeNode } from "react-organizational-chart";
import { useDispatch, useSelector } from "react-redux";
import {
  setChartCellDimensions,
  setShowState,
} from "../../state/matrix/matrixSlice";

const ExampleTree = () => {
  const { chartData, chartCellDimensions } = useSelector(
    (state) => state.matrix
  );

  const dispatch = useDispatch();
  let { width, height } = chartCellDimensions;

  const zoom = (direction) => {
    if (direction === 1 && width < 500) {
      dispatch(
        setChartCellDimensions({
          width: width + 50,
          height: height + 10,
        })
      );
    } else if (direction === -1 && width > 50) {
      dispatch(
        setChartCellDimensions({
          width: width - 50,
          height: height - 10,
        })
      );
    }
  };

  return (
    <>
      <button onClick={() => dispatch(setShowState("matrix"))}>Back</button>
      <button onClick={() => zoom(1)}>Zoom in</button>
      <button onClick={() => zoom(-1)}>Zoom out</button>
      <Tree
        lineWidth={"2px"}
        lineColor={"green"}
        lineBorderRadius={"10px"}
        label={<StyledNode>Manufacturing Problem</StyledNode>}
      >
        {chartData?.map((node, index) => (
          <TreeNode key={index} label={<StyledNode>{node[0][0]}</StyledNode>}>
            <TreeNode label={<StyledNode>{node[0][1]}</StyledNode>}>
              {node.map((subNode) =>
                subNode
                  .slice(2)
                  .map((value, index) => (
                    <TreeNode
                      key={index}
                      label={<StyledNode>{value}</StyledNode>}
                    />
                  ))
              )}
            </TreeNode>
          </TreeNode>
        ))}
      </Tree>
    </>
  );
};

export default ExampleTree;

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
  min-width: ${(props) => props.theme.chartCellWidth}px;
  min-height: ${(props) => props.theme.chartCellHeight}px;
`;
