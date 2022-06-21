import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import OptionFile from "./Options/OptionFile";
import OptionVideo from "./Options/OptionVideo";
import OptionComments from "./Options/OptionComments";
import OptionVote from "./Options/OptionVote";
import OptionLinks from "./Options/OptionsLinks";
import { useSelector } from "react-redux";
import { COMMENT, FILE, LINK, VIDEO, VOTE } from "./NodeOptions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
};

const OptionModal = ({ open, handleClose }) => {
  const { nodeOption } = useSelector((state) => state.matrix);
  console.log(nodeOption);

  const switchOptions = () => {
    switch (nodeOption) {
      case VIDEO:
        return <OptionVideo handleClose={handleClose} />;
      case FILE:
        return <OptionFile handleClose={handleClose} />;
      case COMMENT:
        return <OptionComments handleClose={handleClose} />;
      case VOTE:
        return <OptionVote handleClose={handleClose} />;
      case LINK:
        return <OptionLinks handleClose={handleClose} />;
      default:
        return "";
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{switchOptions()}</Box>
      </Modal>
    </div>
  );
};

export default OptionModal;

const TitleBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px 5px 20px;
`;
