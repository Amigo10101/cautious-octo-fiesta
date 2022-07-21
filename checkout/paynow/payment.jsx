import React from "react";
import Paymentform from "../packages/paymentform";
import { useStateMachine } from "little-state-machine";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const { state } = useStateMachine({});
const navigate=useNavigate()
  return (
    <div>
      <div className="greenbg row m-0 w-100 px-3 py-3 roundstart">
        <div className="col fs-5 fw-bold"> Make A Payment</div>
        <div className="col-1 ">
          <button className="border-0">
            <i class="bi bi-x-circle"></i>
          </button>
        </div>
      </div>
      <div className="row text-dark fs-6 bg-light mx-3 py-3">
        <div className="w-100 lead fs-6">
          Your first Payment of <strong className="fs-5 fw-bold">{state.price}</strong> will be charged today,{" "}
          {new Date().toLocaleDateString()}.{" "}
          <strong>
            You are buying <strong className="fs-5">{state.title}</strong> for{" "}
            <strong className="fs-5">{state.price}</strong>/month. By clicking
            'Buy Subscription' you agree to our{" "}
            <a className="greentxt" href="">
              Terms of Service
            </a>{" "}
          </strong>
        </div>
      </div>
      <div>
        <Paymentform />
      </div>
    </div>
  );
}
