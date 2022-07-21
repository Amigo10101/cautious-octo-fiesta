import React from "react";
import { Button, Empty, Pagination } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Search from "antd/lib/transfer/search";
import MemberTable from "./components/table";

export default function Mainadminsideapi() {
  return (
    <div className="bg-white">
      <div>
        <div className="">
          <div style={{ fontSize: "14px" }} className="p-2 pb-1">
            <span className="fw-light">Home / Api Management</span>
            <span className="text-dark "> / Api Registered Office</span>
          </div>
          <div className="p-2"></div>
        </div>
      </div>
      <div className="container-fluid  bg-white fs-5 p-5   ">
        <div>
          <span className="">Offices</span>
          <span className="float-end"></span>
        </div>
      </div>
      <div className="px-2">
        <MemberTable />
      </div>
    </div>
  );
}
