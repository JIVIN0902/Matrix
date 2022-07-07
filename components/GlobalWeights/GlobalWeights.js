import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setWeights } from "../../state/matrix/matrixSlice";
import GoBack from "../GoBack";

const GlobalWeights = () => {
  const { weights } = useSelector((state) => state.matrix);
  const dispatch = useDispatch();

  const handleChange = (e, field) => {
    const value = parseFloat(e.target.value);
    dispatch(
      setWeights({
        ...weights,
        [field]: value,
        total: (weights.total - weights[field] + value).toFixed(2),
      })
    );
  };
  return (
    <>
      <GoBack title="Global Weights" />
      <Container>
        <Weights>
          <h1>Global Weights</h1>
          <Weight>
            <div>Cost: </div>
            <input
              value={weights.cost}
              onChange={(e) => handleChange(e, "cost")}
              min={0}
              max={1}
              step={0.1}
              type="number"
            />
          </Weight>
          <Weight>
            <div>Time: </div>
            <input
              value={weights.time}
              onChange={(e) => handleChange(e, "time")}
              type="number"
              min={0}
              max={1}
              step={0.1}
            />
          </Weight>
          <Weight>
            <div>Resources</div>
            <input
              value={weights.resources}
              onChange={(e) => handleChange(e, "resources")}
              type="number"
              min={0}
              max={1}
              step={0.1}
            />
          </Weight>
          <Weight>
            <div>Intangibles</div>
            <input
              value={weights.intangibles}
              onChange={(e) => handleChange(e, "intangibles")}
              type="number"
              min={0}
              max={1}
              step={0.1}
            />
          </Weight>
          <Weight>
            <div>Total</div>
            <span>{weights.total}</span>
          </Weight>
          <Weight>
            <h3>{weights.total != 1 ? "Total must be equal to 1" : ""}</h3>
          </Weight>
        </Weights>
      </Container>
    </>
  );
};

export default GlobalWeights;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const Weights = styled.div`
  width: 60vw;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  h1 {
    text-align: center;
    background-color: gray;
    color: whitesmoke;
  }
`;

const Weight = styled.div`
  display: flex;
  background: whitesmoke;
  justify-content: space-around;
  padding: 20px;

  div {
    flex: 0.5;
  }
  span {
    background: white;
    padding: 2px 7px;
    border: 1px solid black;
    border-radius: 3px;
  }
`;
