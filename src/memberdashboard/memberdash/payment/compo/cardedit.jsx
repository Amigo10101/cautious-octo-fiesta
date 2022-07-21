import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const Cardedit = () => {
  const [number, SetNumber] = useState("");
  const [name, SetName] = useState("");
  const [month, SetMonth] = useState("");
  let [expiry, SetExpiry] = useState("");
  const [cvc, SetCvc] = useState("");
  const [focus, SetFocus] = useState("");
  const handleDate = (e) => {
    SetMonth(e.target.value);
    SetExpiry(e.target.value);
  };
  const handleExpiry = (e) => {
    SetExpiry(month.concat(e.target.value));
  };

  return (
    <div style={{ maxWidth: 450 }} className="d-block p-0  m-auto container pb-2">
      {/* <div className="rccs__card backcolor"> */}

      <div className="h5">Edit Card Details</div>
      <div clasName="shadow">
        <span className="m-auto">
          <Cards
            clasName=""
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focus}
          />
        </span>
      </div>

  
      <form style={{margin:"-80px 0 0 0"}} className="shadow-lg  rounded-4 p-4  bg-white">
        <div style={{height:90}}></div>
        <div className="row">
          <div className="col">
            <label for="name">Card Number</label>
            <input
              type="tel"
              className="form-control"
              value={number}
              name="number"
              maxlength="16"
              pattern="[0-9]+"
              onChange={(e) => {
                SetNumber(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></input>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <label for="name">Card Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              name="name"
              onChange={(e) => {
                SetName(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></input>
          </div>
        </div>
        <br />
        <div className="row pb-2">
          <div
            className="col-sm-7"
            style={{
        
            }}
          >
            <label className="ps-1" for="month">   Expiration Date</label>
          </div>
          <div className="col-sm-5">
            <label className="ps-2" for="cvv">CVV</label>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <select
              className="form-control"
              name="expiry"
              onChange={handleDate}
            >
              <option value=" ">Month</option>
              <option value="01">Jan</option>
              <option value="02">Feb</option>
              <option value="03">Mar</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">Aug</option>
              <option value="09">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
          </div>
          &nbsp;
          <div className="col-sm-4">
            <select
              className="form-control"
              name="expiry"
              onChange={handleExpiry}
            >
              <option value=" ">Year</option>
              <option value="21">2021</option>
              <option value="22">2022</option>
              <option value="23">2023</option>
              <option value="24">2024</option>
              <option value="25">2025</option>
              <option value="26">2026</option>
              <option value="27">2027</option>
              <option value="28">2028</option>
              <option value="29">2029</option>
              <option value="30">2030</option>
            </select>
          </div>
          <div className="col">
            <input
              type="tel"
              name="cvc"
              maxlength="3"
              className=" form-control card"
              value={cvc}
              pattern="\d*"
              onChange={(e) => {
                SetCvc(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></input>
          </div>
        </div>
        <br />
        <input
          type="submit"
          className="btn btn-primary w-100 d-block m-auto"
          value="Save"
        />
      </form>
    </div>
  );
};
export default Cardedit;