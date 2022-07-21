import React,{useState} from "react";
import { Button, Empty, Pagination } from "antd";

import MemberTableoffice from "./components/otable";
import { StateMachineProvider, createStore } from "little-state-machine";
import { Navigate, useNavigate } from "react-router-dom";
import MemberTableadmin from "./components/atable";

createStore({ editofficedata: [""] });
export default function MainRegisteredMember() {
 const navigate = useNavigate();
 const [mode, setmode] = useState(localStorage.getItem("mode"))
  return (
    <div className="bg-white">
      <div>
        <div className="p-3">
          <div style={{ fontSize: "14px" }} className="p-2 pb-1">
            <span className="fw-light">Home / Member Management</span>
            <span className="text-dark "> / Registered Member</span>
          </div>
          <div className="p-2"></div>
        </div>
      </div>
      <div className="p-4 bgrey">
        <div className="bg-white">
      
      <div className="px-2">
        <StateMachineProvider>
          {mode==="A"?<MemberTableadmin />:mode==="O"?<MemberTableoffice/>:<Navigate to="/"/>}
        </StateMachineProvider>
      </div></div></div>
    </div>
  );
}
