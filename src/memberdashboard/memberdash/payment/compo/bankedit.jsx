import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { BankTwoTone } from "@ant-design/icons";

const Bankedit = () => {
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
    <div
      style={{ maxWidth: 450 }}
      className="d-block p-0  m-auto container pb-2"
    >
      <div className="h5">Edit Bank Account</div>

      <div clasName="shadow">
        <span className="m-auto">
          <BankTwoTone className="d-block m-auto" style={{ fontSize: 120 }} />
        </span>
      </div>

      <form
        style={{ margin: "-50px 0 0 0" }}
        className="shadow-lg  rounded-4 p-4  bg-white"
      >
        <div style={{ height: 50 }}></div>
        <div className="row">
          <div className="col">
            <label for="name">Account Number</label>
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
            <label for="name">Routing Number</label>
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
        <div className="row">
          <div className="col">
            <label for="name">Account Name</label>
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
export default Bankedit;
