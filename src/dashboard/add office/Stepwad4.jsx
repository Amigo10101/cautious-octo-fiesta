import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Mainaddpackage from "./addpackage/main";

const Step4 = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { actions, state } = useStateMachine({ updateAction });
  const Navigate = useNavigate();
  const onSubmit = (data) => {
    actions.updateAction(data);
  };
  const [Maxdisplay, setMaxdisplay] = useState("none");

  const handleCreateNewItem = event => {
  
    setMaxdisplay(event.target.value === "Family" ? "flex" : "none");
  };

  return (
    <form
      className="w-50 py-5 d-block m-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Add Package </h1>
      <div className="row p-2">
        <div className="col-3 p-0">
          <label
            htmlFor="PackageTitle"
            className=" align-middle text-end fs-5 "
          >
            <span className="text-danger">*</span> Package Title:
          </label>
        </div>
        <div className="col">
          <TextField
            error={!!errors.PackageTitle}
            {...register("PackageTitle", { required: true, maxLength: 100 })}
            className=" me-3"
            label="Package Title"
            id="PackageTitle"
            placeholder="Enter Package Title"
            fullWidth
            defaultValue={state.PackageTitle}
          />
          <div className=" row text-danger p-auto m-auto ">
            {errors.PackageTitle?.type === "required" &&
              " ⚠ Please enter Package Title"}
          </div>
        </div>
      </div>

      <div className="row p-2">
        <div className="col-3 p-0">
          <label htmlFor="PlanCode" className=" align-middle text-end fs-5 ">
            <span className="text-danger">*</span> Plan Code:
          </label>
        </div>
        <div className="col">
          <FormControl fullWidth>
            <InputLabel error={!!errors.PlanCode} id="PlanCode">
              Plan Code
            </InputLabel>
            <Select
              labelId="PlanCode"
              id="PlanCode"
              {...register("PlanCode", { required: true })}
              label="Plan Code"
              error={!!errors.PlanCode}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <div className=" row text-danger p-auto m-auto ">
            {errors.PlanCode?.type === "required" &&
              " ⚠ Please Select Plan Code"}
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-3 p-0">
          <label htmlFor="PlanCode" className=" align-middle text-end fs-5 ">
            <span className="text-danger">*</span> Membership Type:
          </label>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup onChange={handleCreateNewItem} className="" row>
              <FormControlLabel
                {...register("MembershipType")}
                value="Individual"
                control={<Radio />}
                label="Individual"
              />
              <FormControlLabel
                {...register("MembershipType")}
                value="Family"
                control={<Radio />}
                label="Family"
              />
            </RadioGroup>
          </FormControl>
          <div className=" row text-danger p-auto m-auto ">
            {errors.MembershipType?.type === "required" &&
              " ⚠ Please Select Membership Type"}
          </div>
        </div>
      </div>
      <div style={{display:`${Maxdisplay}`}} className="row p-2">
        <div className="col-3 p-0">
          <label htmlFor="PlanCode" className=" align-middle text-end fs-5 ">
            <span className="text-danger">*</span> Max Dependents:
          </label>
        </div>
        <div className="col">
          <TextField
            error={!!errors.MaxDependents}
            {...register("MaxDependents", {
              
              maxLength: 1,
              max: 6,
              min: 1,
            })}
            className=" me-3"
            label="Max Dependents"
            id="MaxDependents"
            placeholder="Enter the No of Dependents"
            fullWidth
            defaultValue={state.MaxDependents}
          />
          <div className=" row text-danger p-auto m-auto ">
            {errors.MaxDependents?.type === "required" &&
              " ⚠ Please enter Package Title"}
            {errors.MaxDependents?.type === "max" && " ⚠ Maximum Value is 6"}
            {errors.MaxDependents?.type === "min" && " ⚠ Minimum Value is 1"}
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-3 p-0">
          <label htmlFor="PlanCode" className=" align-middle text-end fs-5 ">
            <span className="text-danger">*</span> Package:
          </label>
        </div>
        <div className="col">
         <div className="row">
           <div className="col">
           </div>
           <div className="col"></div>

         </div>
         <div className="row"><Mainaddpackage/></div>
        </div>
      </div>

      <div className="row">
        <input className="col " type="submit" />
      </div>
    </form>
  );
};

export default Step4;
