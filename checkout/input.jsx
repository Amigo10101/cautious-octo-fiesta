import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
export const Inputada = () => {
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
    <div className="col">
              <div className="row w-100">
                <label htmlFor="phoneno1">Phone:</label>
                <input
                  id="phoneno1"
                  type="number"
                  placeholder="Mobilegfgf number"
                  {...register("Mobawdadileno", {
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
  )
}
