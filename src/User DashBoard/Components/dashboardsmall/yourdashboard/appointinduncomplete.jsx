import React, { Component } from 'react'

export class Appiontmentsinduncomplete extends Component {
  render() {
    return (
      <div className='container bg-light p-3 rounded-3 w-75 w-lg-100 text-center fw-bold text-info border border-primary border-2  fs-6'><i style={{float:'left'}} class="bi bi-calendar text-dark "></i>
     Upcoming shift
      <span style={{float:'right'}} className='float-left text-dark'>jan 2,22</span>
      </div> 
    )
  }
}

export default Appiontmentsinduncomplete