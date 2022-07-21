import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import TextField from "@mui/material/TextField";
import { Button, Steps } from "antd";
import useId from "../../useId";
const { Step } = Steps;
const Step3 = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const Navigate = useNavigate();
  const { actions, state } = useStateMachine({ updateAction });
  const { Id, setID } = useId();
  const mode = Id.mode;

  const officeid = Id.affiliated_office;
  const isoffice = mode === "O" ? true : false;
  const setdetails = () => {
    setValue("AccountHolder", sessionStorage.getItem("officeaccountholder"));
    setValue("RoutingNumber", sessionStorage.getItem("officeroutingno"));
    setValue("AccountNumber", sessionStorage.getItem("officeaccountno"));
    setValue("BankName", sessionStorage.getItem("officebankname"));
  };
  useEffect(() => {
    {
      mode ? setdetails() : console.log();
    }
  }, []);

  const onSubmit = (data) => {
    actions.updateAction(data);
    {
      isoffice
        ? Navigate("/dashboard/office/addoffice/results")
        : Navigate("/dashboard/office/addoffice/step4");
    }
  };

  return (
    <div>
      <div className="shadow-sm p-3">
        <div style={{ fontSize: "12px" }} className="p-2 pb-1">
          <span className="fw-light">Home / Office Management</span>
          <span className="text-dark "> / Add New Office / Step3</span>
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
          <div className="w-75 m-auto  py-5">
            <Steps current={2}>
              <Step title="Office Info" />
              <Step title="Account Detail" />
              <Step title="Bank Info" />
              {isoffice ? <></> : <Step title="Add Package" />}
              <Step title="Review" />
            </Steps>
          </div>
          <form
            className="w-50  d-block m-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row p-2">
              <div className="col-4 p-0">
                <label
                  htmlFor="AccountHolder"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger">*</span> Account Holder:
                </label>
              </div>
              <div className="col">
                <TextField
                  error={!!errors.AccountHolder}
                  {...register("AccountHolder", {
                    required: true,
                    maxLength: 100,
                  })}
                  className=" me-3"
                  label="Account Holder"
                  id="AccountHolder"
                  placeholder="Account Holder's Name"
                  fullWidth
                  size="small"
                  defaultValue={state.AccountHolder}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{
                    readOnly: isoffice,
                    style: { fontSize: "13px" },
                  }}
                />
                <div className=" row text-danger p-auto m-auto ">
                  {errors.AccountHolder?.type === "required" &&
                    "  Please enter Account Holder"}
                </div>
              </div>
            </div>

            <div className="row p-2">
              <div className="col-4 p-0">
                <label
                  htmlFor="RoutingNumber"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger">*</span> Routing Number:
                </label>
              </div>
              <div className="col">
                <TextField
                  error={!!errors.RoutingNumber}
                  {...register("RoutingNumber", {
                    required: true,
                    minLength: 6,
                    maxLength: 10,
                  })}
                  className=" me-3"
                  label="Routing Number"
                  id="RoutingNumber"
                  placeholder="Routing Number"
                  fullWidth
                  size="small"
                  defaultValue={state.RoutingNumber}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{
                    readOnly: isoffice,
                    style: { fontSize: "13px" },
                  }}
                  type="number"
                />
                <div className=" row text-danger p-auto m-auto ">
                  {errors.RoutingNumber?.type === "required" &&
                    "  Please enter Routing Number"}
                  {errors.RoutingNumber?.type === "minLength" &&
                    "  Enter a valid Routing Number"}
                  {errors.RoutingNumber?.type === "maxLength" &&
                    "  Enter a valid Routing Number"}
                </div>
              </div>
            </div>

            <div className="row p-2">
              <div className="col-4 p-0">
                <label
                  htmlFor="AccountNumber"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger">*</span> Account Number:
                </label>
              </div>
              <div className="col">
                <TextField
                  error={!!errors.AccountNumber}
                  {...register("AccountNumber", {
                    required: true,
                    maxLength: 11,
                  })}
                  className=" me-3"
                  label="Account Number"
                  id="AccountNumber"
                  placeholder="Account Number"
                  fullWidth
                  size="small"
                  defaultValue={state.AccountNumber}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{
                    readOnly: isoffice,
                    style: { fontSize: "13px" },
                  }}
                />
                <div className=" row text-danger p-auto m-auto ">
                  {errors.AccountNumber?.type === "required" &&
                    "  Please enter Account Number"}
                  {errors.AccountNumber?.type === "maxLength" &&
                    "  Please enter a valid Account Number"}
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-4 p-0">
                <label
                  htmlFor="BankName"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger">*</span> Bank Name:
                </label>
              </div>
              <div className="col">
                <TextField
                  error={!!errors.BankName}
                  {...register("BankName", { required: true })}
                  className=" me-3"
                  label="Bank Name"
                  id="BankName"
                  placeholder="Bank Name"
                  fullWidth
                  size="small"
                  defaultValue={state.BankName}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{
                    readOnly: isoffice,
                    style: { fontSize: "13px" },
                  }}
                />
                <div className=" row text-danger p-auto m-auto ">
                  {errors.BankName?.type === "required" &&
                    "  Please enter Bank Name"}
                </div>
              </div>
            </div>
            <div className="row pt-4 p-2">
              <div className="col-3"></div>
              <div className="col">
                <Button
                  onClick={() => {
                    Navigate("/dashboard/office/addoffice/step2");
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

export default Step3;
