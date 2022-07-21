import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Result from "./Result";
import Step3 from "./Step3";
import Step4 from "./step4";

createStore({ packagesdisplaydata: [] });

function Mainaddoffice() {
  return (
    <StateMachineProvider>
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="step2" element={<Step2 />} />
        <Route path="step3" element={<Step3 />} />
        <Route path="step4" element={<Step4 />} />
        <Route path="results" element={<Result />} />
      </Routes>
    </StateMachineProvider>
  );
}

export default Mainaddoffice;
