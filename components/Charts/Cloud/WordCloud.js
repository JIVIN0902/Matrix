import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactWordCloud from "react-wordcloud";
import GoBack from "../../GoBack";

const WordCloud = () => {
  const { chartData } = useSelector((state) => state.matrix);
  const [words, setWords] = useState();

  const modifyChartData = () => {
    const newData = [];
    chartData.map((array) => {
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
      <GoBack title="Word Cloud" />
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
