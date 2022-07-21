import React, { useState, useEffect,useRef } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { useNavigate } from "react-router-dom";

function Step4() {
  const isFirstRender = useRef(true)
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Packages: [{}],
      PlanCode: "",
      select: "",
      MembershipType: "",
    },
  });
  const selectValue = watch("select");
  const { actions, state } = useStateMachine({ updateAction });
  const [displaystatus, setDisplaystatus] = useState(false);
  const [maintablestatus, setmaintablestatus] = useState("none");

  useEffect(() => {
    register("select", { required: true });
  }, [register]);
  const handleSelect = (e) => {
    setValue("select", e.target.value, true);
  };
  const Displaydata = () => {
    return (
      <div className="row bg-light">
        <div className="col-1  p-3">{state.PackageTitle}</div>
        <div className="col ">
          {state.Packages.map((item, index) => {
            return (
              <div className="row" key={item.MinMembers}>
                <div className="col p-2 border">{item.MinMembers}</div>
                <div className="col p-2 border">{item.MaxMembers}</div>
                <div className="col p-2 border">{item.WholsaleYearlyPrice}</div>
                <div className="col p-2 border">{item.RetailYearlyPrice}</div>
                <div className="col p-2 border">
                  {item.RetailYearlyPrice - item.WholsaleYearlyPrice}
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-1  p-3"> Yearly</div>
        <div className="col-1 border-start border-end p-3">
          <button
            className="btn border-0"
            onClick={() => handleDeletepackage()}
          >
            
            <i class="bi bi-trash3 text-danger fs-4   align-middle"></i>
          </button>
        </div>
      </div>
    );
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Packages",name:"mainpackages"
  });
  const [arr, setArr] = useState([]);
  const OnSubmit = (data) => {
    actions.updateAction(data);
    setmaintablestatus("block");
    setDisplaystatus(true);
  };
  const dataupdate =()=>{
    state.packagesalldata=arr
    console.log(state.packagesalldata)
  }
  const [Maxdisplay, setMaxdisplay] = useState("none");
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return;
    }
    dataupdate() 
  }, [arr])
  const handleCreateNewItem = (event) => {
    console.log(event.target.value);
    setMaxdisplay(event.target.value === "family" ? "flex" : "none");
  };
  const handleDeletepackage = () => {
    setDisplaystatus(false);
    setmaintablestatus("none");
  };
  const navigate = useNavigate();

  return (
    <div>
      <div className="shadow-sm">
        <div style={{ fontSize: "12px" }} className="p-2 pb-1">
          <span className="fw-light">Home / Office Management</span>
          <span className="text-dark "> / Add New Office / Step4</span>
        </div>
        <div className="p-2">
          <h6 className="fw-bold">Add Office</h6>
          <div style={{ fontSize: "13px" }} className="fw-light">
            Register a new Office using the following form
          </div>
        </div>
      </div>


      <form className="w-75 p-5" onSubmit={handleSubmit(OnSubmit)}>
        <div>
          <div className="row p-2">
            <div className="col-3 p-0">
              <label
                htmlFor="PackageTitle"
                className=" align-middle text-end fs-6 "
              >
                <span className="text-danger fw-bold fs-5">*</span> Package
                Title:
              </label>
            </div>
            <div className="col">
              <TextField
                error={!!errors.PackageTitle}
                {...register("PackageTitle", {
                  required: true,
                  maxLength: 100,
                })}
                className=" me-3"
                label="Package Title"
                id="PackageTitle"
                placeholder="Enter Package Title"
                fullWidth
                size="small"
              />
              <div className=" row text-danger p-auto m-auto ">
                {errors.PackageTitle?.type === "required" &&
                  " ⚠ Please enter Package Title"}
              </div>
            </div>
          </div>

          <div className="row p-2">
            <div className="col-3 p-0">
              <label
                htmlFor="PlanCode"
                className=" align-middle text-end fs-6 "
              >
                <span className="text-danger fw-bold fs-5">*</span> Plan Code:
              </label>
            </div>
            <div className="col">
              <FormControl fullWidth size="small">
                <InputLabel error={!!errors.select} id="PlanCode">
                  Plan Code
                </InputLabel>
                <Select
                  defaultValue=""
                  value={selectValue}
                  onChange={handleSelect}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <div className=" row text-danger p-auto m-auto ">
                {errors.select?.type === "required" &&
                  " ⚠ Please Select Plan Code"}
              </div>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-3 p-0">
              <label
                htmlFor="PlanCode"
                className=" align-middle text-end fs-6 "
              >
                <span className="text-danger fw-bold fs-5">*</span> Membership
                Type:
              </label>
            </div>
            <div className="col">
              <FormControl component="fieldset">
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="MembershipType"
                  defaultValue={state.MembershipType}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="individual"
                        control={<Radio />}
                        label="Individual"
                        onChange={handleCreateNewItem}
                      />
                      <FormControlLabel
                        value="family"
                        control={<Radio />}
                        label="Family"
                        onChange={handleCreateNewItem}
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
              <div className=" row text-danger p-auto m-auto ">
                {errors.MembershipType?.type === "required" &&
                  " ⚠ Please Select Membership Type"}
              </div>
            </div>
          </div>
          <div style={{ display: `${Maxdisplay}` }} className="row p-2">
            <div className="col-3 p-0">
              <label htmlFor="" className=" align-middle text-end fs-6 ">
                <span className="text-danger fw-bold fs-5">*</span> Max
                Dependents:
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
                size="small"
              />
              <div className=" row text-danger p-auto m-auto ">
                {errors.MaxDependents?.type === "required" &&
                  " ⚠ Please enter Package Title"}
                {errors.MaxDependents?.type === "max" &&
                  " ⚠ Maximum Value is 6"}
                {errors.MaxDependents?.type === "min" &&
                  " ⚠ Minimum Value is 1"}
              </div>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-3 p-0">
              <label
                htmlFor="PlanCode"
                className=" align-middle text-end fs-6 "
              >
                <span className="text-danger fw-bold fs-5">*</span> Package:
              </label>
            </div>
          </div>
          <div>
            {" "}
            {fields.map((item, index) => {
              return (
                <div key={item.id}>
                  <div className="row">
                    <span className="col p-3">Tier #{index + 1}</span>{" "}
                    <span className="col">
                      {" "}
                      {index === 0 ? null : (
                        <button
                          type="button"
                          className="btn border-0 text-danger fs-4 float-end me-4 "
                          onClick={() => remove(index)}
                        >
                          <i class="bi bi-trash3"></i>
                        </button>
                      )}
                    </span>
                  </div>
                  <div className="col">
                    <div className="row p-2">
                      <div className="col">
                        <TextField
                          fullWidth
                          size="small"
                          error={errors.Packages?.[index]?.MinMembers}
                          type="number"
                          label="* Minimun Members"
                          variant="outlined"
                          placeholder="Min members"
                          {...register(`Packages.${index}.MinMembers`, {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="col">
                        <TextField
                          fullWidth
                          size="small"
                          error={errors.Packages?.[index]?.MaxMembers}
                          type="number"
                          label="* Maximum Members"
                          variant="outlined"
                          placeholder="Min members"
                          {...register(`Packages.${index}.MaxMembers`, {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                    <div className="errors row">
                      <div className=" col text-danger p-auto m-auto ">
                        {errors.Packages?.[index]?.MinMembers?.type ===
                          "required" && " ⚠ Please enter Min members"}
                      </div>
                      <div className=" col text-danger p-auto m-auto ">
                        {errors.Packages?.[index]?.MaxMembers?.type ===
                          "required" && " ⚠ Please enter max menmber"}
                      </div>
                    </div>
                    <div className="row p-2">
                      <div className="col">
                        <TextField
                          fullWidth
                          size="small"
                          error={errors.Packages?.[index]?.WholsaleYearlyPrice}
                          type="number"
                          label="* Wholsale Yearly Price"
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <h1></h1>$
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Wholsale Yearly Price"
                          {...register(
                            `Packages.${index}.WholsaleYearlyPrice`,
                            {
                              required: true,
                            }
                          )}
                        />
                      </div>
                      <div className="col">
                        <TextField
                          fullWidth
                          size="small"
                          error={errors.Packages?.[index]?.RetailYearlyPrice}
                          type="number"
                          label="* Retail Yearly Price"
                          variant="outlined"
                          placeholder="RetailYearlyPrice"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <h1></h1>$
                              </InputAdornment>
                            ),
                          }}
                          {...register(`Packages.${index}.RetailYearlyPrice`, {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                    <div className="errors row">
                      <div className=" col text-danger p-auto m-auto ">
                        {errors.Packages?.[index]?.WholsaleYearlyPrice?.type ===
                          "required" &&
                          " ⚠ Please enter Wholesale Yearly Price"}
                      </div>
                      <div className=" col text-danger p-auto m-auto ">
                        {errors.Packages?.[index]?.RetailYearlyPrice?.type ===
                          "required" && " ⚠ Please enter Retail Yearly Price"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <section className="py-4">
          <button
            className="btn border w-100 "
            type="button"
            onClick={() => {
              const lol = 1;
              append({
                MinMembers: lol + parseInt(getValues("Packages.0.MaxMembers")),
              });
            }}
          >
            <i class="bi bi-plus fs-1 align-middle"></i>{" "}
            <span className="align-middle">Add Another Group Package</span>
          </button>
        </section>

        <input type="submit" value="Add All Packages" />
      </form>

      <div
        className=""
        style={{ display: `${maintablestatus}`, fontSize: "12px" }}
      >
        <div className="col p-5">
          <div className="row bg-light">
            <div className="col-1 border p-3">Title</div>
            <div className="col border p-3">Members & Prices</div>
            <div className="col-1 border p-3">P.T</div>
            <div className="col-1 border p-3">Actions</div>
          </div>
          <div className="row bg-light">
            <div className="col-1  p-3"></div>
            <div className="col ">
              <div className="row">
                <div className="col border p-3">Min</div>
                <div className="col border p-3">Max</div>
                <div className="col border p-3">W.p</div>
                <div className="col border p-3">R.p</div>
                <div className="col border p-3">COM</div>
              </div>
            </div>
            <div className="col-1  p-3"> </div>
            <div className="col-1 border-start border-end p-3"></div>
          </div>
          {displaystatus ? <Displaydata /> : null}
        </div>
      </div>
      <input
        type="button"
        className="w-25 "
        onClick={() => {
          navigate("/office/addoffice/step3");
        }}
        value="Back"
      />
      <input
        type="button"
        className="w-25  float-end"
        onClick={() => {
          navigate("/office/addoffice/results");
        }}
        value="Next Step"
      />
      <input
        type="button"
        className="w-25  float-end"
        onClick={() => {
          console.log(state.packagesalldata);
        }}
        value="Next Sawdtep"
      />
    </div>
  );
}

export default Step4;
