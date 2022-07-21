import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import TextField from "@mui/material/TextField";
import { Button, Steps } from "antd";
import useToken from "../../useToken";

const { Step } = Steps;
const Step2 = (props) => {
  const [officemode, setofficemode] = useState(
    sessionStorage.getItem("accountmode")
  );
  const isoffice = officemode === "O" ? true : false;
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

    let config = {
      method: "post",
      url: "https://backend-demo.revmd.co/api/v1/helpers/email-check/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
      data: data,
    };
    const gonext = () => {
      actions.updateAction(formdata);
      Navigate("/dashboard/office/addoffice/step3");
    };
    axios(config)
      .then((response) => {
        console.log(response.data.exists);
        {
          response.data.exists
            ? setError("Email", { type: "custom", message: "custom message" })
            : gonext();
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
          <span className="fw-light">Home / Office Management</span>
          <span className="text-dark "> / Add New Office / Step2</span>
        </div>
        <div className="p-2">
          <h5 className="">Add Office</h5>
          <div style={{ fontSize: "13px" }} className="fw-light">
            Register a new Office using the following form
          </div>
        </div>
      </div>
      <div className="p-4 bgrey">
        <div className="bg-white">
          <div className="w-75 m-auto py-5">
            <Steps current={1}>
              <Step title="Office Info" />
              <Step title="Account Detail" />
              <Step title="Bank Info" />
              {isoffice ? <></> : <Step title="Add Package" />}
              <Step title="Review" />
            </Steps>
          </div>
          <form
            className="w-50 d-block m-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="first_name"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger">*</span> First Name:
                </label>
              </div>
              <div className="col">
                <TextField
                  error={!!errors.first_name}
                  {...register("first_name", {
                    required: true,
                    maxLength: 100,
                  })}
                  className=" me-3"
                  label="First Name"
                  id="first_name"
                  placeholder="Your Name"
                  fullWidth
                  size="small"
                  defaultValue={state.first_name}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row text-danger p-auto m-auto ">
                  {errors.first_name?.type === "required" &&
                    "  Please enter Your Name"}
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="middle_name"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger"></span> Middle Name:
                </label>
              </div>
              <div className="col">
                <TextField
                  error={!!errors.first_name}
                  {...register("middle_name", { maxLength: 100 })}
                  className=" me-3"
                  label="Middle Name"
                  id="middle_name"
                  placeholder="Middle Name"
                  fullWidth
                  size="small"
                  defaultValue={state.middle_name}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="first_name"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger">*</span> Last Name:
                </label>
              </div>
              <div className="col">
                <TextField
                  error={!!errors.last_name}
                  {...register("last_name", { required: true, maxLength: 100 })}
                  className=" me-3"
                  label="Last Name"
                  id="last_name"
                  placeholder="last Name"
                  fullWidth
                  size="small"
                  defaultValue={state.last_name}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row text-danger p-auto m-auto ">
                  {errors.last_name?.type === "required" &&
                    "  Please enter Your Name"}
                </div>
              </div>
            </div>

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
                  size="small"
                  defaultValue={state.MobileNumber}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                  type="number"
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
            </div>
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
                  size="small"
                  defaultValue={state.PhoneNumber}
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
                  size="small"
                  defaultValue={state.Email}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row text-danger p-auto m-auto ">
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
                    Navigate("/dashboard/office/addoffice/step1");
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
