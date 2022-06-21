import React, { useEffect, useState } from "react";
import MindElixir, { E } from "mind-elixir";
import { useSelector } from "react-redux";
import shortUUID from "short-uuid";

const translator = shortUUID();

const MindMap = () => {
  const { chartData, title } = useSelector((state) => state.matrix);
  const [data, setData] = useState();

  const modifyChartData = () => {
    const data = {
      nodeData: {
        id: "root",
        topic: title,
        root: true,
        children: chartData.slice(1).map((array, index) => {
          return {
            id: translator.new(),
            topic: array[0][0],
            direction: index % 2 === 0 ? 0 : 1,
            expanded: true,
            children: array.map((subArray) => {
              return {
                id: translator.new(),
                topic: subArray[1],
                direction: index % 2 === 0 ? 0 : 1,
                expanded: false,
                children: subArray.slice(2)?.map((value) => ({
                  topic: value,
                  id: translator.new(),
                })),
              };
            }),
          };
        }),
      },
    };
    setData(data);
  };

  useEffect(() => {
    modifyChartData();
  }, []);

  useEffect(() => {
    if (data) {
      const ME = new MindElixir({
        el: "#map",
        direction: MindElixir.LEFT,
        data: data,
        draggable: true, // default true
        contextMenu: true, // default true
        toolBar: true, // default true
        nodeMenu: true, // default true
        keypress: true, // default true
      });
      ME.init();
      console.log("did mount");
    }
  }, [data]);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default MindMap;
