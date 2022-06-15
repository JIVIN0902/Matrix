import { ArrowDropDown } from "@mui/icons-material";
import React, { useState } from "react";
import { TreeNode } from "react-organizational-chart";
import styled from "styled-components";

const CauseNode = ({ childNodes }) => {
  const [showChildren, setShowChildren] = useState(false);
  return (
    <TreeNode
      label={
        <StyledNode>
          {childNodes[1]}
          <Details>
            <ArrowDropDown onClick={() => setShowChildren(!showChildren)} />{" "}
            {`${childNodes.length} children`}
          </Details>
        </StyledNode>
      }
    >
      {showChildren
        ? childNodes
            .slice(2)
            .map((value, i) => (
              <TreeNode key={i} label={<StyledNode>{value}</StyledNode>} />
            ))
        : null}
    </TreeNode>
  );
};

export default CauseNode;

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
