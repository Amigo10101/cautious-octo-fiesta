import React, { Component } from "react";
import { Bigtxt, PackageButton, Shape, Smalltxt } from "../packstyle";

export class Indpackage extends Component {
  render() {
    return (
      <label
        htmlFor=""
        style={{ borderRadius: "20px" }}
        className="container py-4 pt-5 position-relative bg-light text-center"
      >
        <Shape>Special</Shape>
        <div className="row">
          <div className="col">
            <Bigtxt>
              <span className="fs-1 fw-bold">$</span>5
              <sup className="fw-bold">.99</sup>
            </Bigtxt>
            <div className="container-lg"></div>
            <Smalltxt className="text-center">adadw</Smalltxt>
          </div>

          <div className="col">
            <Bigtxt>
              <span className="fs-1 fw-bold">$</span>5
              <sup className="fw-bold">.99</sup>
            </Bigtxt>
            <div className="container-lg"></div>
            <Smalltxt className="text-center">adadw</Smalltxt>
          </div>
        </div>

        <PackageButton className="rounded-pill">Buy Now</PackageButton>
      </label>
    );
  }
}

export default Indpackage;
