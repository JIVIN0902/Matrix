import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setRowSelection } from "../../../../state/matrix/matrixSlice";

const OptionImpact = ({ handleClose }) => {
  const { rowSelection } = useSelector((state) => state.matrix);
  const [impact, setImpact] = React.useState(
    rowSelection[rowSelection.col].impact
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setImpact(e.target.value);
  };

  const handleSubmit = () => {
    const { col } = rowSelection;
    console.log(rowSelection);

    dispatch(
      setRowSelection({
        ...rowSelection,
        [col]: { ...rowSelection[col], impact: parseInt(impact), edited: true },
        edited: true,
      })
    );
    handleClose();
  };

  return (
    <>
      <TitleBox>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Impact
        </Typography>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
      </TitleBox>
      <Links>
        <TextField
          id="outlined-multiline-flexible"
          label="Impact"
          type="number"
          value={impact}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </Links>
    </>
  );
};

export default OptionImpact;

const TitleBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px 5px 20px;
`;

const Links = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
