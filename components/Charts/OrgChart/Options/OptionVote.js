import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setRowSelection } from "../../../../state/matrix/matrixSlice";

const OptionVote = ({ handleClose }) => {
  const { rowSelection } = useSelector((state) => state.matrix);
  const [voteDetails, setVoteDetails] = React.useState(
    rowSelection[rowSelection.col].votes
  );
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const { col } = rowSelection;
    dispatch(
      setRowSelection({
        ...rowSelection,
        [col]: { ...rowSelection[col], votes: voteDetails, edited: true },
        edited: true,
      })
    );
    handleClose();
  };

  return (
    <>
      <TitleBox>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Votes
        </Typography>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
      </TitleBox>
      <Box>
        <Total>Total: {voteDetails.up - voteDetails.down}</Total>
        <Likes>
          <ThumbDownIcon
            onClick={() => setVoteDetails({ ...voteDetails, down: 1 })}
          />
          <ThumbUpIcon
            onClick={() => setVoteDetails({ ...voteDetails, up: 1 })}
          />
        </Likes>
      </Box>
      <Btn>
        <Button onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </Btn>
    </>
  );
};

export default OptionVote;

const TitleBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px 5px 20px;
`;

const Total = styled(Typography)`
  text-align: center;
  padding-bottom: 10px;
`;

const Likes = styled(Box)`
  display: flex;
  /* background: red; */
  justify-content: space-around;

  svg {
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
