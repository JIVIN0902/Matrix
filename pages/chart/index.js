import dynamic from "next/dynamic";
import React from "react";

const OrgChart = dynamic(() => import("../../components/Charts/OrgChart"), {
  ssr: false,
});

const Chart = () => {
  return <OrgChart />;
};

export default Chart;
