import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "antd/lib/spin/style/index.css";

import Dashroutes from "./routes";

import "./style.css";
import MainaddMember from "./dashboard/registered/member/edit/add Member/main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Dashroutes/>
  </BrowserRouter>
);
