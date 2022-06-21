import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { FileUploader } from "react-drag-drop-files";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button, TextField } from "@mui/material";

const OptionVote = ({ handleClose }) => {
  const [comment, setComment] = React.useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
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
        <Total>Total: 0</Total>
        <Likes>
          <ThumbDownIcon />
          <ThumbUpIcon />
        </Likes>
      </Box>
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
