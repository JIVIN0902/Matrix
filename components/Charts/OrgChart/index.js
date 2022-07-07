import OrgChart from "@balkangraph/orgchart.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import short from "short-uuid";
import { setRows, setRowSelection } from "../../../state/matrix/matrixSlice";
import GoBack from "../../GoBack";
import NodeOptions from "./NodeOptions";
import OptionModal from "./OptionModal";

const translator = short();
const Chart = () => {
  const [data, setData] = useState();
  const [optionsOpen, setOptionsOpen] = useState({
    open: false,
    isIdea: false,
  });
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [chart, setChart] = useState();
  const { title, rows, orgChartData } = useSelector((state) => state.matrix);
  const dispatch = useDispatch();

  const modifyOrgChartData = () => {
    const modifiedData = [];
    const titleRow = {
      id: "title",
      name: title,
      children: `${orgChartData.length} children`,
    };
    modifiedData.push(titleRow);
    orgChartData.map((array, index) => {
      const categoryRow = {
        id: `${translator.new()}-${array[0][0].rowId}`,
        pid: "title",
        name: array[0][0].value,
        children: `${array.length} children`,
      };
      modifiedData.push(categoryRow);
      array.map((subArray, idx) => {
        const causeRow = {
          pid: categoryRow.id,
          id: `${translator.new()}-${subArray[1].rowId}-${subArray[1].col}`,
          name: subArray[1].value,
          children: `${subArray.slice(2).length} children`,
        };

        modifiedData.push(causeRow);
        const ideasRows = subArray.slice(2).map((obj, i) => ({
          id: `${translator.new()}-${obj.rowId}-${obj.col}`,
          pid: causeRow.id,
          name: obj.value,
        }));
        modifiedData.push(...ideasRows);
      });
    });
    setData(modifiedData);
  };

  function pdf(nodeId) {
    chart.exportPDF({
      filename: "MyFileName.pdf",
      expandChildren: true,
      nodeId: nodeId,
    });
  }

  function png(nodeId) {
    chart.exportPNG({
      filename: "MyFileName.png",
      expandChildren: true,
      nodeId: nodeId,
    });
  }

  function svg(nodeId) {
    chart.exportSVG({
      filename: "MyFileName.svg",
      expandChildren: true,
      nodeId: nodeId,
    });
  }

  useEffect(() => {
    modifyOrgChartData();
  }, []);

  useEffect(() => {
    if (data) {
      const chart = new OrgChart(document.getElementById("tree"), {
        mode: "light",
        enableSearch: true,
        mouseScrool: OrgChart.action.zoom,
        layout: OrgChart.mixed,
        nodeBinding: {
          field_0: "name",
          field_1: "children",
        },
        template: "rony",
        nodes: data,
        menu: {
          export_pdf: {
            text: "Export PDF",
            icon: OrgChart.icon.pdf(24, 24, "#7A7A7A"),
            onClick: pdf,
          },
          export_png: {
            text: "Export PNG",
            icon: OrgChart.icon.png(24, 24, "#7A7A7A"),
            onClick: png,
          },
          export_svg: {
            text: "Export SVG",
            icon: OrgChart.icon.svg(24, 24, "#7A7A7A"),
            onClick: svg,
          },
        },
      });

      OrgChart.templates.rony.field_0 = `
      <foreignObject x="10" y="10" width="160" height="150">
          <div style="text-align:center;color:blue;" xmlns="http://www.w3.org/1999/xhtml">
            {val}
          </div>
      </foreignObject>
          `;

      OrgChart.templates.rony.field_1 = `
        <text style="font-size: 24px;" fill="orange" width="fit-content" height="fit-content" x="90" y="200" text-anchor="middle">{val}</text>
        `;

      setChart(chart);
    }
  }, [data]);

  chart?.on("click", (sender, args) => {
    const id = parseInt(args.node.id.split("-")[1]);
    const col = args.node.id.split("-")[2];

    const selection = {
      ...rows[id],
      col: col,
      id: id,
    };

    dispatch(setRowSelection(selection));

    setOptionsOpen({ open: true, isIdea: col >= "c" });
    // sender.editUI.show(args.node.id, false);
    // sender.editUI.show(args.node.id, true);  details mode
    return false; //to cansel the click event
  });

  useEffect(() => {
    // console.log(rows);
  }, [rows]);

  return (
    <>
      <GoBack title="Org Chart" />
      <div style={{ width: "100vw", height: "100vh" }} id="tree"></div>
      <NodeOptions
        open={optionsOpen.open}
        setOptionModalOpen={setOptionModalOpen}
        handleClose={() => setOptionsOpen({ open: false, isIdea: false })}
        isIdea={optionsOpen.isIdea}
      />
      <OptionModal
        open={optionModalOpen}
        handleClose={() => setOptionModalOpen(false)}
      />
    </>
  );
};

export default Chart;
