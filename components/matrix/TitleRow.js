import styled from "styled-components";
import { FormControl, Input, MenuItem, Select } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../state/matrix/matrixSlice";
import frameworks from "./frameworks";

const TitleRow = ({ framework, setFramework }) => {
  const { title } = useSelector((state) => state.matrix);
  const dispatch = useDispatch();
  const [version, setVersion] = React.useState("Version");
  return (
    <Container>
      <FormControl sx={{ m: 0.5, minWidth: 120, height: 40 }}>
        <Select
          value={framework}
          style={{ height: 35 }}
          onChange={(e) => setFramework(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="Framework">Framework</MenuItem>
          {Object.keys(frameworks).map((key, index) => (
            <MenuItem key={index} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Input
        id="outlined-basic"
        placeholder="Problem/Goal"
        variant="outlined"
        value={title}
        onChange={(e) => dispatch(setTitle(e.target.value))}
      />

      <FormControl sx={{ m: 0.5, minWidth: 120 }}>
        <Select
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          displayEmpty
          style={{ height: 35 }}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="Version">Version</MenuItem>
          <MenuItem value="Public">Public</MenuItem>
          <MenuItem value="Private">Private</MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;
export default TitleRow;
