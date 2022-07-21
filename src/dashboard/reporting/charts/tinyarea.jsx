import React from "react";
import { TinyArea } from "@ant-design/plots";
export default function Tinyareachart(props) {
  const data = props.data;
  const config = {
    height: 60,

    autoFit: true,
    data,
    smooth: true,
  };
  return <TinyArea {...config} />;
}
