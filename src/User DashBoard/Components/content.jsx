import React, { Component } from 'react'
import Minicalender from './dashboardsmall/minis/Minicalender'
import Report from './dashboardsmall/minis/report'
import Timeline from './dashboardsmall/timeline'
import { Appointmentsmini } from './dashboardsmall/minis/appointments'
import Monthlyreport from './dashboardsmall/minis/monthlyreport'

export class Content extends Component {
  render() {
    return (
     
       <div className="row ">

<div className="col-md-4">
<Timeline/>
</div>
<div className="col-md-8">
  <div className="row">
    <div className='col-4 mx-4'>
<Minicalender/>
</div>
<div className='col-7'>
  <Report/>
  </div>
  </div>
<div className="row pt-3 pe-2 ">
<Appointmentsmini/>
</div>
<div className="row pt-3 pe-2 ">
<Monthlyreport/>

</div>
  </div>
      </div>
      
     
    
    )
  }
}

export default Content