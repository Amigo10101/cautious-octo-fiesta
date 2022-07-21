import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button, InputNumber, Result, Steps } from "antd";
import useToken from "../../../../../../useToken";
import { Checkbox, InputAdornment } from "@mui/material";
import Search from "antd/lib/input/Search";
import { Packages } from "../../../../../../packagescontext";
const { Step } = Steps;

const Step3 = (props) => {
  console.log(props.active);
  const { actions, state } = useStateMachine({ updateAction });
  const { token, setToken } = useToken();
  const [officeid, setofficeid] = useState(sessionStorage.getItem("affoffice"));
  const [selectedyprice, setselectedprice] = useState(state.yearlyprice);
  const [selectedmprice, setmonthlyprice] = useState(state.monthlyprice);
  const packages = useContext(Packages);
  const [packageprice, setpackageprice] = useState([]);
  const [packageidprice, setpackageidprice] = useState([]);
  const [disabledform, setdisabled] = useState();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    resetField,
    reset,
    formState: { errors },
  } = useForm({});

  const Navigate = useNavigate();
  const onSubmit = (data) => {
    actions.updateAction(data);
    Navigate("/dashboard/member/registeredmembers/results");
  };
  const packagesetterradio = (event) => {
    let paymentmode = event.target.value;
    {
      paymentmode === "Monthly"
        ? setValue("Price", selectedmprice)
        : setValue("Price", selectedyprice);
    }
  };
  const packagesetterselect = (event) => {
    const packageselectid = event.target.value;

    reset({
      Price: " ",
      paymentTerms: "",
    });
    console.log("awdawd");
    resetField("packageTerms");
    packages.map((option) => {
      const ifidtrue = () => {
        state.monthlyprice = option.mprice;
        state.yearlyprice = option.yprice;
        setselectedprice(option.yprice);
        setmonthlyprice(option.mprice);
      };
      {
        option.id === packageselectid ? ifidtrue() : console.log();
      }
    });
  };

  return (
    <div>
      
      <div className=" bgrey">
        <div className="bg-white">
          <div className="container py-5 w-75">
            <Steps current={2}>
              <Step title="Personal Info" />
              <Step title="Contact Detail" />
              <Step title="Package Info" />
              <Step title="Payment & Review" />
            </Steps>
          </div>
          <Result className={props.active?"":"d-none"}
    status="success"
    title="This Member has an Active Plan"
    subTitle="Current Membership cannot be Edited without Terminationg the active membership."
    extra={[
      <div
      style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
      className="px-2 container  "
    >
      <div className="fs-5 fw-bold ps-3">Package Detail</div>
      <div className="ps-3">
        <div className="">Package ID: {state.Package}</div>
        <div className="">Plan Interval: {state.paymentTerms}</div>
        <div className="">Recurring Payment : {state.Recurring?"True":"False"}</div>
        <div className="">Price: {state.Price}</div>
      </div>
    </div>
    ]}
  />
         
          <form
            className="w-50 py-2 pe-5 d-block m-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={props.active?"d-none":""}>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="PhoneNumber"
                  className=" align-middle text-end fs6 "
                >
                  <span className="fw-bold fs-5 text-danger">*</span> Select
                  Package:
                </label>
              </div>
              <div className="col-8">
                <TextField
                  defaultValue={state.Package}
                  disabled={disabledform}
                  select
                  fullWidth
                  size="small"
                  label="Select a Package"
                  inputProps={register("Package", {
                    required: "Please Select A Package",
                  })}
                  error={errors.Package}
                  onChange={packagesetterselect}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                >
                  {packages.map((option, index) => {
                    return (
                      <MenuItem key={option.id} value={option.id}>
                        <div style={{ opacity: "90%", fontSize: 13 }}>
                          [ ${option.yprice} ] {option.name} | Type:{" "}
                          {option.max_dependents === 1
                            ? "Individual "
                            : "Family"}
                          | {option.plan}{" "}
                        </div>
                      </MenuItem>
                    );
                  })}
                </TextField>
                <div className=" validationerror row text-danger pt-2 p-auto m-auto ">
                  {errors.Package?.type === "required" &&
                    "  Please Select a Package"}
                </div>
              </div>
            </div>

            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="MobileNumber"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger fw-bold fs-5">*</span> Payment
                  Terms:
                </label>
              </div>
              <div className="col">
                <FormControl component="fieldset">
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    name="paymentTerms"
                    defaultValue={state.paymentTerms}
                    render={({ field }) => (
                      <RadioGroup row {...field}>
                        <FormControlLabel
                          disabled={disabledform}
                          value="Yearly"
                          control={<Radio />}
                          label="Yearly"
                          onChange={packagesetterradio}
                        />
                        <FormControlLabel
                          value="Monthly"
                          disabled={disabledform}
                          control={<Radio />}
                          label="Monthly"
                          onChange={packagesetterradio}
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
                <div className=" validationerror row text-danger p-auto m-auto ">
                  {errors.paymentTerms?.type === "required" &&
                    "  Please Select A Payment term"}
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="recurring"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger fw-bold fs-5">*</span> Payment
                  Type:
                </label>
              </div>
              <div className="col ">
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={disabledform}
                      defaultValue={state.Recurring}
                      {...register("Recurring")}
                      type="checkbox"
                      value={true}
                      defaultChecked={state.Recurring}
                    />
                  }
                  label="Recurring"
                />
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="PhoneNumber"
                  className=" align-middle text-end fs6 "
                >
                  <span className="fw-bold fs-5 text-danger">*</span> Price:
                </label>
              </div>
              <div className="col pt-1">
                <InputNumber
                  disabled={disabledform}
                  value={state.Price}
                  {...register("Price")}
                  status={errors.Package ? "error" : null}
                  addonBefore={"$"}
                  readOnly
                />
                <div className=" validationerror row text-danger p-auto m-auto ">
                  {errors.Package?.type === "required" &&
                    "  Please Select A Package"}
                </div>
              </div>
            </div></div>
            <div className="row pt-4 p-2">
              <div className="col-3"></div>
              <div className="col">
                <Button
                  onClick={() => {
                    Navigate("/dashboard/member/registeredmembers/step2");
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
