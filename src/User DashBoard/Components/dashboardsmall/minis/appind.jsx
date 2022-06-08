import React, { Component } from 'react'

export class Appindv extends Component {
  render() {
    return (
      <div> <div className='shadow rounded-5 border border-2 border-primary py-4'><i class=" bg-primary bg-opacity-25 px-2 rounded-4  fs-1 bi bi-person text-primary"></i>
        <div className='fs-6 fw-bold w-50 m-auto py-3'> Paitient Name </div>
        <div style={{fontSize:'12px'}}>Old patient</div>
        </div>
<h6 className='fw-bold text-primary p-2' > In: 08:20 </h6>        
        </div>
       
    )
  }
}

export default Appindv