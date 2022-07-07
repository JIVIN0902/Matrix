import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import GoBack from "../GoBack";

const Chart2by2 = () => {
  const { chartData } = useSelector((state) => state.matrix);
  const [data, setData] = useState();

  const modifyChartData = () => {
    const newData = { 1: [], 2: [], 3: [], 4: [] };
    chartData.map((array) => {
      array.map((subArray) => {
        if (subArray[0] === "Known-Effect" && subArray[1] === "Known-Cause") {
          newData[1].push({ effect: subArray[2], cause: subArray[3] });
        }
        if (subArray[0] === "Known-Effect" && subArray[1] === "Unknown-Cause") {
          newData[2].push({ effect: subArray[2], cause: subArray[3] });
        }
        if (subArray[0] === "Unknown-Effect" && subArray[1] === "Known-Cause") {
          newData[3].push({ effect: subArray[2], cause: subArray[3] });
        }
        if (
          subArray[0] === "Unknown-Effect" &&
          subArray[1] === "Unknown-Cause"
        ) {
          newData[4].push({ effect: subArray[2], cause: subArray[3] });
        }
      });
    });
    setData(newData);
  };

  useEffect(() => {
    modifyChartData();
  }, []);

  return (
    <>
      <GoBack title="2 by 2" />
      <Container>
        <Var2>Effect</Var2>
        {data && (
          <Matrix>
            <h3>Cause</h3>
            <Boxes>
              <div>
                <h3>Known</h3>
                <BoxDown>
                  <h3>Known</h3>
                  <Box>
                    {data[1]?.map((item, index) => (
                      <p key={index}>
                        {item.effect}, {item.cause}
                      </p>
                    ))}
                  </Box>
                </BoxDown>
              </div>
              <div>
                <h3>Unknown</h3>
                <Box>
                  {data[2]?.map((item, index) => (
                    <p key={index}>
                      {item.effect}, {item.cause}
                    </p>
                  ))}
                </Box>
              </div>
              <BoxDown>
                <Udown>Unknown</Udown>
                <Box3>
                  {data[3]?.map((item, index) => (
                    <p key={index}>
                      {item.effect}, {item.cause}
                    </p>
                  ))}
                </Box3>
              </BoxDown>
              <div>
                <Box>
                  {data[4]?.map((item, index) => (
                    <p key={index}>
                      {item.effect}, {item.cause}
                    </p>
                  ))}
                </Box>
              </div>
            </Boxes>
          </Matrix>
        )}
      </Container>
    </>
  );
};

export default Chart2by2;

const Container = styled.div`
  display: flex;
  align-items: center;
  h3 {
    text-align: center;
  }
`;

const Matrix = styled.div`
  flex: 1;
`;

const Udown = styled.h3`
  margin-left: -23px;
`;

const Var2 = styled.h3`
  transform: rotate(-90deg);
  height: fit-content;
`;

const Boxes = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 10px;
`;

const BoxDown = styled.div`
  display: flex;
  h3 {
    display: flex;
    align-items: center;
  }
  p {
    padding: 5px;
  }
`;

const Box = styled.div`
  border: 1px solid black;
  height: 200px;
  flex: 1;
  p {
    padding: 5px;
  }
`;

const Box3 = styled.div`
  border: 1px solid black;
  height: 200px;
  flex: 1;
  /* margin-left: -23px; */
`;
