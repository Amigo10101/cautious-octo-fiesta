import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./style.css";

import MainDashboard from "./dashboard/main";
import Dashlogin from "./dashlogin/dashlogin";
import { Route, Routes } from "react-router-dom";
import Pwdreset from "./pwdreset/main";
import Pwdresetaftermail from "./pwdresetaftermail/main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MainDashboard/>
  </BrowserRouter>
);
  