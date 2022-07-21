import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Result from "./Result";

import "./styles.css";

createStore({});

function  Check() {
  return (
    <StateMachineProvider>

      <Router>
        <Routes>
           <Route  path="/" element={<Step1/>} />
        <Route path="/step2" element={<Step2/>}/>
        <Route path="/results" element={<Result/>} /></Routes>
       
      </Router>

    </StateMachineProvider>
  );
}

export default Check;
