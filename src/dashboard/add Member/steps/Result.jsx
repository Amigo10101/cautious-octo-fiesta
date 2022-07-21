import React, { useState } from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import { useNavigate } from "react-router-dom";
import { Button, Steps, message, Modal } from "antd";
import {
  CheckCircleFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import useToken from "../../../useToken";
import useId from "../../../useId";
import moment from "moment";
import { Stripepage } from "./payment/main";
const { Step } = Steps;
const { confirm } = Modal;

const officeid = sessionStorage.getItem("officeid");
const Result = (props) => {
  const { Id, setId } = useId();
  const { token, setToken } = useToken();
  const { state } = useStateMachine(updateAction);
  const Navigate = useNavigate();
  let letdata = {
    email: state.Email,
    first_name: state.FirstName,
    middle_name: state.MiddleName,
    last_name: state.LastName,
    gender: state.Gender,
    date_of_birth: moment(state.dateOfBirth).format("YYYY-MM-DD"),
    address_1: state.Address1,
    address_2: state.Address2,
    zip: state.Zip,
    city: state.city,
    state: state.whichState,
    language: state.Language,
    phone_number: state.MobileNumber,
    is_active: true,
    last_login: moment(state.dateOfBirth).format("YYYY-MM-DD"),
    package: state.Package,
    recurring: state.Recurring,
    terms: state.paymentTerms,
    language: state.Language,
  };
  const [disabled, setdisabled] = useState(
    state.package === undefined ? true : state.package === null ? true : false
  );
  const [paymentuncomplete, setpaymentuncomplete] = useState(true);
  const paymentwithcash = () => {
    paymentsuccess();
  };
  const postdata = () => {
    setdisabled(true);
    setpaymentuncomplete(true);
    const axios = require("axios");
    let data = JSON.stringify({
      email: state.Email,
      first_name: state.FirstName,
      middle_name: state.MiddleName,
      last_name: state.LastName,
      gender: state.Gender,
      date_of_birth: moment(state.dateOfBirth).format("YYYY-MM-DD"),
      address_1: state.Address1,
      address_2: state.Address2,
      zip: state.Zip,
      city: state.city,
      state: state.whichState,
      language: state.Language,
      phone_number: state.MobileNumber,
      is_active: true,
      last_login: moment(state.dateOfBirth).format("YYYY-MM-DD"),
      package: state.Package,
      recurring: state.Recurring,
      terms: state.paymentTerms,
      language: state.Language,
    });

    let config = {
      method: "post",
      url:
        "https://backend-demo.revmd.co/api/v1/" +
        Id.affiliated_office +
        "/memberships/",
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
        message.success("member added");
        Navigate("/dashboard/member/registeredmembers");
        sessionStorage.removeItem("__LSM__");
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const paymentsuccess = () => {
    confirm({
      title: "Do you want to Add This Memeber ?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <p>
          Payement Method: <strong>Card</strong>
        </p>
      ),
      onOk() {
        postdata();
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };
  const paymentwithcard = () => {
    Modal.success({
      icon: null,
      content: <Stripepage inputvals={letdata} price={state.Price} />,
      okText: "Cancel",
      closable: true,
      style: { pading: 0, borderRadius: 10 },
    });
  };
  return (
    <div>
      <div className="shadow-sm p-3">
        <div style={{ fontSize: "12px" }} className="p-2 pb-1">
          <span className="fw-light">Home / Membership Management</span>
          <span className="text-dark "> / Registered Member / Results</span>
        </div>
        <div className="p-2">
          <h5>Add Membership</h5>
          <div style={{ fontSize: "13px" }} className="fw-light">
            Register a new membership using the following form
          </div>
        </div>
      </div>
      <div>
        <div className="p-4 bgrey">
          <div className="bg-white">
            <div className="container py-5 w-75">
              <Steps current={3}>
                <Step title="Personal Info" />
                <Step title="Contact Detail" />
                <Step title="Package Info" />
                <Step title="Payment & Review" />
              </Steps>
            </div>
            <div>
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
              <div className="container w-50 bg-light ">
                <div className="">
                  <div
                    style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
                    className="p-4 px-2 container  "
                  >
                    <div className=" ps-3">
                      <h5>Personal Details</h5>
                    </div>
                    <div className="ps-3">
                      <div className="">First Name: {state.FirstName}</div>
                      <div className="">MIddle Name: {state.MiddleName}</div>
                      <div className="">Last Name: {state.LastName}</div>
                      <div className="">Gender: {state.Gender}</div>
                      <div className="">
                        {" "}
                        Date of Birth:{" "}
                        {moment(state.dateOfBirth).format("YYYY-MM-DD")}
                      </div>
                      <div className="">Address 1: {state.Address1}</div>
                      <div className="">Address 2: {state.Address2}</div>
                      <div className="">Zip: {state.Zip}</div>
                      <div className="">City: {state.city}</div>
                      <div className="">State: {state.whichState}</div>
                    </div>
                  </div>
                  <div
                    style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
                    className="p-4 px-2 container  "
                  >
                    <div className="fs-5 fw-bold ps-3">Contact Details</div>
                    <div className="ps-3">
                      <div className="">Phone Number: {state.PhoneNumber}</div>
                      <div className="">
                        Mobile Number: {state.MobileNumber}
                      </div>
                      <div className="">Email Address: {state.Email}</div>
                    </div>
                  </div>{" "}
                  <div
                    style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
                    className="p-4 px-2 container  "
                  >
                    <div className="fs-5 fw-bold ps-3">Package Detail</div>
                    <div className="ps-3">
                      <div className="">Package ID: {state.Package}</div>
                      <div className="">
                        Plan Interval: {state.paymentTerms}
                      </div>
                      <div className="">
                        Recurring Payment: {state.Recurring}
                      </div>
                      <div className="">Price: ${state.Price}</div>
                    </div>
                  </div>
                </div>

                <div className="row gy-2">
                  <div className="col py-2">
                    <Button
                      onClick={() => {
                        paymentwithcard();
                      }}
                      className="m-auto d-block"
                      type="primary"
                    >
                      Pay With Card
                    </Button>
                  </div>
                  <div className="col py-2">
                    <Button
                      onClick={() => {
                        paymentwithcash();
                      }}
                      className="m-auto d-block"
                      type="primary"
                    >
                      Payment With Cash
                    </Button>
                  </div>
                </div>
              </div>
              <div className="row pt-4 p-2">
                <div className="col-7"></div>
                <div className="col">
                  <Button
                    onClick={() => {
                      console.log(letdata);
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={paymentuncomplete}
                    onClick={postdata}
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
