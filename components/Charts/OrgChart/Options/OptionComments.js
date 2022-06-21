import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { FileUploader } from "react-drag-drop-files";
import { Button, TextField } from "@mui/material";

const OptionComments = ({ handleClose }) => {
  const [comment, setComment] = React.useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <TitleBox>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add a comment
        </Typography>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
      </TitleBox>
      <Container>
        <TextField
          id="outlined-multiline-flexible"
          label="Comment"
          multiline
          maxRows={4}
          value={comment}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </Container>
    </>
  );
};

export default OptionComments;

const TitleBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px 5px 20px;
`;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
