import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useId from "../../../useId";
import Step1 from "./form1";
import "./style.css";

export default function Dashboardpage() {
  let activeStyle = {
    textDecoration: "underline",
  };
  let activeClassName = "underline";
  const [effect, setefffect] = useState();
  const { Id, setId } = useId();
  const lastitem = Id.membership.membership_history.slice(-1);
  useEffect(() => {}, [effect]);

  return (
    <div style={{ backgroundColor: "aliceblue" }}>
      <div className="row pt-4">
        <div className="col-md-3  p-3">
          <div
            style={{ width: 200 }}
            className="container position-relative shadow rounded-4 p-3 "
          >
            <img
              width={100}
              height={100}
              src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="rounded-circle d-block m-auto"
            />

            <div
              style={{
                backgroundColor: Id.is_active ? "#07ca9a" : "#da1111",
                position: "absolute",
                top: "10%",
                left: "60%",
                fontWeight: "500",
              }}
              className="rounded-4 d-table m-auto my-2 text-white px-2 py-1 fs-6"
            >
              {Id.is_active ? "Active" : "Expired"}
            </div>
          </div>
        </div>
        <div className="col-md-8 p-5 py-3 shadow rounded-4">
          <div className="row border-bottom ">
            <div className="text-primary fw-bold fs-5 text-start">
              {Id.first_name} {Id.middle_name} {Id.last_name}
            </div>
            <div style={{ fontWeight: "400" }} className=" fs-6 text-start">
              {Id.email} <span className="ms-4">{Id.phone_number}</span>{" "}
            </div>
          </div>
          <div className="row pt-3 g-2">
            <div className="col">
              <div className="h6 text-primary">Package</div>
              <div className="fs6">Package {lastitem[0].package} </div>
            </div>
            <div className="col">
              <div className="h6 text-primary ps-2">Status</div>
              <div className="fs6">
                <div
                  style={{
                    backgroundColor: Id.is_active ? "#07ca9a" : "#da1111",
                    fontWeight: "500",
                  }}
                  className="rounded-4 d-table m-0  text-white px-2  fs-6"
                >
                  {Id.membership.has_active_policy ? "Active" : "Expired"}
                </div>{" "}
              </div>
            </div>
            <div className="col">
              <div className="h6 text-primary">Terms</div>
              <div className="fs6">{lastitem[0].terms} </div>
            </div>
            <div className="col">
              <div className="h6 text-primary">Start Date</div>
              <div className="fs6">{lastitem[0].benefit_start} </div>
            </div>
            <div className="col">
              <div className="h6 text-primary">Expiry Date</div>
              <div className="fs6">{lastitem[0].benefit_end} </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container px-4 py-5">
        <NavLink
          to={"/"}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="formselector formselected"
        >
          Account Details
        </NavLink>
        <NavLink
          to={"/"}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="formselector"
        >
          Contact Details
        </NavLink>
        <NavLink
          to={"/"}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="formselector"
        >
          Package Details
        </NavLink>
      </div>
      <div className="container">
        <Step1 />
      </div>
    </div>
  );
}
