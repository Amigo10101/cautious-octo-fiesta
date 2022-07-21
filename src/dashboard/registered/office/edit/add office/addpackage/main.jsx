import React, { useState,useEffect } from "react";
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
function Mainaddpackage() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Packages: [{}],
      PlanCode: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Packages",
  });
const [inputdatas,setinputdatas]=useState(
  

)
  const OnSubmit = (data) => {
console.log(data);
  };
  const [addcounter, setaddcounter] = useState(0);
  const [Maxdisplay, setMaxdisplay] = useState("none");

  const handleCreateNewItem = (event) => {
    setMaxdisplay(event.target.value === "Family" ? "flex" : "none");
  };

  {/*const content = state.map((post) => (
    <div> </div>
  ));*/}
  return (
    <div>
      <form className="p-5" onSubmit={handleSubmit(OnSubmit)}>
        <div>
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
                {...register("PackageTitle", {
                  required: true,
                  maxLength: 100,
                })}
                className=" me-3"
                label="Package Title"
                id="PackageTitle"
                placeholder="Enter Package Title"
                fullWidth
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
                className=" align-middle text-end fs-5 "
              >
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
              <label
                htmlFor="PlanCode"
                className=" align-middle text-end fs-5 "
              >
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
          <div style={{ display: `${Maxdisplay}` }} className="row p-2">
            <div className="col-3 p-0">
              <label
                htmlFor="PlanCode"
                className=" align-middle text-end fs-5 "
              >
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
                className=" align-middle text-end fs-5 "
              >
                <span className="text-danger">*</span> Package:
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
                          error={errors.Packages?.[index]?.WholsaleYearlyPrice}
                          type="number"
                          label="* Wholsale Yearly Price"
                          variant="outlined"
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
                          error={errors.Packages?.[index]?.RetailYearlyPrice}
                          type="number"
                          label="* Retail Yearly Price"
                          variant="outlined"
                          placeholder="RetailYearlyPrice"
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
              const lol = 0;
              append({ MinMembers: getValues("Packages.0.MaxMembers") });
            }}
          >
            <i class="bi bi-plus fs-1 align-middle"></i>{" "}
            <span className="align-middle">Add Another Package</span>
          </button>

          <button
            type="button"
            onClick={() =>
              reset({
                Packages: [{ MinMembers: "", lastName: "Luo" }],
              })
            }
          >
            reset
          </button>
        </section>

        <input type="submit" value="Add All Packages" />
      </form>

      <display>
        <div className="col p-5">
          <div className="row bg-light">
            <div className="col-1 border p-3">Title</div>
            <div className="col border p-3">Members & Prices</div>
            <div className="col-1 border p-3">P.T</div>
            <div className="col-1 border p-3">Actions</div>
          </div>
          <div className="row bg-light">
            <div className="col-1 border p-3"></div>
            <div className="col border">
              <div className="row">
                <div className="col border p-3">Min</div>
                <div className="col border p-3">Max</div>
                <div className="col border p-3">W.p</div>
                <div className="col border p-3">p.p</div>
                <div className="col border p-3">COM</div>
              </div>
            </div>
            <div className="col-1  p-3"></div>
            <div className="col-1 border p-3"></div>
          </div>
          <div className="row bg-light">
            <div className="col-1 border p-3"></div>
            <div className="col border">
              <div className="row">
                <div className="col border p-3">Min</div>
                <div className="col border p-3">Max</div>
                <div className="col border p-3">W.p</div>
                <div className="col border p-3">p.p</div>
                <div className="col border p-3">COM</div>
              </div>
            </div>
            <div className="col-1  p-3"></div>
            <div className="col-1 border p-3"></div>
          </div>
        </div>
      </display>
    </div>
  );
}

export default Mainaddpackage;
