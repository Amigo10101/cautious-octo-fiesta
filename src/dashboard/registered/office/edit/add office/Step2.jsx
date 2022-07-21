import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import TextField from "@mui/material/TextField";
import { Button, Steps } from "antd";
const { Step } = Steps;
const Step2 = (props) => {
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
      url: "https://stage-api.revmd.website/api/v1/helpers/email-check/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 453e7f19d7524f3b4b428ead0f9b7c2b6bd4e515",
      },
      data: data,
    };
    const gonext = () => {
      actions.updateAction(formdata);
      Navigate("/dashboard/office/registeredoffices/step3");
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
      
      <div className="container py-5 w-75">
        <Steps current={1}>
          <Step title="Office Info" />
          <Step title="Account Detail" />
          <Step title="Bank Info" />
          <Step title="Add Package" />
          <Step title="Review" />
        </Steps>
      </div>
      <form className="w-50 d-block m-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="row p-2">
          <div className="col-3 p-0">
            <label htmlFor="first_name" className=" align-middle text-end fs6 ">
              <span className="text-danger">*</span> First Name:
            </label>
          </div>
          <div className="col">
            <TextField
              error={!!errors.first_name}
              {...register("first_name", { required: true, maxLength: 100 })}
              className=" me-3"
              label="Name"
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
              label="Name"
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
            <label htmlFor="first_name" className=" align-middle text-end fs6 ">
              <span className="text-danger">*</span> Last Name:
            </label>
          </div>
          <div className="col">
            <TextField
              error={!!errors.last_name}
              {...register("last_name", { required: true, maxLength: 100 })}
              className=" me-3"
              label="Name"
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
              <span className="text-danger">*</span> Mobile Number:
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
              label="Mobile Number"
              id="MobileNumber"
              placeholder="Mobile Number"
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
              Cell Number:
            </label>
          </div>
          <div className="col">
            <TextField
              error={!!errors.PhoneNumber}
              type="number"
              {...register("PhoneNumber", { maxLength: 11 })}
              className=" me-3"
              label="Cell Number"
              id="PhoneNumber"
              placeholder="Cell Number"
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
                Navigate("/dashboard/office/registeredoffices/");
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
  );
};

export default Step2;
