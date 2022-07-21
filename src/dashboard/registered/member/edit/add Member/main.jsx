import React, { useEffect, useState } from "react";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import Step3 from "./steps/step3";
import Result from "./steps/Result";
import { Packages } from "../../../../../packagescontext";
import useToken from "../../../../../useToken";
createStore({ dateOfBirth: null });
export default function MainaddMember(props) {
  const { token, setToken } = useToken();
  const [officeid, setofficeid] = useState(sessionStorage.getItem("affoffice"));
  const [packageprice, setpackageprice] = useState([]);
  const [effect, seteffect] = useState();
  const getpackagedetails = () => {
    const axios = require("axios");
    const getpackageprice = (officepackages) => {
      {
        officepackages.map((option) => {
          const axios = require("axios");
          let data = JSON.stringify({
            package_id: option.id,
          });
          const packid = `${option.id}`;
          let config = {
            method: "post",
            url: "https://backend-demo.revmd.co/api/v1/helpers/get-package-adjusted-price/",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Token" + " " + `${token}`,
            },
            data: data,
          };

          axios(config)
            .then((response) => {
              const faw = option;
              faw.yprice = response.data.price;
              faw.mprice = parseFloat((response.data.price / 12).toFixed(2));

              setpackageprice((packageprice) => packageprice.concat([faw]));
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    };
    let config = {
      method: "get",
      url: "https://backend-demo.revmd.co/api/v1/office/" + `${officeid}` + "/",
      headers: {
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
    };

    axios(config)
      .then((response) => {
        getpackageprice(response.data.packages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getpackagedetails();
    
  }, [effect]);
  return (
    <div className="bg-white">
      <StateMachineProvider>
        <Packages.Provider value={packageprice}>
          <Routes>
            <Route path="/" element={<Step1 />} />
            <Route path="step2" element={<Step2 />} />
            <Route path="step3" element={<Step3 active={props.active} />} />
            <Route path="results" element={<Result active={props.active}  />} />
          </Routes>
        </Packages.Provider>
      </StateMachineProvider>
    </div>
  );
}
