import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { FileUploader } from "react-drag-drop-files";

const OptionVideo = ({ open, handleClose }) => {
  const [file, setFile] = React.useState(null);
  //   const fileTypes = ];

  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <>
      <TitleBox>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Upload a Video
        </Typography>
        <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
      </TitleBox>
      <Container>
        <FileUploader
          // multiple={true}
          handleChange={handleChange}
          name="file"
          //   types={fileTypes}
        />
        <p>{file ? `File name: ${file?.name}` : "no files uploaded yet"}</p>
      </Container>
    </>
  );
};

export default OptionVideo;

const TitleBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px 5px 20px;
`;

const Container = styled(Box)`
  padding: 15px;

  p {
    padding: 5px;
  }
`;
