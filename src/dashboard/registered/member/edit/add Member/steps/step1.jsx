import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useStateMachine } from "little-state-machine";
import { Controller } from "react-hook-form";
import updateAction from "../updateAction";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useNavigate } from "react-router-dom";
import { Button, Steps } from "antd";
import axios from "axios";
import { MenuItem } from "@mui/material";
import useToken from "../../../../../../useToken"

const { Step } = Steps;
const Step1 = (props) => {
  useEffect(() => {
    state.FirstName = "vwad";
  }, []);
const [shrink, setshrink] = React.useState()
  const { actions, state } = useStateMachine({ updateAction });
  const { token, setToken } = useToken();
  const [post, setPost] = React.useState(null);
  function zipcodesetter(event) {
    const value = event.target.value;
    function resetcta(){
      setValue("whichState","")
      setValue("city","")
    }

    {
      value.length === 5 ? Getzipcode(value) : resetcta();
    }
  }
  const Getzipcode = (e) => {
    const axios = require("axios");
    const FormData = require("form-data");
    let data = new FormData();

    let config = {
      method: "post",
      url: "https://backend-demo.revmd.co/api/v1/helpers/zip/?zip_code=" + e,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        setshrink(true);
        setValue("whichState", response.data.state);
        setValue("city", response.data.city);
        clearErrors("whichState");
        clearErrors("city");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const Navigate = useNavigate();
  const onSubmit = (data) => {
    actions.updateAction(data);
    Navigate("/dashboard/member/registeredmembers/step2");
  };

  const [valuedate, setValuedate] = React.useState(null);
  return (
    <div className="">
    
      <div className="">
        <div className="bg-white">
          <div className="container py-5 w-75 bg-white">
            <Steps current={0}>
              <Step title="Personal Info" />
              <Step title="Contact Detail" />
              <Step title="Package Info" />
              <Step title="Payment & Review" />
            </Steps>
          </div>

          <form
            className="w-50 pe-5 pt-2 d-block m-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row p-2">
              <div className="col-3 p-0">
           
                <label
                  htmlFor="FirstName"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger">*</span> First Name:
                </label>
              </div>
              <div className="col">
                <TextField
                  size="small"
                  error={!!errors.FirstName}
                  {...register("FirstName", { required: true, maxLength: 100 })}
                  className=" me-3"
                  label="First Name"
                  id="FirstName"
                  placeholder="First Name"
                  fullWidth
                  defaultValue={state.FirstName}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" validationerror row text-danger p-auto m-auto ">
                  {errors.FirstName?.type === "required" &&
                    "  Please enter First Name"}
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="FirstName"
                  className=" align-middle text-end fs6 "
                >
                  Middle Name:
                </label>
              </div>
              <div className="col">
                <TextField
                  size="small"
                  error={!!errors.FirstName}
                  {...register("MiddleName", { maxLength: 100 })}
                  className=" me-3"
                  label="Middle Name"
                  id="MiddleName"
                  placeholder="Middle Name"
                  fullWidth
                  defaultValue={state.MiddleName}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="LastName"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger fw-bold">*</span> Last Name:
                </label>
              </div>
              <div className="col">
                <TextField
                  size="small"
                  error={!!errors.LastName}
                  {...register("LastName", { required: true, maxLength: 100 })}
                  className=" me-3"
                  label="Last Name"
                  id="LastName"
                  placeholder="Last Name"
                  fullWidth
                  defaultValue={state.LastName}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" validationerror row text-danger p-auto m-auto ">
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
                  <span className="text-danger fw-bold">*</span>Gender:
                </label>
              </div>
              <div className="col">
                <TextField
                  defaultValue={state.Gender}
                  select
                  fullWidth
                  size="small"
                  label="Select a Gender"
                  inputProps={register("Gender", {
                    required: "Please Select a Gender",
                  })}
                  error={errors.Gender}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                >
                  <MenuItem value="Male">Male</MenuItem>

                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <div className=" validationerror row text-danger p-auto m-auto  ">
                  {errors.Gender?.type === "required" &&
                    "  Please Choose a Gender"}
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="PhoneNumber"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger fw-bold">*</span>Date Of Birth:
                </label>
              </div>
              <div className="col">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    defaultValue={
                      state.dateOfBirth === undefined ? null : state.dateOfBirth
                    }
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <MobileDatePicker
                        label="Date of birth"
                        openTo="year"
                        views={["year", "month", "day"]}
                        format={"YYYY-MM-DD"}
                        disableFuture
                        value={value}
                        onChange={(value) => onChange(value)}
                        renderInput={(params) => (
                          <TextField
                            id="dateOfBirth"
                            variant="outlined"
                            size="small"
                            fullWidth
                            color="primary"
                            {...params}
                            InputLabelProps={{ style: { fontSize: "13px" } }}
                            InputProps={{ style: { fontSize: "13px" } }}
                            error={!!errors.dateOfBirth}
                          />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>
                <div className=" row text-danger validationerror p-auto m-auto  ">
                  {errors.dateOfBirth?.type === "required" &&
                    "  Please Enter a DOB"}
                </div>
              </div>
            </div>

            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="Address1"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger fw-bold">*</span> Address:
                </label>
              </div>
              <div className="col">
                <TextField
                  error={!!errors.Address1}
                  {...register("Address1", { required: true, maxLength: 100 })}
                  className=" me-3"
                  label="Address1"
                  id="OfficeName"
                  placeholder="OfficeName"
                  fullWidth
                  size="small"
                  defaultValue={state.Address1}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" validationerror row text-danger p-auto m-auto ">
                  {errors.Address1?.type === "required" &&
                    "  Please enter Office Address"}
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0"></div>
              <div className="col">
                <TextField
                  error={!!errors.Address1}
                  {...register("Address2", { maxLength: 120 })}
                  className=" me-3"
                  label="Address2"
                  id="Address2"
                  placeholder="Address2"
                  fullWidth
                  size="small"
                  defaultValue={state.Address2}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" validationerror row text-danger p-auto m-auto ">
                  {errors.Address2?.type === "maxLength" &&
                    "  Please enter a valid Address"}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row p-2">
                <div className="col-3 p-0"></div>{" "}
                <div className="col-2">
                  <TextField
                    onChange={zipcodesetter} 
                    error={!!errors.Zip}
                    
                    className=" me-3"
                    label="ZIP"
                    id="OfficeName"
                    placeholder="ZIP"
                    fullWidth
                    size="small"
                    defaultValue={state.Zip}
                    InputLabelProps={{ style: { fontSize: "13px" } }}
                    InputProps={{ style: { fontSize: "13px" } }}
                    inputProps={ {...register("Zip", {
                      minLength: 5,
                      maxLength: 5,
                      required: true,
                    }),type: "text", maxlength: "5",}}
                  />
                  <div className=" row validationerror text-danger p-auto m-auto ">
                    {errors.Zip?.type === "minLength" &&
                      " Enter a valid zip code"}
                    {errors.Zip?.type === "maxLength" &&
                      " Please enter a valid zip code"}
                    {errors.Zip?.type === "required" &&
                      " Please enter a zip code"}
                  </div>
                </div>
                <div className="col-3">
                  <TextField
                    error={!!errors.whichState}
                    {...register("whichState", {
                      required: true,
                      maxLength: 100,
                    })}
                    className=" me-3"
                    label="State"
                    id="whichState"
                    placeholder="State"
                    fullWidth
                    size="small"
                    defaultValue={state.whichState}
                    InputLabelProps={{shrink:shrink, style: { fontSize: "13px" } }}
                    InputProps={{ style: { fontSize: "13px" } }}
                  />
                  <div className=" row validationerror text-danger p-auto m-auto ">
                    {errors.whichState?.type === "required" &&
                      " Please enter a state"}
                  </div>
                </div>
                <div className="col-4">
                  <TextField
                    error={!!errors.city}
                    {...register("city", { required: true, maxLength: 100 })}
                    className=" me-3"
                    label="City"
                    id="OfficeName"
                    placeholder="City"
                    fullWidth
                    size="small"
                    defaultValue={state.city}
                    InputLabelProps={{shrink:shrink, style: { fontSize: "13px" } }}
                    InputProps={{ style: { fontSize: "13px" } }}
                  />
                  <div className=" row validationerror text-danger p-auto m-auto ">
                    {errors.city?.type === "required" &&
                      " Please enter a city "}
                  </div>
                </div>
              </div>
              <div className="row p-2">
                <div className="col-3 p-0">
                  <label
                    htmlFor="PhoneNumber"
                    className=" align-middle text-end fs6 "
                  >
                    <span className="text-danger fw-bold">*</span>Language:
                  </label>
                </div>
                <div className="col">
                  <TextField
                    defaultValue={state.Language}
                    select
                    fullWidth
                    size="small"
                    label="Select a Lanugage"
                    inputProps={register("Language", {
                      required: "Please Select a Language",
                    })}
                    error={errors.Language}
                    InputLabelProps={{ style: { fontSize: "13px" } }}
                    InputProps={{ style: { fontSize: "13px" } }}
                  >
                    <MenuItem value="English">English</MenuItem>

                    <MenuItem value="Spanish">Spanish</MenuItem>
                  </TextField>
                  <div className=" validationerror row text-danger p-auto m-auto  ">
                    {errors.Language?.type === "required" &&
                      "  Please Choose a language"}
                  </div>
                </div>
              </div>
            </div>

            <div className="row p-2 ">
              <div className="col-3"></div>
              <div className="col">
                {" "}
                <Button className=" " type="primary" htmlType="submit">
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

export default Step1;
