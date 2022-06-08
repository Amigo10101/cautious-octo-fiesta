import React, { Component } from 'react'
import "./style.jsx"
import { Fbutton } from './style.jsx'

export class Affordable extends Component {
  render() {
    return (
<div className="container pt-5">
    <div className='row align-items-center'>

<div className='col-lg'>

<div className="row align-items-center">
    <div className="col">
        <img src="https://plushcare.com/wp-content/uploads/2021/07/uhc-logo-blue-172x54-1.png" alt="" />
    </div>
    <div className="col">
        <img src="https://plushcare.com/wp-content/uploads/2020/02/Heart_Aetna_logo_sm_rgb_vio.png" alt="" />
    </div>
    <div className="col-fluid py-4">
        <img src="https://plushcare.com/wp-content/uploads/2020/02/humana-2.png" alt="" />
    </div>
  

</div>

</div>
<div className='col '>
<div className='row '><h1 className='fw-bolder p-4'>Affordable</h1>
<h4 className='px-5 py-3 text-start fw-light'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem enim ipsa dolorem dolores quis consequatur ullam minima minus ipsum aliquid?</h4>

</div>
<div className="row justify-content-center">
<Fbutton className='rounded-pill w-50'>Book a appointment now</Fbutton>

</div>
</div>


      </div>
</div>

    )
  }
}

export default Affordable