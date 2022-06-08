import React, { Component } from 'react'
import Reportbarind from './reportbarind'

export class monthlyreport extends Component {
  render() {
    return (
      <div className='bg-white rounded-5 p-3 py-4  '>
         <h5 className='text-start fw-bold'> Monthly Reports</h5>

<div className="row">
<div className="col"> <Reportbarind/> </div>
<div className="col"> <Reportbarind/> </div>

</div>

         </div>
    )
  }
}

export default monthlyreport