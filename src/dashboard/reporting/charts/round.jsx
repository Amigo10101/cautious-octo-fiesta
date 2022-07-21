import React from "react";
import { Liquid } from "@ant-design/plots";
export default function Round(props) {
  const payduecolor =
    props.percent < 0.1 ? "#aedda8" : props.percent > 0.3 ? "#e33131" : "#a8dadd";
  const dueconfig = {
    percent: props.percent,
    outline: {
      border: 2,
      distance: 3,
    },
    wave: {
      length: 100,
    },
 
    color: payduecolor,
  };

  return <Liquid width={200} height={200} {...dueconfig} />;
}
