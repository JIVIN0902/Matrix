import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setRowSelection } from "../../../../state/matrix/matrixSlice";

const OptionRating = ({ handleClose }) => {
  const [ratings, setRatings] = React.useState({
    cost: 0,
    time: 0,
    resources: 0,
    intangibles: 0,
    total: 0,
  });

  const [total, setTotal] = useState(0);
  const { weights, rowSelection } = useSelector((state) => state.matrix);

  const formatNums = (num1, num2) => {
    return num1 > 0 ? (num1 * num2).toFixed(2) : num2;
  };

  const dispatch = useDispatch();

  const handleChange = (e, field) => {
    const value = parseFloat(e.target.value);
    setRatings((prev) => ({
      ...prev,
      [field]: value,
      total: prev.total + value - prev[field],
    }));
  };

  useEffect(() => {
    const total = (
      +formatNums(ratings.cost, weights.cost) +
      +formatNums(ratings.time, weights.time) +
      +formatNums(ratings.resources, weights.resources) +
      +formatNums(ratings.intangibles, weights.intangibles)
    ).toFixed(2);
    setTotal(total);
  }, [ratings, weights]);

  const handleSubmit = () => {
    const { row, col } = rowSelection;

    dispatch(
      setRowSelection({
        ...rowSelection,
        row: {
          ...row,
          [col]: {
            ...rowSelection[col],
            rating: parseFloat(total),
            edited: true,
          },
        },
        edited: true,
      })
    );
    handleClose();
  };

  return (
    <>
      <TitleBox>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Set Rating for an Idea
        </Typography>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
      </TitleBox>
      <Ratings>
        <Row>
          <h4>Rating for Each Idea</h4>
          <TextField
            id="outlined-multiline-flexible"
            label="Cost"
            type="number"
            value={ratings.cost}
            onChange={(e) => handleChange(e, "cost")}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Time"
            type="number"
            value={ratings.time}
            onChange={(e) => handleChange(e, "time")}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Resources"
            type="number"
            value={ratings.resources}
            onChange={(e) => handleChange(e, "resources")}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Intangibles"
            type="number"
            value={ratings.intangibles}
            onChange={(e) => handleChange(e, "intangibles")}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Total"
            type="number"
            value={ratings.total}
          />
        </Row>
        <Row>
          <h4>Idea Calculation</h4>
          <div>
            <span>{formatNums(ratings.cost, weights.cost)}</span>
            <span>{formatNums(ratings.time, weights.time)}</span>
            <span>{formatNums(ratings.resources, weights.resources)}</span>
            <span>{formatNums(ratings.intangibles, weights.intangibles)}</span>
            <span>{total}</span>
          </div>
        </Row>
        <Button onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </Ratings>
    </>
  );
};

export default OptionRating;

const TitleBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px 5px 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  label {
    margin-top: 8px;
  }

  input {
    height: 0px;
    font-size: 12px;
  }

  div {
    flex: 1;
    padding: 10px;
    display: flex;
    justify-content: space-around;
  }

  span {
    background: gray;
    padding: 5px 12px;
  }
`;

const Ratings = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
