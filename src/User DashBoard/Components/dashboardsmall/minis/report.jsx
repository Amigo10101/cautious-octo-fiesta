import React, { Component } from 'react'

export class Report extends Component {
  render() {
    return (
      <div className='container bg-white rounded-5 p-2 '>
          <div className="row">
               <div className="col p-2"><h3 className='p-2'> Hello doctor !</h3>
<h6 className='p-2'> Complete your daoily reports for your patients  </h6>
<button className='btn btn-primary rounded-3'> Complete report</button>
</div>
<div className='col'>
  
  <img className='w-75' src="https://www.pngkey.com/png/full/196-1960872_doctors-clipart-doctor-patient-see-doctor-png.png" alt="" />

</div></div>
         
      </div>
    )
  }
}

export default Report