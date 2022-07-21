import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Result from "./Result";
import Step3 from "./Step3";
import Step4 from "./step4";
import useId from "../../useId";
import useToken from "../../useToken";
import { message } from "antd";

createStore({ packagesdisplaydata: [],OfficeName:'' });

function Mainaddoffice() {
  const { Id, setId } = useId();
  const { token, setToken } = useToken();
  const mode = Id.mode;
  const isoffice = mode === "O" ? true : false;
  const officeid = Id.affiliated_office;
  const getofficedetails = () => {
    const axios = require("axios");

    let config = {
      method: "get",
      url: "https://backend-demo.revmd.co/api/v1/office/" + officeid + "/",
      headers: {
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        sessionStorage.setItem(
          "officeaccountholder",
          response.data.account_holder
        );
        sessionStorage.setItem("officeaccountno", response.data.account_number);
        sessionStorage.setItem("officeroutingno", response.data.routing_number);
        sessionStorage.setItem("officebankname", response.data.bank_name);
      })
      .catch((error) => {
        console.log(error);
        message.error("Error getting Office Details");
      });
  };
  useEffect(() => {
    {
      mode === "O" ? getofficedetails() : console.log();
    }
    
  }, []);

  return (
    <div className="bg-white">
      <StateMachineProvider>
        <Routes>
          <Route path="step1" element={<Step1 />} />
          <Route path="step2" element={<Step2 />} />
          <Route path="step3" element={<Step3 />} />
          <Route path="step4" element={isoffice?<></>:<Step4 />} />
          <Route path="results" element={<Result />} />
        </Routes>
      </StateMachineProvider>
    </div>
  );
}

export default Mainaddoffice;
