import React from "react";
import { Button, Empty, Pagination } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Search from "antd/lib/transfer/search";
import MemberTable from "./table";
import { useNavigate } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
createStore({});

export default function MainRegisteredUser() {
  const Navigate = useNavigate();
  return (
    <div className="bg-white">
      <div>
        <div className="p-3">
          <div style={{ fontSize: "14px" }} className="p-2 pb-1">
            <span className="fw-light">Home / user Management</span>
            <span className="text-dark "> / Registered user</span>
          </div>
          <div className="p-2"></div>
        </div>
      </div>
      <div className="p-4 bgrey">
        <div className="bg-white">
      
      <div className="px-4 pt-3">
        <StateMachineProvider>
          <MemberTable />
        </StateMachineProvider>
      </div></div></div>
    </div>
  );
}
