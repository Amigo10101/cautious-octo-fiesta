import React, { Component } from 'react'
import Appiontmentsinduncomplete from './yourdashboard/appointinduncomplete'
import Appiontmentsind from './yourdashboard/appointmentsind'

export class Timeline extends Component {
  render() {
    return (
      <div className='row-lg'>

<div className="col-lg gy-5"></div>
<div className="row ">
  <h1 className='fw-bolder text-start'> Welcome  <h1 className='fw-bolder text-start'>ARthur</h1></h1>
</div>
<div className="row pt-5">
  <h6>Your Appointments</h6>
</div>
<div className='container p-4'><div className="row justify-content-center py-3">
  <Appiontmentsind/>
</div>
<div className="row justify-content-center py-3">
  <Appiontmentsind/>
</div>
<div className="row justify-content-center py-3">
  <Appiontmentsinduncomplete/>
</div>
<div className="row justify-content-center py-3">
  <Appiontmentsind/>
</div>

      </div>
   <div className="row  justify-content-center ">
     <button className='btn btn-primary w-50'>End today's shift</button>
     </div>   
      
      </div>

    )
  }
}

export default Timeline