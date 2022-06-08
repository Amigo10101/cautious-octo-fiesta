import React, { Component } from 'react'
import Productsind from './productsind'
import Productsind1 from './productsind1'
import {
 Outlet
} from "react-router-dom";

export class Productsbody extends Component {
  render() {
    return (
      <>
<div style={{backgroundColor:'#b2dded'}} className="card text-center ">
  <div  style={{backgroundColor:'#283779'}} className="card-header border-0 ">
    <ul className="nav nav-pills card-header-pills mx-3">
      <li style={{backgroundColor:'#b2dded',color:'white'}}  className="text-light rounded-pill mx-2">
        <a className="nav-link fw-bold " href="/1">Product</a>
      </li>
      <li style={{backgroundColor:'#b2dded',color:'white'}}  className="text-light rounded-pill mx-2">
        <a className="nav-link fw-bold " href="/2">Why us</a>
      </li>
      <li style={{backgroundColor:'#b2dded',color:'white'}}  className="text-light rounded-pill mx-2">
        <a className="nav-link fw-bold " href="/2">Lorem, ipsum dolor.</a>
      </li>
    </ul>
  </div>
  <div className="card-body">
    <Outlet/>
  </div>
</div>

      </>
    )
  }
}

export default Productsbody