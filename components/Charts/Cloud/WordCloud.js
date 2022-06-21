import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactWordCloud from "react-wordcloud";
import { ArrowBack } from "@mui/icons-material";
import { setShowState } from "../../../state/app/appSlice";
import { setChartData } from "../../../state/matrix/matrixSlice";

const styles = { width: 40, height: 40, cursor: "pointer" };

const WordCloud = () => {
  const { chartData } = useSelector((state) => state.matrix);
  const [words, setWords] = useState();
  const dispatch = useDispatch();

  const modifyChartData = () => {
    const newData = [];
    chartData.slice(1).map((array) => {
      array.map((subArray) => {
        subArray.slice(2).map((value) => {
          newData.push({
            text: value?.toString(),
            value: Math.floor(Math.random() * 100),
          });
        });
      });
    });
    setWords(newData);
  };

  const options = {
    rotationAngles: [0, 0],
    rotations: 0,
    deterministic: true,
    enableTooltip: false,
  };

  useEffect(() => {
    modifyChartData();
  }, []);

  return (
    <Container>
      <ArrowBack
        sx={styles}
        onClick={() => {
          dispatch(setShowState("matrix"));
          dispatch(setChartData([]));
        }}
      />
      <ReactWordCloud
        callbacks={{ onWordMouseOver: (e) => e.preventdefault }}
        options={options}
        words={words}
      />
    </Container>
  );
};

export default WordCloud;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
