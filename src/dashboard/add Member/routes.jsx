import React, { useEffect } from "react";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  StateMachineProvider,
  createStore,
  useStateMachine,
} from "little-state-machine";
import Step3 from "./steps/step3";
import Result from "./steps/Result";
import updateAction from "./updateAction";
const data={
  FirstName:""
}
export default function MembRoutes() {
  const { actions, state } = useStateMachine({ updateAction });
  useEffect(() => {
   
    console.log("awdawdawdawd")
    
  }, [])
  
  return (
    <div>
      <Routes>
        <Route path="step1" element={<Step1 />} />
        <Route path="step2" element={<Step2 />} />
        <Route path="step3" element={<Step3 />} />
        <Route path="results" element={<Result />} />
      </Routes>
    </div>
  );
}
