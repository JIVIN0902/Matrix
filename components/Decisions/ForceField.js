import { Close } from "@mui/icons-material";
import { Button, Modal, Typography } from "@mui/material";
import { Box, flexbox } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setAnalysisData } from "../../state/decision/decisionSlice";
import { setRows } from "../../state/matrix/matrixSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "80vh",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const ForceFieldBox = ({ num, side }) => {
  const { analysisData } = useSelector((state) => state.decision);
  const dispatch = useDispatch();

  const handleChange = (e, field) => {
    const value = e.target.value;

    if (value) {
      dispatch(
        setAnalysisData({
          ...analysisData,
          [side]: [
            ...analysisData[side].slice(0, num),
            {
              ...analysisData[side][num],
              [field]: value,
            },
            ...analysisData[side].slice(num + 1),
          ],
          totalFor:
            side === "for" && field === "number"
              ? analysisData.totalFor -
                parseInt(analysisData[side][num].number) +
                parseInt(value)
              : analysisData.totalFor,
          totalAgainst:
            side === "against" && field === "number"
              ? analysisData.totalAgainst -
                parseInt(analysisData[side][num].number) +
                parseInt(value)
              : analysisData.totalAgainst,
        })
      );
    }
  };
  return (
    <>
      <input
        type="number"
        min={0}
        value={analysisData[side][num].number}
        onChange={(e) => handleChange(e, "number")}
      />
      <input
        type="text"
        value={analysisData[side][num].text}
        onChange={(e) => handleChange(e, "text")}
      />
    </>
  );
};

const ForceField = ({ open, handleClose }) => {
  const { analysisData, forceFieldParams } = useSelector(
    (state) => state.decision
  );
  const { rows } = useSelector((state) => state.matrix);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    for (let i = 0; i < analysisData.for.length; i++) {
      const obj = analysisData.for[i];
      if (!obj.number || !obj.text) {
        alert("Pls fill all values before submitting");
        return;
      }
    }
    for (let i = 0; i < analysisData.against.length; i++) {
      const obj = analysisData.against[i];
      if (!obj.number || !obj.text) {
        alert("Pls fill all values before submitting");
        return;
      }
    }
    const selectedRow = rows[forceFieldParams.id];
    const col = selectedRow.col;
    // console.log(selectedRow);
    // const modifiedRow = { ...forceFieldParams };
    // modifiedRow.analysisData = analysisData;
    // console.log({
    //   ...selectedRow,
    //   row: { ...selectedRow.row, [col]: { ...forceFieldParams, analysisData } },
    // });
    dispatch(
      setRows(
        rows.map((obj) =>
          obj.id === forceFieldParams.id
            ? {
                ...obj,
                row: {
                  ...obj.row,
                  [col]: {
                    ...forceFieldParams,
                    analysisData: {
                      ...analysisData,
                      total: analysisData.totalFor - analysisData.totalAgainst,
                    },
                  },
                },
              }
            : obj
        )
      )
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Force Field Analysis
          </Typography>
          <Close onClick={handleClose} />
        </Header>
        <Container>
          <Field bgColor="#ffef00" color="black" numColor="#b5a642">
            <h2>Forces for Change</h2>
            <Block>
              <ForceFieldBox num={0} side="for" />
            </Block>
            <Block>
              <ForceFieldBox num={1} side="for" />
            </Block>
            <Block>
              <ForceFieldBox num={2} side="for" />
            </Block>
            <Block>
              <ForceFieldBox num={3} side="for" />
            </Block>
            <Block>
              <ForceFieldBox num={4} side="for" />
            </Block>
            <Total>Total: {analysisData.totalFor}</Total>
          </Field>
          <Idea>
            <div>{forceFieldParams.value}</div>
            <p>TOTAL: {analysisData.totalFor - analysisData.totalAgainst}</p>
          </Idea>
          <Field
            bgColor="#ce2029"
            color="white"
            numColor="#5b342e"
            reverse={true}
          >
            <h2>Forces Resisting Change</h2>
            <Block>
              <ForceFieldBox num={0} side="against" />
            </Block>
            <Block>
              <ForceFieldBox num={1} side="against" />
            </Block>
            <Block>
              <ForceFieldBox num={2} side="against" />
            </Block>
            <Block>
              <ForceFieldBox num={3} side="against" />
            </Block>
            <Block>
              <ForceFieldBox num={4} side="against" />
            </Block>
            <Total>Total: {analysisData.totalAgainst}</Total>
          </Field>
        </Container>
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </Modal>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  svg {
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  heigth: 100%;
  flex: 1;
`;

const Idea = styled.div`
  background: silver;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 10px;
  flex: 0.2;
  justify-content: center;

  div {
    flex: 0.5;
    display: flex;
    align-items: flex-end;
  }
  p {
    flex: 0.5;
    display: flex;
    align-items: flex-end;
    padding-bottom: 20px;
  }
`;

const Total = styled.p`
  color: black;
  text-align: center;
`;

const Field = styled.div`
  flex: 0.4;
  margin: 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: ${(props) => props.color};

  h2 {
    color: black;
    text-align: center;
  }
  div {
    background: ${(props) => (props.bgColor ? props.bgColor : "transparent")};
    flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  }
  input[type="text"] {
    background: transparent;
    outline: none;
    border: none;
    padding: 10px;
    flex: 1;
    color: ${(props) => props.color};
  }
  input[type="number"] {
    background: ${(props) => props.numColor};
    outline: none;
    border: none;
    padding: 10px;
    color: ${(props) => props.color};
    width: 50px;
  }
`;
const Block = styled.div`
  display: flex;
`;

export default ForceField;
