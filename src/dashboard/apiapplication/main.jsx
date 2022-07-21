import { Route, Routes, useNavigate } from "react-router-dom";
import Apiregister from "./apiregister";
import Apistatus from "./apistatus";
import React, { useState, useEffect } from "react";
import useToken from "../../useToken";
import { Spin } from "antd";
export default function Apiapp() {
  const [officeid, setofficeid] = useState(sessionStorage.getItem("affoffice"));
  const [effect, seteffect] = useState();
  const { token, setToken } = useToken();
  const navigate = useNavigate();
  const getapimode = () => {
    const axios = require("axios");
    const statuspage=(response)=>{
      
          sessionStorage.setItem("apitoken", response.data.results[0].token);
          sessionStorage.setItem("apistatus", response.data.results[0].enabled);
          sessionStorage.setItem("apiid", response.data.results[0].id);
          navigate("status");
    };

    let config = {
      method: "get",
      url: "https://backend-demo.revmd.co/api/v1/third-party-access/",
      headers: {
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        {response.data.count === 1?statuspage(response):navigate("register")} 
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getapimode();
  }, [effect]);
  return (
    <>
      <Routes>
        <Route path="register" element={<Apiregister />} />
        <Route
          path="/"
          element={
            <Spin
              style={{ marginTop: "40vh" }}
              className="vh-100 mx-auto  d-block"
            />
          }
        />
        <Route path="status" element={<Apistatus />} />
      </Routes>
    </>
  );
}
