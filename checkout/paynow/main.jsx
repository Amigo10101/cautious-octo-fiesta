import React from "react";
import Payment from "./payment";
import Payreview from "./payreview";

export default function Paymentmain(payment) {
  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      className=" w-100 h-100  position-fixed "
    >
      <div
        style={{
            top: '5%',
            left: 0,
            right: 0,
            bottom: 0,
        }}
        className=" position-fixed"
      >
        <div style={{width:'100%' ,maxWidth:"600px"}} className="container p-0 bg-light text-white fs-5 fullround">
          <Payment/>       
       
        </div>
      </div>
    </div>
  );
}
