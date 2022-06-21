import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MessageIcon from "@mui/icons-material/Message";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setNodeOption } from "../../../state/matrix/matrixSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  //   boxShadow: 24,
  //   px: 4,
  //   py: 2,
};

export const VIDEO = "video";
export const FILE = "file";
export const COMMENT = "comment";
export const VOTE = "vote";
export const LINK = "link";

const NodeOptions = ({ open, handleClose, setOptionOpen }) => {
  const dispatch = useDispatch();

  const handleOption = (name) => {
    setOptionOpen(true);
    dispatch(setNodeOption(name));
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TitleBox>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Node Options
            </Typography>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </TitleBox>
          <OptionBox>
            <VideocamIcon onClick={() => handleOption(VIDEO)} />
            <InsertDriveFileIcon onClick={() => handleOption(FILE)} />
            <MessageIcon onClick={() => handleOption(COMMENT)} />
            <ThumbUpIcon onClick={() => handleOption(VOTE)} />
            <LinkIcon onClick={() => handleOption(LINK)} />
          </OptionBox>
        </Box>
      </Modal>
    </>
  );
};

const TitleBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px 5px 20px;
`;

const OptionBox = styled(Box)`
  display: flex;
  width: 80%;
  padding: 20px 0px 20px 0px;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;

  svg {
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
`;

export default NodeOptions;
