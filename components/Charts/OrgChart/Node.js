import { ArrowDropDown } from "@mui/icons-material";
import React, { useState } from "react";
import { TreeNode } from "react-organizational-chart";
import styled from "styled-components";
import CauseNode from "./CauseNode";

const Node = ({ node }) => {
  const [showChildren, setShowChildren] = useState(false);
  return (
    <TreeNode
      label={
        <StyledNode>
          {node[0][0]}
          <Details>
            <ArrowDropDown onClick={() => setShowChildren(!showChildren)} />{" "}
            {`${node.length} children`}
          </Details>
        </StyledNode>
      }
    >
      {showChildren
        ? node.map((childNodes, idx) => (
            <CauseNode key={idx} childNodes={childNodes} />
          ))
        : null}
    </TreeNode>
  );
};

export default Node;

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  min-width: ${(props) => props.theme.chartCellWidth}px;
  min-height: ${(props) => props.theme.chartCellHeight}px;
  background: #eee;
`;

const Details = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
