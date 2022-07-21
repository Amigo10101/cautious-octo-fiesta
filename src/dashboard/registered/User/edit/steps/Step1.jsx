import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button, message } from "antd";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";

const Step1 = (props) => {
  const { actions, state } = useStateMachine({ updateAction });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    postdata();
  };
  const postdata = () => {};
  return (
    <div>
      <form
        style={{ fontSize: "13px" }}
        className="w-75  mb-4 m-2  bg-white   d-block m-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row p-2">
          <div className="col-3 p-0">
            <label htmlFor="FirstName" className=" align-middle text-end fs6 ">
              <span className="text-danger fw-bold fs-5">*</span> First Name:
            </label>
          </div>
          <div className="col-7 fs6">
            <TextField
              size="small"
              style={{ fontSize: "10px" }}
              error={!!errors.FirstName}
              {...register("FirstName", { required: true, maxLength: 100 })}
              className=" me-3"
              label="First Name"
              id="FirstName"
              placeholder="First Name"
              fullWidth
              InputLabelProps={{ style: { fontSize: "13px" } }}
              InputProps={{ style: { fontSize: "13px" } }}
              defaultValue={state.first_name}
            />
            <div className=" row text-danger p-auto m-auto fs5">
              {errors.FirstName?.type === "required" &&
                "  Please enter First Name"}
            </div>
          </div>
        </div>
        <div className="row p-2">
          <div className="col-3 p-0">
            <label htmlFor="FirstName" className=" align-middle text-end fs6 ">
              Middle Name:
            </label>
          </div>
          <div className="col-7">
            <TextField
              size="small"
              error={!!errors.MiddleName}
              {...register("MiddleName", { maxLength: 100 })}
              className=" me-3"
              label="Middle Name"
              id="MiddleName"
              placeholder="Middle Name"
              fullWidth
              InputLabelProps={{ style: { fontSize: "13px" } }}
              InputProps={{ style: { fontSize: "13px" } }}
              defaultValue={state.middle_name}
            />
          </div>
        </div>
        <div className="row p-2">
          <div className="col-3 p-0">
            <label htmlFor="FirstName" className=" align-middle text-end fs6 ">
              <span className="text-danger fw-bold fs-5">*</span> Last Name:
            </label>
          </div>
          <div className="col-7">
            <TextField
              size="small"
              error={!!errors.LastName}
              {...register("LastName", { required: true, maxLength: 100 })}
              className=" me-3"
              label="Last Name"
              id="LastName"
              placeholder="Last Name"
              fullWidth
              InputLabelProps={{ style: { fontSize: "13px" } }}
              InputProps={{ style: { fontSize: "13px" } }}
              defaultValue={state.last_name}
            />
            <div className=" row text-danger p-auto m-auto fs5">
              {errors.LastName?.type === "required" &&
                "  Please enter Last Name"}
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
          <div className="col-7">
            <TextField
              size="small"
              error={!!errors.PhoneNumber}
              type="number"
              {...register("PhoneNumber", { maxLength: 11 })}
              className=" me-3"
              label="Phone Number"
              id="PhoneNumber"
              placeholder="Phone Number"
              fullWidth
              InputLabelProps={{ style: { fontSize: "13px" } }}
              InputProps={{ style: { fontSize: "13px" } }}
              defaultValue={state.phone_number}
            />
            <div className=" row text-danger p-auto m-auto fs5">
              {errors.PhoneNumber?.type === "required" &&
                "  Please enter Phone Number"}
            </div>
          </div>
        </div>
        <div className="row p-2">
          <div className="col-3 p-0">
            <label
              htmlFor="MobileNumber"
              className=" align-middle text-end fs6 "
            >
              <span className="text-danger fw-bold fs-5">*</span> Mobile Number:
            </label>
          </div>
          <div className="col-7">
            <TextField
              size="small"
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
              type="number"
              InputLabelProps={{ style: { fontSize: "13px" } }}
              InputProps={{ style: { fontSize: "13px" } }}
              defaultValue={state.MobileNumber}
            />
            <div className=" row text-danger p-auto m-auto fs5">
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
            <label htmlFor="Email" className=" align-middle text-end fs6 ">
              <span className="text-danger fw-bold fs-5">*</span> Email:
            </label>
          </div>
          <div className="col-7">
            <TextField
              size="small"
              error={!!errors.Email}
              {...register("Email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              className=" me-3"
              label="Email"
              id="Email"
              placeholder="Emailad"
              fullWidth
              InputLabelProps={{ style: { fontSize: "13px" } }}
              InputProps={{ style: { fontSize: "13px" } }}
              defaultValue={state.Email}
            />
            <div className=" row text-danger p-auto m-auto fs5 ">
              {errors.Email?.type === "required" && "  Please enter Email"}
              {errors.Email?.type === "pattern" &&
                "  Please enter a valid Email"}
            </div>
          </div>
        </div>
        <div className=" row pt-4 ps-2 ">
          <div className="col-3"></div>
          <div className="col">
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step1;
