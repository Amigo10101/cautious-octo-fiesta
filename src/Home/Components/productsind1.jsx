import React, { Component } from "react";

export class Productsind1 extends Component {
  render() {
    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-md p-5">
          

            <div className="row">
            <h2 className="fw-bolder p-2">Platform Overview1</h2>
            <h6>
              spans the care continuum from urgent
              care to acute care. Our technology combines a delightful
              experience for patients with best in class workflows for
              providers.
            </h6>
            <a className="d-block" href="#">
              Learn more ›
            </a>
          </div></div>
          <div className="col">
            <img
              className="w-25"
              src="https://assets.icliniq.com/v2/assets/images/specialityImages-pro/internal-medicine-physician.svg"
              alt=""
            />{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default Productsind1;
