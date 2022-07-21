import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import TextField from "@mui/material/TextField";
import { Button, Steps } from "antd";
import useToken from "../../../useToken";
const { Step } = Steps;
const Step2 = (props) => {
  const { token, setToken } = useToken();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const { actions, state } = useStateMachine({ updateAction });
  const Navigate = useNavigate();
  const onSubmit = async (formdata) => {
    const axios = require("axios");
    let data = JSON.stringify({
      email: formdata.Email,
    });
    let continueemail = () => {
      actions.updateAction(formdata);
      Navigate("/dashboard/member/addmembers/step3");
    };
    let config = {
      method: "post",
      url: "https://backend-demo.revmd.co/api/v1/helpers/email-check/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data.exists);
        {
          response.data.exists
            ? setError("Email", {
                type: "custom",
                message: "email already used",
              })
            : continueemail();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="shadow-sm p-3">
        <div style={{ fontSize: "12px" }} className="p-2 pb-1">
          <span className="fw-light">Home / Membership Management</span>
          <span className="text-dark "> / Registered Member / step2</span>
        </div>
        <div className="p-2">
          <h5>Add Membership</h5>
          <div style={{ fontSize: "13px" }} className="fw-light">
            Register a new membership using the following form
          </div>
        </div>
      </div>
      <div className="p-4 bgrey">
        <div className="bg-white">
          <div className="container py-5 w-75">
            <Steps current={1}>
              <Step title="Personal Info" />
              <Step title="Contact Detail" />
              <Step title="Package Info" />
              <Step title="Payment & Review" />
            </Steps>
          </div>
          <form
            className="w-50 py-2 d-block m-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="MobileNumber"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger">*</span> Mobile/Cell Number:
                </label>
              </div>
              <div className="col">
                <TextField
                  error={!!errors.MobileNumber}
                  {...register("MobileNumber", {
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                  })}
                  className=" me-3"
                  label="Mobile/Cell Number"
                  id="MobileNumber"
                  placeholder="Mobile/Cell Number"
                  fullWidth
                  defaultValue={state.MobileNumber}
                  type="number"
                  size="small"
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row text-danger p-auto m-auto ">
                  {errors.MobileNumber?.type === "required" &&
                    "  Please enter Mobile Number"}
                  {errors.MobileNumber?.type === "minLength" &&
                    "  Enter a valid Mobile Number"}
                  {errors.MobileNumber?.type === "maxLength" &&
                    "  Enter a valid Mobile Number"}
                </div>
              </div>
            </div>{" "}
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="PhoneNumber"
                  className=" align-middle text-end fs6 "
                >
                  Phone Number:
                </label>
              </div>
              <div className="col">
                <TextField
                  error={!!errors.PhoneNumber}
                  type="number"
                  {...register("PhoneNumber", { maxLength: 11 })}
                  className=" me-3"
                  label="Phone Number"
                  id="PhoneNumber"
                  placeholder="Phone Number"
                  fullWidth
                  defaultValue={state.PhoneNumber}
                  size="small"
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row text-danger p-auto m-auto ">
                  {errors.PhoneNumber?.type === "required" &&
                    "  Please enter Phone Number"}
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label htmlFor="Email" className=" align-middle text-end fs6 ">
                  <span className="text-danger">*</span> Email:
                </label>
              </div>
              <div className="col">
                <TextField
                  error={!!errors.Email}
                  {...register("Email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  className=" me-3"
                  label="Email"
                  id="Email"
                  placeholder="Email"
                  fullWidth
                  defaultValue={state.Email}
                  size="small"
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row text-danger p-auto m-auto fs6 ">
                  {errors.Email?.type === "required" && "  Please enter Email"}
                  {errors.Email?.type === "pattern" &&
                    "  Please enter a valid Email"}
                  {errors.Email?.type === "custom" &&
                    " This Email Has Already Been Entered"}
                </div>
              </div>
            </div>
            <div className="row pt-4 p-2">
              <div className="col-3"></div>
              <div className="col">
                <Button
                  onClick={() => {
                    Navigate("/dashboard/member/addmembers/step1");
                  }}
                >
                  Back
                </Button>
                <Button className="ms-2" type="primary" htmlType="submit">
                  Next
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step2;
