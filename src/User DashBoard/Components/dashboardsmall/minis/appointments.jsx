import React, { Component } from 'react'
import Appindv from './appind'

export class Appointmentsmini extends Component {
  render() {
    return (
      <div className='container bg-white rounded-5 text-start p-md-4'>
          <h4 className='fw-bold text-start pb-2' >Todays Appointmets</h4>
          <div className="row">
<div className="col"><Appindv/></div>
<div className="col"><Appindv/></div>
<div className="col"><Appindv/></div>
<div className="col"><Appindv/></div>
<div className="col"><Appindv/></div>

          </div>
      </div>
    )
  }
}

export default Appointmentsmini