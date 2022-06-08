import React, { Component } from 'react'

export class Reportbarind extends Component {
  render() {
    return (
      <div className='shadow-lg bg-white rounded-5 p-3' >
<div className="row">
  <div className="col"> 
  <i class="bi bi-file-text bg-primary bg-opacity-25 fs-2 px-2 py-1 rounded-3"></i></div>
  <div className="col">
    <div className="row">Treatment Report</div>
    <div className='row'>
      <div class="progress bg-azure p-0 m-0">
  <div class="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
</div>

</div>
  
  </div>
  <div className="col m-auto"><div className=""></div> 75%</div>

</div>

      </div>
    )
  }
}

export default Reportbarind