import React from "react";
import { Button, Empty, Pagination } from "antd";

import Officetable from "./table";
import { useNavigate } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
createStore({ editofficedata: [""] });
export default function MainRegisteredOffice() {
  return (
    <div className="bg-white">
      <div>
        <div className="p-3">
          <div style={{ fontSize: "14px" }} className="p-2 pb-1">
            <span className="fw-light">Home / Office Management</span>
            <span className="text-dark "> / Registered Office</span>
          </div>
          <div className="p-2"></div>
        </div>
      </div>
      <div className="p-4 bgrey">
        <div className="bg-white">
      <div className="p-4">
        <StateMachineProvider>
          <Officetable />
        </StateMachineProvider>
      </div></div></div>
    </div>
  );
}
