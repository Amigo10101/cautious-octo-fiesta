import React, { Component } from "react";
import Indpackage from "./components/indpackage";
import Sidenav from "./components/sidenav";

export class Packages extends Component {
  render() {
    return (
      <>
        <div className="container pt-5 text-white">
          <h1 className="text-bold"> Price List</h1>
          <div className="container-sm py-4"></div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis nihil
          quos atque, ipsam commodi quaerat! Dolorem obcaecati officiis debitis
          animi, mollitia praesentium facere nostrum doloremque laudantium
          veritatis vitae dolor aperiam?
        </div>
        <div className="container-xl py-5">
          <div className="row g-5">
            <div className="col-lg">
              <div className="row g-5">
                <div className="col-sm">
                  <Indpackage />
                </div>
                <div className="col-sm ">
                  <Indpackage />
                </div>
              </div>
            </div>

            <div className="col-lg">
              <div className="row g-5">
                <div className="col-sm">
                  <Indpackage />
                </div>
                <div className="col-sm">
                  <Indpackage />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Packages;
