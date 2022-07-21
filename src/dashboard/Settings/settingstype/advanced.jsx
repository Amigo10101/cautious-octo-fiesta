import React from "react";
import { useNavigate } from "react-router-dom";

export default function Advanced() {
  const Navigate = useNavigate();
  return (
    <div className="p-4">
      <h2 className="fs-5">Security Settings</h2>
      <div className="row py-4">
        <div className="col-4">
          <div style={{ fontWeight: "500" }}>Account Password</div>
          <div className="tgrey">
            Current password strength：
            <span style={{ color: "#16b03c" }}>Strong</span>
          </div>
        </div>
        <div className="col"></div>
        <div
          onClick={() => {
            Navigate("/resetpassword");
          }}
          className="col-4 text-end m-auto text-primary"
        >
          <button className="btn btn-primary fs6">Modify</button>
        </div>
      </div>
    </div>
  );
}
