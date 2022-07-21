import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./style.css";

import Dashlogin from "./dashlogin/dashlogin";
import { Route, Routes, Navigate } from "react-router-dom";
import Pwdreset from "./pwdreset/main";
import Pwdresetaftermail from "./pwdresetaftermail/main";

import Mainapidocs from "./apidocs/main";
import useToken from "./useToken";
import Errorpage from "./404";
import useMode from "./usemode";
import Memboroffice from "./dashroute";
import { App } from "./test";

export default function Dashroutes() {
  const { token, setToken } = useToken();
  const { Mode, setMode } = useMode();
  const [tokenval, settokenval] = useState(token);

  return (
    <div>
      <Routes>
        <Route
          path="/dashboard/*"
          element={tokenval === null ? <Navigate to={"/"} /> : <Memboroffice />}
        />
        <Route path="/resetpassword" element={<Pwdreset />} />
        <Route
          path="/"
          element={
            tokenval === null ? <Dashlogin /> : <Navigate to={"/dashboard"} />
          }
        />

        <Route path="api/*" element={<Mainapidocs />} />
        <Route path="test" element={<App />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </div>
  );
}
