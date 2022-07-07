import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MessageIcon from "@mui/icons-material/Message";
import FlagIcon from "@mui/icons-material/Flag";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setNodeOption, setRows } from "../../../state/matrix/matrixSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
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
export const IMPACT = "impact";
export const RATING = "rating";

const NodeOptions = ({ open, handleClose, setOptionModalOpen, isIdea }) => {
  const dispatch = useDispatch();
  const { rowSelection, rows } = useSelector((state) => state.matrix);

  useEffect(() => {
    dispatch(
      setRows(
        rows.map((row) => {
          if (row.id === rowSelection.id) {
            const newRow = {
              ...rowSelection,
              editedCols: [...new Set([...row.editedCols, rowSelection.col])],
            };
            return newRow;
          }
          return row;
        })
      )
    );
  }, [rowSelection]);

  const handleOption = (name) => {
    setOptionModalOpen(true);
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
            <LinkIcon onClick={() => handleOption(LINK)} />
            {isIdea && (
              <>
                <FlagIcon onClick={() => handleOption(IMPACT)} />
                <StarIcon onClick={() => handleOption(RATING)} />
                <ThumbUpIcon onClick={() => handleOption(VOTE)} />
              </>
            )}
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
