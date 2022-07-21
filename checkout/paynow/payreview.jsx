import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";

export default function Payreview() {
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
  return (
    <div className="col">
      <div className="greenbg row m-0 w-100 px-2 py-2 roundstart">
        <div className="col fs-5 fw-bold"> Make A Payment</div>
        <div className="col-1 ">
          <div className="border-0">
            <i class="bi bi-x-circle"></i>
          </div>
        </div>
      </div>
      <div className="row text-dark fs-6 px-5 py-3">
        <div>
          Welcome to our payment center. Make a one-time payment by clicking the{" "}
          <span className="fw-bold">PAY NOW </span>button.
        </div>
      </div>
      <div className="row"></div>
      <div className="row text-dark ">
        <div className="col">
          <div className="container w-50">
            <label className="Package shadow-lg " htmlFor={state.id}>
              <div
                className="w-100 px-5 py-2 text-white fw-bold"
                style={{
                  backgroundColor: "#82cf95",
                  borderRadius: "20px 20px 0px 0px",
                  letterSpacing: "2px",
                }}
              >
                MONTHLY PLAN
              </div>
              {state.title}

              <div style={{ fontSize: "60px" }}>
                {state.price}
                <sup className="fs-1">.99</sup>
                <span className="fs-6">/MO </span>
              </div>
            </label>
          </div> <form style={{maxWidth:'none'}} className="w-100 pt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="container  text-wh w-50 shadow rounded-5 p-4 fs-6 text-center">
          <div className=" greentxt fw-bold"> Automatically Bill My Account</div>
            <input
              hidden
              {...register("Recurring", { required: true })}
              type="radio"
              value="Yes"
              id="RecurringY"
            />
            <label className="Package greenborder shadow " htmlFor="RecurringY">
              Yes
            </label>
            <input
              hidden
              {...register("Recurring", { required: true })}
              type="radio"
              value="No"
              id="RecurringN"
            />
            <label className="Package greenborder shadow " htmlFor="RecurringN">
              No
            </label>
          </div>
          <div className="text-danger lead fs-6 text-center p-3">
              {errors.Recurring?.type === "required" &&
                "⚠ Please Choose A Package"}
            </div>
          <div className="pb-5 ">
            <button
              type="submit"
              className="btn editplanbtn rounded-pill w-75 m-auto d-block py-3 "
            >
              Pay Now
            </button>
            <button
              onClick={() => Navigate("/")}
              className="btn editplanbtn rounded-pill w-25 m-auto d-block mt-2"
            >
              {" "}
              Cancel
            </button>
          </div></form>
        </div>
      </div>
    </div>
  );
}
