import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import "./step2.module.css";

const Step2 = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { actions, state } = useStateMachine({ updateAction });
  const Navigate = useNavigate();
  const onSubmit = (data) => {
    actions.updateAction(data);
    Navigate("/results");
  };

  return (
    <div style={{ background: "white" }}>
      <form className="pt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className=" stepsbg row text-start fs-5 py-3 text-center m-0 ">
          <span className="col p-0 fs-5 ps-3 text-start p-e-1 "><i class="bi bi-check-circle-fill"></i></span>
          <span className="col-8 p-0 fs-6 text-center ">
            <span className="text-center fs-5">
              Package:
              <span className="fw-light fs-6">
                {" "}
                {state.title} {state.price}
              </span>
            </span>
          </span>
          <span className="col-2 p-0 pe-3">
            <button
              style={{ fontSize: "10px", padding: "6px" }}
              onClick={() => Navigate("/")}
              className="editplanbtn float-end border-white rounded-pill m-0"
            >
              Edit Plan
            </button>
          </span>
        </div>

        <div
          style={{ borderRadius: "0px" }}
          className=" stepsbg row fs-5 m-0 pb-2 pt-1 text-center"
        >
          <strong className="col pt-2 p-0 text-start ps-3">2</strong>
          <div className="col-8  ">
            <div className="border border-white mb-2 "></div>Constumeer
            Information
          </div>
          <div className="col text-end"></div>
        </div>
        <div className="container bg-light p-5 pt-3">
          <div className="row ps-3">
            <div className="col">
              <div className="row w-100">
                <label htmlFor="genderselect">Gender:</label>
                <select
                  className="rounded-5"
                  id="genderselect"
                  {...register("Gender", { required: true })}
                  defaultValue={state.Gender}
                >
                  <option disabled selected value="">
                    Select one
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className=" row text-danger  ">
                {errors.Gender?.type === "required" &&
                  " ⚠ Please Choose a Gender"}
              </div>
            </div>
            <div className="col">
              <div className="row w-100">
                <label htmlFor="dob">Date Of Birth:</label>
                <input
                  type="date"
                  placeholder="Date Of birth"
                  id="dob"
                  {...register("Dob", { required: true })}
                  defaultValue={state.Dob}
                />
              </div>

              <div className=" row text-danger  d-inline">
                {errors.Dob?.type === "required" && " ⚠ Please Enter Your Dob"}
              </div>
            </div>
          </div>
          <div className="row ps-3">
            <div className="col">
              <div className="row w-100">
                <label htmlFor="fname">First Name:</label>
                <input
                  type="text"
                  placeholder="First name"
                  id="fname"
                  {...register("Firstname", { required: true, maxLength: 80 })}
                  defaultValue={state.Firstname}
                />
              </div>
              <div className=" row text-danger  ">
                {errors.Firstname?.type === "required" &&
                  " ⚠ Please enter First Name"}
              </div>
            </div>
            <div className="col">
              <div className="row w-100">
                <label htmlFor="lname">Last Name:</label>
                <input
                  id="lname"
                  type="text"
                  placeholder="Last name"
                  {...register("Lastname", { required: true, maxLength: 100 })}
                  defaultValue={state.Lastname}
                />
              </div>

              <div className=" row text-danger  d-inline ">
                {errors.Lastname?.type === "required" &&
                  " ⚠ Please enter Last Name"}
              </div>
            </div>
          </div>
          <div className="row  ps-3">
            <div className="col">
              <div className="row w-100">
                <label htmlFor="addrs">Address:</label>
                <input
                  type="text"
                  id="addrs"
                  placeholder="Address"
                  {...register("Address", { required: true, maxLength: 80 })}
                  defaultValue={state.Address}
                />
              </div>
              <div className=" row text-danger  ">
                {errors.Address?.type === "required" &&
                  " ⚠ Please enter Address"}
              </div>
            </div>
            <div className="col">
              <div className="row w-100">
                <label htmlFor="zip">Zip:</label>
                <input
                  id="zip"
                  type="text"
                  placeholder="Last name"
                  {...register("Zip", {
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                  })}
                  defaultValue={state.Zip}
                />
              </div>

              <div className=" row text-danger  d-inline ">
                {errors.Zip?.type === "required" &&
                  " ⚠ Please enter a zip code"}
                {errors.Zip?.type === "minLength" &&
                  " ⚠ Please enter a valid zip code"}
                {errors.Zip?.type === "maxLength" &&
                  " ⚠ Please enter a valid zip code"}
              </div>
            </div>
          </div>
          <div className="row  ps-3">
            <div className="col">
              <div className="row w-100">
                <label htmlFor="city">City:</label>
                <input
                  id="city"
                  type="text"
                  placeholder="City"
                  {...register("City", { required: true, maxLength: 80 })}
                  defaultValue={state.City}
                />
              </div>
              <div className=" row text-danger  ">
                {errors.City?.type === "required" &&
                  " ⚠ Please enter your City"}
              </div>
            </div>
            <div className="col">
              <div className="row w-100">
                <label htmlFor="state">State:</label>
                <input
                  id="state"
                  type="text"
                  placeholder="State"
                  {...register("State", { required: true, maxLength: 100 })}
                  defaultValue={state.State}
                />
              </div>

              <div className=" row text-danger  d-inline ">
                {errors.State?.type === "required" &&
                  " ⚠ Please enter your State "}
              </div>
            </div>
          </div>
          <div className="row  ps-3">
            <div className="col">
              <div className="row w-100">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="text"
                  placeholder="Example:  lol@lol.com"
                  {...register("Email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  defaultValue={state.Email}
                />
              </div>
              <div className=" row text-danger  ">
                {errors.Email?.type === "required" && (
                  <p> Please enter your email</p>
                )}
                {errors.Email?.type === "pattern" && (
                  <p> Please enter a valid email</p>
                )}
              </div>
            </div>
            <div className="col">
              <div className="row w-100">
                <label htmlFor="phoneno">Phone:</label>
                <input
                  id="phoneno"
                  type="number"
                  placeholder="Mobile number"
                  {...register("Mobileno", {
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                  })}
                  defaultValue={state.Mobileno}
                />
              </div>

              <div className=" row text-danger  d-inline ">
                {errors.Mobileno?.type === "required" &&
                  " ⚠ Please enter a valid Phone no "}
                {errors.Mobileno?.type === "minLength" &&
                  " ⚠ Please enter a valid Phone no "}
                {errors.Mobileno?.type === "maxLength" &&
                  " ⚠ Please enter a valid Phone no "}
              </div>
            </div>
          
          </div>
          <input className="mt-4 p-3" type="submit" />
        </div>
        <div
          style={{ borderRadius: "0px 0px 29px 29px" }}
          className="stepsbg fs-4  p-4 text-center"
        >
          <strong className="float-start">3</strong>
          Review Information
        </div>
      </form>
    </div>
  );
};

export default Step2;
