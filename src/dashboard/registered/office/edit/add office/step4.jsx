import React, { useState, useEffect } from "react";
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
import { Button, Steps } from "antd";
import { DeleteOutlined, DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
const { Step } = Steps;
function Step4() {
  const packagesetterselect = (event) => {
    console.log(event);
  };
  const [memberbtn, setmemberbtn] = useState(0);
  const [lol, setlol] = useState();
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      package_tiers: [{}],
      max_dependents: 1,
    },
  });
  const selectValue = watch("plan");
  const { actions, state } = useStateMachine({ updateAction });
  const [displaystatus, setDisplaystatus] = useState(false);
  const [maintablestatus, setmaintablestatus] = useState("none");

  const handleSelect = (e) => {
    setValue("plan", e.target.value, true);
  };

  const Displaydata = () => {
    return (
      <div className="tablehover">
        {arr.map((item, index) => {
          return (
            <div className="row  ">
              <div className="col-2 border">{arr[index].name}</div>
              <div className="col">
                {arr[index].package_tiers.map((item, index) => {
                  return (
                    <div className="row" key={item.min_members}>
                      <div className="col p-2 border">
                        <div className="py-2">{item.min_members}</div>
                      </div>
                      <div className="col p-2 border">
                        <div className="py-2">{item.max_members}</div>
                      </div>
                      <div className="col p-2 border">
                        <div className="py-2">{item.wholesale_price}</div>
                      </div>
                      <div className="col p-2 border">
                        <div className="py-2">{item.retail_price}</div>
                      </div>
                      <div className="col p-2 border">
                        <div className="py-2">
                          {item.retail_price - item.wholesale_price}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="col-1 border">Yearly</div>
              <div className="col-1 border text-center py-2">
                {" "}
                <span>
                  <DeleteTwoTone
                    twoToneColor="#eb2f96"
                    className="fs-5 align-middle text-danger"
                    onClick={() => {
                      handleDeletepackage(index);
                    }}
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "package_tiers",
  });
  const [arr, setArr] = useState([]);
  const OnSubmit = (data) => {
    setArr((arr) => arr.concat(data));
    state.firstrender = false;
    reset();
    setmaintablestatus("block");
    setDisplaystatus(true);
  };
  const updatedata = () => {
    state.packagesalldata = [arr];
    console.log(state.packagesalldata);
  };
  const [Maxdisplay, setMaxdisplay] = useState("none");
  useEffect(() => {
    setArr(state.packagesdisplaydata);
    {
      state.firstrender = false
        ? setmaintablestatus("block")
        : setmaintablestatus("none");
    }
  }, [lol]);
  const handleCreateNewItem = (event) => {
    setMaxdisplay(event.target.value === "family" ? "flex" : "none");
  };
  const handleDeletepackage = (index) => {
    {
      index = 0 ? (setDisplaystatus(false), setmaintablestatus("none")) : null;
    }

    setArr([...arr.slice(0, index), ...arr.slice(index + 1)]);
  };
  const Navigate = useNavigate();

  return (
    <div>
      <div className="container py-5 w-75">
        <Steps current={2}>
          <Step title="Office Info" />
    
          <Step title="Bank Info" />
          <Step title="Add Package" />
          <Step title="Review" />
        </Steps>
      </div>
      <form className="w-50  m-auto" onSubmit={handleSubmit(OnSubmit)}>
        <div>
          <div className="row p-2">
            <div className="col-3 p-0">
              <label htmlFor="name" className=" align-middle text-end fs6 ">
                <span className="text-danger fw-bold fs-5">*</span> Package
                Title:
              </label>
            </div>
            <div className="col">
              <TextField
                error={!!errors.name}
                {...register("name", {
                  required: true,
                  maxLength: 100,
                })}
                className=" me-3"
                label="Package Title"
                id="name"
                placeholder="Enter Package Title"
                fullWidth
                size="small"
                InputLabelProps={{ style: { fontSize: "13px" } }}
                InputProps={{ style: { fontSize: "13px" } }}
              />
              <div className=" row text-danger p-auto m-auto ">
                {errors.name?.type === "required" &&
                  "  Please enter Package Title"}
              </div>
            </div>
          </div>

          <div className="row p-2">
            <div className="col-3 p-0">
              <label htmlFor="plan" className=" align-middle text-end fs6 ">
                <span className="text-danger fw-bold fs-5">*</span> Plan Code:
              </label>
            </div>
            <div className="col">
              <FormControl fullWidth size="small">
                <InputLabel
                  style={{ fontSize: "13px" }}
                  error={!!errors.plan}
                  id="plan"
                >
                  Plan Code
                </InputLabel>
                <Select
                  defaultValue=""
                  inputProps={register("plan", {
                    required: "Please Select A plan",
                  })}
                  value={selectValue}
                  onChange={handleSelect}
                  label="Plan Code "
                >
                  <MenuItem value={"Urgent Care"}>Urgent Care</MenuItem>
                  <MenuItem value={"Behavioral Health"}>
                    Behavioral Health
                  </MenuItem>
                  <MenuItem value={"UC & BH Bundle"}>UC & BH Bundle</MenuItem>
                  <MenuItem value={"Medical Bundle"}>Medical Bundle</MenuItem>
                  <MenuItem value={"Total Telehealth"}>
                    Total Telehealth
                  </MenuItem>
                </Select>
              </FormControl>

              <div className=" row text-danger p-auto m-auto ">
                {errors.plan?.type === "required" &&
                  "  Please Select Plan Code"}
              </div>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-3 p-0">
              <label htmlFor="plan" className=" align-middle text-end fs6 ">
                <span className="text-danger fw-bold fs-5">*</span> Membership
                Type:
              </label>
            </div>
            <div className="col">
              <FormControl
                InputLabelProps={{ style: { fontSize: "13px" } }}
                InputProps={{ style: { fontSize: "13px" } }}
                component="fieldset"
              >
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="MembershipType"
                  defaultValue={state.MembershipType}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        className="fw-bold"
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
                  "  Please Select Membership Type"}
              </div>
            </div>
          </div>
          <div style={{ display: `${Maxdisplay}` }} className="row p-2">
            <div className="col-3 p-0">
              <label htmlFor="" className=" align-middle text-end fs6 ">
                <span className="text-danger fw-bold fs-5">*</span> Max
                Dependents:
              </label>
            </div>
            <div className="col">
              <TextField
                error={!!errors.max_dependents}
                {...register("max_dependents", {
                  maxLength: 1,
                  max: 6,
                  min: 1,
                })}
                className=" me-3"
                label="Max Dependents"
                id="max_dependents"
                placeholder="Enter the No of Dependents"
                fullWidth
                size="small"
                InputLabelProps={{ style: { fontSize: "13px" } }}
                InputProps={{ style: { fontSize: "13px" } }}
              />
              <div className=" row text-danger p-auto m-auto ">
                {errors.max_dependents?.type === "required" &&
                  "  Please enter Package Title"}
                {errors.max_dependents?.type === "max" &&
                  "  Maximum Value is 6"}
                {errors.max_dependents?.type === "min" &&
                  "  Minimum Value is 1"}
              </div>
            </div>
          </div>

          <div>
            {" "}
            {fields.map((item, index) => {
              let wholesalevalue = 0;
              let packagename =
                `package_tiers.` + `${index}` + `.wholesale_price`;
              wholesalevalue = getValues(packagename);
              console.log(wholesalevalue);
              return (
                <div key={item.id}>
                  <div className="row">
                    <span className="col p-3">Tier #{index + 1}</span>{" "}
                    <span className="col">
                      {" "}
                      {index === 0 ? null : (
                        <button
                          type="button"
                          className="btn border-0 text-danger fs-5 float-end  "
                          onClick={() => {
                            remove(index);
                            setmemberbtn(memberbtn - 1);
                          }}
                        >
                          <DeleteOutlined />
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
                          error={errors.package_tiers?.[index]?.min_members}
                          type="number"
                          label="* Minimun Members"
                          variant="outlined"
                          placeholder="Min members"
                          {...register(`package_tiers.${index}.min_members`, {
                            required: true,
                          })}
                          InputLabelProps={{ style: { fontSize: "13px" } }}
                          InputProps={{ style: { fontSize: "13px" } }}
                        />
                      </div>
                      <div className="col">
                        <TextField
                          fullWidth
                          size="small"
                          error={errors.package_tiers?.[index]?.max_members}
                          type="number"
                          label="* Maximum Members"
                          variant="outlined"
                          placeholder="Max members"
                          {...register(`package_tiers.${index}.max_members`, {
                            required: true,
                          })}
                          InputLabelProps={{ style: { fontSize: "13px" } }}
                          InputProps={{ style: { fontSize: "13px" } }}
                        />
                      </div>
                    </div>
                    <div className="errors row">
                      <div className=" col text-danger p-auto m-auto ">
                        {errors.package_tiers?.[index]?.min_members?.type ===
                          "required" && "  Please enter Min members"}
                      </div>
                      <div className=" col text-danger p-auto m-auto ">
                        {errors.package_tiers?.[index]?.max_members?.type ===
                          "required" && "  Please enter max menmber"}
                      </div>
                    </div>
                    <div className="row p-2">
                      <div className="col">
                        <TextField
                          fullWidth
                          size="small"
                          error={errors.package_tiers?.[index]?.wholesale_price}
                          type="number"
                          label="*Yearly Wholsale Price"
                          variant="outlined"
                          onChange={packagesetterselect}
                          InputProps={{
                            style: { fontSize: "13px" },
                            maxLength: 5,
                            startAdornment: (
                              <InputAdornment position="start">
                                <h1></h1>$
                              </InputAdornment>
                            ),
                          }}
                          InputLabelProps={{ style: { fontSize: "13px" } }}
                          placeholder="Yearly Wholsale Price"
                          {...register(
                            `package_tiers.${index}.wholesale_price`,
                            {
                              required: true,

                              maxLength: 3,
                            }
                          )}
                        />
                      </div>
                      <div className="col">
                        <TextField
                          fullWidth
                          size="small"
                          error={errors.package_tiers?.[index]?.retail_price}
                          type="number"
                          step="0.01"
                          label="* Yearly Retail  Price"
                          variant="outlined"
                          placeholder="Yearly Retail Price"
                          InputProps={{
                            style: { fontSize: "13px" },
                            maxLength: 3,

                            startAdornment: (
                              <InputAdornment position="start">
                                <h1></h1>$
                              </InputAdornment>
                            ),
                          }}
                          InputLabelProps={{ style: { fontSize: "13px" } }}
                          {...register(`package_tiers.${index}.retail_price`, {
                            required: true,
                            min: wholesalevalue,
                            maxLength: 3,
                          })}
                        />
                      </div>
                    </div>
                    <div className="errors row">
                      <div className=" col text-danger p-auto m-auto ">
                        {errors.package_tiers?.[index]?.wholesale_price
                          ?.type === "required" &&
                          "  Please enter Wholesale Yearly Price"}
                        {errors.package_tiers?.[index]?.wholesale_price
                          ?.type === "maxLength" && " Max value is 999"}
                      </div>
                      <div className=" col text-danger p-auto m-auto ">
                        {errors.package_tiers?.[index]?.retail_price?.type ===
                          "required" && "  Please enter Retail Yearly Price"}
                        {errors.package_tiers?.[index]?.retail_price?.type ===
                          "min" &&
                          "Retail Price has to be greater than Wholsale Price"}
                        {errors.package_tiers?.[index]?.retail_price?.type ===
                          "maxLength" && " Max value is 999 "}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <section className="py-4">
          <Button
            style={{ width: "100%" }}
            type="dashed"
            onClick={() => {
              const lol = 1;
              setmemberbtn(memberbtn + 1);
              let value = "package_tiers." + `${memberbtn}` + ".max_members";

              append({
                min_members: lol + parseInt(getValues(value)),
              });
            }}
          >
            <PlusOutlined className="align-middle" />
            <span className="align-middle">Add group Package Price</span>
          </Button>
        </section>
        <div className="row py-4">
          {" "}
          <div className="col-3"></div>
          <div className="col">
            <Button htmlType="submit" type="primary">
              Add Package
            </Button>
          </div>
        </div>{" "}
      </form>

      <div className="" style={{ fontSize: "12px" }}>
        <div className="col p-5">
          <div className="row bg-light">
            <div className="col-2 border p-3">Title</div>
            <div className="col ">
              <div className="row">
                <div className="col border p-3">Min</div>
                <div className="col border p-3">Max</div>
                <div className="col border p-3">W.p</div>
                <div className="col border p-3">R.p</div>
                <div className="col border p-3">COM</div>
              </div>
            </div>
            <div className="col-1 border p-3">P.T</div>
            <div className="col-1 border p-3">Actions</div>
          </div>

          <Displaydata />
        </div>
      </div>
      <div className="row pb-4 ps-5 ">
        <div className="col-4"></div>
        <div className="col">
          <Button
            onClick={() => {
              Navigate("/dashboard/office/registeredoffices/step3");
            }}
          >
            Back
          </Button>
          <Button
            className="ms-2"
            type="primary"
            onClick={() => {
              Navigate("/dashboard/office/registeredoffices/results");
              state.packagesdisplaydata = arr;
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Step4;
