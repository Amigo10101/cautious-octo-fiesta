import React, { useState, useEffect } from "react";
import { useStateMachine } from "little-state-machine";

import { useNavigate } from "react-router-dom";
import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Steps, message } from "antd";
import clearAction from "./clearAction";
import updateAction from "./updateAction";
import useToken from "../../useToken";


const { Step } = Steps;
const Result = (props) => {
  const [mode, setofficemode] = useState(
    sessionStorage.getItem("accountmode")
  );
  const isoffice = mode === "O" ? true : false;
  const { actions, state } = useStateMachine({ clearAction });
  const { token, setToken } = useToken();
  const Navigate = useNavigate();
  const postdata = () => {
    const axios = require("axios");
    const data1 = state.packagesdisplaydata;
    const data123 = { packages: data1 };

    let data = JSON.stringify({
      name: state.OfficeName,
      ein: state.EJN,
      address_1: state.Address1,
      address_2: state.Address2,
      zip: state.Zip,
      city: state.city,
      state: state.whichState,
      office_type: state.OfficeType,
      account_holder: state.AccountHolder,
      account_number: state.AccountNumber,
      routing_number: state.RoutingNumber,
      bank_name: state.BankName,
      user: {
        email: state.Email,
        first_name: state.first_name,
        middle_name: state.middle_name,
        last_name: state.last_name,
        phone_number: state.MobileNumber,
      },
      packages: state.packagesdisplaydata,
      parent:
        sessionStorage.getItem("officeid") === "na"
          ? 0
          : sessionStorage.getItem("officeid"),
    });

    let config = {
      method: "post",
      url: "https://backend-demo.revmd.co/api/v1/office/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        message.success("Added Office");
        Navigate("/dashboard/office/registeredoffices");
        sessionStorage.removeItem("__LSM__");
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const data12 = state.packagesdisplaydata;
  const data1232 = { packages: data12 };
  return (
    <div>
      <div className="p-3">
        <div style={{ fontSize: "12px" }} className="p-2 pb-1">
          <span className="fw-light">Home / Office Management</span>
          <span className="text-dark "> / Add Office / Results</span>
        </div>
        <div className="p-2">
          <h5>Add Office</h5>
          <div style={{ fontSize: "13px" }} className="fw-light">
            Register a new Office using the following form
          </div>
        </div>
      </div>
      <div className="p-4 bgrey">
        <div className="bg-white">
          <div className="w-75 m-auto px-5 py-5">
            <Steps current={isoffice?3:4}>
              <Step title="Office Info" />
              <Step title="Account Detail" />
              <Step title="Bank Info" />
              {isoffice ? <></> : <Step title="Add Package" />}
              <Step title="Review" />
            </Steps>
          </div>
          <div className="pt-1  m-auto">
            <div className="container">
              <div className="text-center py-4">
                <CheckCircleFilled
                  style={{ fontSize: "72px", color: "#52c41a" }}
                />
                <div
                  style={{
                    fontSize: "24px",
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  Complete
                </div>
                <div
                  className="pt-2"
                  style={{ fontSize: "14px", color: "rgba(0,0,0,.45)" }}
                >
                  Please verify the information below and submit.
                </div>
              </div>

              <div className="bg-light w-50 m-auto">
                <div className="container ">
                  <div className="container py-3   text-start">
                    <div className=" ">
                      <div
                        style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
                        className=" px-2 container  "
                      >
                        <div className="fs-5 fw-bold ">Office Details</div>
                        <div className="">
                          <div className="">
                            Office Name: {state.OfficeName}
                          </div>
                          <div className="">Office EIN: {state.EJN}</div>
                          <div className="">Address 1 : {state.Address1}</div>
                          <div className="">Address 2: {state.Address2}</div>
                          <div className="">Zip: {state.Zip}</div>
                          <div className="">City: {state.city}</div>
                          <div className="">State: {state.whichState}</div>
                          <div className="">
                            Office Type: {state.OfficeType}
                          </div>
                          <div className="">Logo: {state.Logo}</div>
                        </div>
                      </div>
                      <div
                        style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
                        className=" px-2 container  "
                      >
                        <div className="fs-5 fw-bold ">Office Details</div>
                        <div className="">
                          <div className="">
                            Office Name: {state.OfficeName}
                          </div>
                          <div className="">Full Name: {state.first_name} {state.middle_name} {state.last_name}</div>
                          <div className="">
                            Phone Number: {state.PhoneNumber}
                          </div>
                          <div className="">
                            Mobile/Cell Number: {state.MobileNumber}
                          </div>
                          <div className="">Email Address: {state.Email}</div>
                        </div>
                      </div>{" "}
                      <div
                        style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
                        className=" px-2 container  "
                      >
                        <div className="fs-5 fw-bold ">Bank Information</div>
                        <div className="">
                          <div className="">
                            Account Holder: {state.AccountHolder}
                          </div>
                          <div className="">
                            Routing Number : {state.RoutingNumber}
                          </div>
                          <div className="">
                            Account Number: {state.AccountNumber}
                          </div>
                          <div className="">Bank Name: {state.BankName}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{ display: mode === "O" ? "none" : "block" }}
                  className="container ps-4"
                >
                  <div className="">
                    {" "}
                    <h3 className="fs-5 fw-bold ps-2">Packages</h3>
                  </div>
                  <div className="col p-5">
                    <div className="row bg-light">
                      <div className="col-2 border p-3">Title</div>
                      <div className="col border p-3">Members & Prices</div>
                    </div>
                    <div className="row bg-light">
                      <div className="col-2 border p-3"></div>
                      <div className="col ">
                        <div className="row">
                          <div className="col border p-3">Min</div>
                          <div className="col border p-3">Max</div>

                          <div className="col border p-3">Retail Price</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {state.packagesdisplaydata.map((item, index) => {
                        return (
                          <div className="row bg-light">
                            <div className="col-2 border">
                              {state.packagesdisplaydata[index].name}
                            </div>
                            <div className="col">
                              {state.packagesdisplaydata[
                                index
                              ].package_tiers.map((item, index) => {
                                return (
                                  <div className="row" key={item.min_members}>
                                    <div className="col p-2 border">
                                      {item.min_members}
                                    </div>
                                    <div className="col p-2 border">
                                      {item.max_members}
                                    </div>

                                    <div className="col p-2 border">
                                      {item.retail_price}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-4 p-2">
                <div className="col-4"></div>
                <div className="col">
                  <Button
                    onClick={() => {
                      {mode==="O"?Navigate("/dashboard/office/addoffice/step3"):Navigate("/dashboard/office/addoffice/step4");}
                      
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      postdata();
                    }}
                    className="ms-2"
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
