import React from 'react'
import History from './history'

export default function MemberDashboard() {
  return (
    <div>
      <div><br />
</div>
      <div style={{maxWidth:'500px'}} className="container my-5 rounded-4 shadow">
        <div style={{borderRadius:"20px 20px 0px 0px "}} className="row bdarkblue p-4 text-white py-2 ">
          <div className="col"><div>Curent Plan</div><h6 className='text-white'>Package1:(Yearly)</h6> </div>
          <div className="col m-auto text-end"><h6 className='text-white'><span className='h5'>$12.2</span>/Mo</h6> </div>

        </div>
        <div className="row p-4">
          <div className="col"><div className='h6'>Subscription Start Date</div> <div>2 May,2022</div></div>
          <div className='col text-end'><div className='h6'>Subscription End Date</div> <div>2 May,2022</div></div>
        </div>
      </div>
      <div className='p-3 fw-bold h5 '>Subscription History</div>
      <History/>
    </div>
  )
}
