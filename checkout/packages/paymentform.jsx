import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";

const Paymentform = () => {

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
    <form className="" onSubmit={handleSubmit(onSubmit)}>
<div className="container bg-light rounded-5 pb-3 px-4 text-dark">
          <div className="row ps-3">
            <div className="col">
              <div className="row w-100">
                <label htmlFor="fname">Card Number:</label>
                <input
                  type="Number"
                  placeholder="Card Number"
                  id="fname"
                  {...register("CardNo", { required: true, maxLength: 12,minLength: 12 })}
                  defaultValue={state.CardNo}
                />
              </div>
              <div className=" row text-danger fs-6  ">
                {errors.CardNo?.type === "required" &&
                  " ⚠ Please enter a CardNo"}
                  {errors.CardNo?.type === "maxLength" &&
                  " ⚠ Please enter a valid Card Number"}
                  {errors.CardNo?.type === "minLength" &&
                  " ⚠ Please enter a valid Card Number"}
              </div>
            </div>
          </div>
          <div className="row  ps-3">
            <div className="col">
              <div className="row w-100">
                <label htmlFor="CEdate">Expiry Date:</label>
                <input
                  type="month"
                  id="CEdate"
                  min="2022-05"
                  placeholder="mm/yyyy:"
                  {...register("CEdate", { required: true, maxLength: 80 })}
                  defaultValue={state.CEdate}
                />
              </div>
              <div className=" row text-danger fs-6 ">
                {errors.CEdate?.type === "required" &&
                  " ⚠ Please enter Expiry Date"}
              </div>
            </div>
            <div className="col">
              <div className="row w-100">
                <label htmlFor="Scode">Security Number:</label>
                <input
                  id="Scode"
                  type="text"
                  placeholder="Security Code"
                  {...register("Scode", {
                    required: true,
                    minLength: 3,
                    maxLength: 3,
                  })}
                  defaultValue={state.Scode}
                />
              </div>

              <div className=" row text-danger fs-6  d-inline ">
                {errors.Scode?.type === "required" &&
                  " ⚠ Please enter a Security code"}
                {errors.Scode?.type === "minLength" &&
                  " ⚠ Please enter a valid Security code"}
                {errors.Scode?.type === "maxLength" &&
                  " ⚠ Please enter a valid Security code"}
              </div>
            </div>
          </div>
          <div className="row ps-3">
            <div className="col">
              <div className="row w-100">
                <label htmlFor="Cname">Name On Card:</label>
                <input
                  type="text"
                  placeholder="Name As it appears On your Card"
                  id="Cname"
                  {...register("Cname", { required: true, maxLength: 80 })}
                  defaultValue={state.Cname}
                />
              </div>
              <div className=" row text-danger  ">
                {errors.Cname?.type === "required" &&
                  " ⚠ Please enter your Name"}
              </div>
            </div>
            
          </div>
          <div className="row  ps-3">
            <div className="col">
              <div className="row w-100">
                <label htmlFor="baddrs">Billing Address:</label>
                <input
                  type="text"
                  id="baddrs"
                  placeholder="Address"
                  {...register("Cbaddress", { required: true, maxLength: 80 })}
                  defaultValue={state.Cbaddress}
                />
              </div>
              <div className=" row text-danger  ">
                {errors.Cbaddress?.type === "required" &&
                  " ⚠ Please enter Address"}
              </div>
            </div>
            </div>
            <div className="row ps-3">
            <div className="col">
              <div className="row w-100">
                <label htmlFor="czip">Zip:</label>
                <input
                  id="czip"
                  type="text"
                  placeholder="Last name"
                  {...register("cZip", {
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                  })}
                  defaultValue={state.cZip}
                />
              </div>

              <div className=" row text-danger  d-inline ">
                {errors.cZip?.type === "required" &&
                  " ⚠ Please enter a zip code"}
                {errors.cZip?.type === "minLength" &&
                  " ⚠ Please enter a valid zip code"}
                {errors.cZip?.type === "maxLength" &&
                  " ⚠ Please enter a valid zip code"}
              </div>
            </div>
          </div>
          <input className="mt-1" type="submit" />
          <button
          style={{letterSpacing:'4px',fontSize:'10px'}}
            className="btn editplanbtn m-auto  mt-2 px-3 rounded-pill "
            onClick={() => Navigate(-1)}
          >
            back
          </button>
        </div></form>

  )
}

export default Paymentform