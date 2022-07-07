import { ArrowBack } from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setShowState } from "../state/app/appSlice";
import { setChartData, setRowSelection } from "../state/matrix/matrixSlice";

const styles = { width: 40, height: 40, cursor: "pointer" };

const GoBack = ({ title }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <ArrowBack
        sx={styles}
        onClick={() => {
          dispatch(setShowState("matrix"));
          dispatch(setChartData([]));
          dispatch(setRowSelection({}));
        }}
      />
      <h1>{title}</h1>
    </Container>
  );
};

const Container = styled.div`
  background: whitesmoke;
  display: flex;
  justify-content: space-between;

  h1 {
    flex: 1;
    text-align: center;
  }
`;

export default GoBack;
