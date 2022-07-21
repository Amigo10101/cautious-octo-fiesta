import React , { useState }from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import { useNavigate } from "react-router-dom";
import Paymentmain from "./paynow/main";

const Result = (props) => {
  const { state } = useStateMachine(updateAction);
  const Navigate = useNavigate();
  const [paymentpageacess, setpaymentpageacess] = useState(false);
  const [paymentdisplay, setpaymentdisplay] = useState("none");
  const paymentmode = () => {
    {setpaymentpageacess(true) }
    console.log(paymentpageacess)
    
  };
  return (
    <div>
      <div style={{display:`${paymentdisplay}`}}> <Paymentmain  /></div>
      
    <div className="pt-5 w-50 m-auto">
      <div className="container">
        <div className=" stepsbg row text-start fs-5 py-3 text-center m-0 ">
          <span className="col p-0 fs-5 ps-3 text-start p-e-1 ">
            <i class="bi bi-check-circle-fill"></i>
          </span>
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
          <strong className="col pt-2 p-0 text-start ps-3">
            <i class="bi bi-check-circle-fill"></i>
          </strong>
          <div className="col-8  ">
            <div className="border border-white mb-2 "></div>Constumeer
            Information
          </div>
          <div className="col text-end pt-2">
            <button
              style={{ fontSize: "10px", padding: "6px" }}
              onClick={() => Navigate("/step2")}
              className="editplanbtn float-end border-white rounded-pill m-0"
            >
              Edit Info
            </button>
          </div>
        </div>
        <div className="bg-light">
          <div style={{ color: "#82cf95" }} className="fs-4 m p-3  text-center">
            <strong className="float-start">3</strong>
            <span className="fw-bold">Review Information</span>
          </div>

          <div className="container w-50">
            <div
              style={{
                borderTop: "2px solid #82cf95",
                borderBottom: "2px solid #82cf95",
              }}
              className="container p-3 text-center"
            >
              <div
                style={{
                  borderRadius: "29px",
                  backgroundColor: "#82cf95",
                  color: "white",
                  fontWeight: "600",
                }}
                className="p-4 fs-6"
              >
                <div className="py-1">
                  {state.Firstname} {state.Lastname}
                </div>
                <div className="py-1">
                  {state.Gender} {state.Dob}
                </div>
                <div className="py-1">
                  {state.Email} {state.Mobileno}
                </div>
                <div className="py-1">
                  {state.Address}, {state.City}, {state.State}, {state.Zip}
                </div>
              </div>
            </div>
          </div>

          <div className="container w-50 text-center">
            <div style={{ color: "#82cf95" }} className="fw-bold py-3 fs-3 ">
              {" "}
              Selcted Package
            </div>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "29px",
                width: "200px",
                boxShadow: "0 1rem 4rem #82cf95",
              }}
              className="container p-0  "
            >
              <div
                className="w-100 p-2  text-white fw-bold"
                style={{
                  backgroundColor: "#82cf95",
                  borderRadius: "29px 29px 0px 0px",
                  letterSpacing: "2px",
                }}
              >
                MONTHLY
              </div>
              <div className="pt-2 "> {state.title}</div>

              <div className="fw-lighter" style={{ fontSize: "60px" }}>
                {state.price}
                <span className="fs-3">.99</span>
              </div>
              <div className="greentxt fw-bold pb-3">Total</div>
            </div>
            <button
              className="editplanbtn btn rounded-pill fw-bold py-2 my-3"
              onClick={() => Navigate(-2)}
            >
              Change My Plan
            </button>
          </div>
        </div>
        <div
          style={{ borderRadius: "0px 0px 29px 29px" }}
          className="stepsbg py-2 fw-blod"
        >
          <button style={{letterSpacing:'1px'}}
            className="btn editplanbtn ms-4 rounded-pill fw-bold fs-6 "
            onClick={() => Navigate(-1)}
          >
            back
          </button>
          <button
            className="btn editplanbtn float-end me-4 rounded-pill fw-bold  "
            onClick={() => {setpaymentdisplay('block')} }
          >
            Pay Now
          </button>
        </div>
      </div>
    </div></div>
  );
};

export default Result;
