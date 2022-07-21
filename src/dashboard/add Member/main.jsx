import React, { createContext, useEffect, useState } from "react";
import {
  StateMachineProvider,
  createStore,
  
} from "little-state-machine";

import MembRoutes from "./routes";
import useToken from "../../useToken";
import { Packages } from "../../packagescontext";

createStore({ dateOfBirth: null });

export default function MainaddMember() {
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
        <MembRoutes /></Packages.Provider>
      </StateMachineProvider>
    </div>
  );
}
