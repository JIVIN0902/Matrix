import React, { Component, useEffect, createRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FishboneChart from "fishbone-chart";
import { useDispatch, useSelector } from "react-redux";
import { setChartData } from "../../state/matrix/matrixSlice";
import { setShowState } from "../../state/app/appSlice";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useScreenshot } from "use-react-screenshot";

const styles = { width: 40, height: 40, cursor: "pointer" };

const Fishbone = () => {
  const dispatch = useDispatch();
  const [fishboneData, setFishboneData] = useState({});
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(ref.current);
  console.log(image);

  const { chartData, title } = useSelector((state) => state.matrix);

  const modifyData = () => {
    data = [...chartData.slice(1)];

    const newData = {};
    const mainData = {};
    data.map((arr) => {
      const category = arr[0][0];

      newData[category] = {};
      const categoryValues = [];
      arr.map((subArray) => {
        const causeValues = [];
        const cause = subArray[1];
        categoryValues.push(cause);
        subArray.slice(2).map((value) => {
          causeValues.push(value);
        });
        newData[category][cause] = causeValues;
      });
      mainData[category] = categoryValues;
    });
    setFishboneData({ [title]: mainData, ...newData });
  };

  useEffect(() => {
    if (chartData && chartData?.length > 0) {
      modifyData();
    }
  }, [chartData]);

  const data = {
    "Manufacturing Problem": {
      Procedures: ["Too much water", "Too many grounds", "Lack of training"],
      Equipment: ["Dirty cups", "Coffee not hot enough", "Dirty basket"],
      Material: ["Bad sugar", "Lids do not fit cup", "Bad cream"],
      People: ["Wrong fee", "No training", "Rude"],
      Machine: ["Not working", "Deregulated", "Dirty"],
    },
    "Scrum not working": {
      Principles: ["Functional software (SW) is not released"],
      "Product Owner (PO)": [
        "No authority to prioritize",
        "Poor interaction with the team",
      ],
      Sprint: [
        "SW not released for validation",
        "Sprint speed is not measured",
        "Team is controlled from outside",
      ],
      Planning: ["PO does not explain the backlog"],
      "Development Team": [
        "Members dedicated to specific roles",
        "Does not deliver what was promised",
      ],
    },
    "Security Incident": {
      Technology: [
        "Weak encryption",
        "No technology for remote data destruction",
      ],
      Process: ["No process for reporting incident"],
      People: ["Worker lost laptop", "Distraction was a factor"],
      Controls: [
        "Week password policy",
        "No audit trail of the laptop information",
      ],
      Procedure: ["No procedure for securing laptop at public locations"],
      Environment: ["No place to secure laptop overnight at workplace"],
    },
    "fhi Incident": {
      Technology: [
        "Weak encryption",
        "No technology for remote data destruction",
      ],
      Process: ["No process for reporting incident"],
      People: ["Worker lost laptop", "Distraction was a factor"],
      Controls: [
        "Week password policy",
        "No audit trail of the laptop information",
      ],
      Procedure: ["No procedure for securing laptop at public locations"],
      Environment: ["No place to secure laptop overnight at workplace"],
    },
  };
  const ref = createRef();

  return (
    <>
      <ArrowBackIcon
        sx={styles}
        onClick={() => {
          dispatch(setShowState("matrix"));
          dispatch(setChartData([]));
        }}
      />

      {/* <PictureAsPdfIcon sx={styles} onClick={getImage} /> */}
      <div ref={ref}>
        <FishboneChart data={fishboneData} />
      </div>
    </>
  );
};

export default Fishbone;
