import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Toolbar = ({ updateMyData }) => {
  const selectedCell = useSelector((state) => state.matrix.selectedCell);
  const [val, setVal] = useState(selectedCell.value);

  useEffect(() => {
    setVal(selectedCell.value);
  }, [selectedCell]);

  const handleChange = (e) => {
    updateMyData(selectedCell.index, selectedCell.id, e.target.value);
  };
  return (
    <Container>
      <span>fx</span>
      <TextBox
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          handleChange(e);
        }}
      />
    </Container>
  );
};

export default Toolbar;

const Container = styled.div`
    padding: 0 20px;
    display: flex;
    /* border-bottom: 1px solid gray; */
    border-top: 1px solid gray;

    span{
        border-left: 1px solid gray;
        border-right: 1px solid gray;
        padding: 2px 10px;
    }
`

const TextBox = styled.input`
    outline: none;
    border: 1px solid transparent;
    flex: 1;
    font-size: 14px;
`;
