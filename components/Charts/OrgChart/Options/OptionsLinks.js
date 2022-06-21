import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";

const OptionLinks = ({ handleClose }) => {
  const [comment, setComment] = React.useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <TitleBox>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Links
        </Typography>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
      </TitleBox>
      <Links>
        <TextField
          id="outlined-multiline-flexible"
          label="Link"
          multiline
          maxRows={4}
          value={comment}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </Links>
    </>
  );
};

export default OptionLinks;

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
