import React, { Component } from 'react'
import { Bigtxt, PackageButton, Shape, Smalltxt } from './packstyle'

export class Indpackage extends Component {
  render() {
    return (
      <div style={{borderRadius:"20px"}} className="container py-4 pt-5 position-relative bg-light">
<Shape>
  Special
</Shape>
<Bigtxt><span className='fs-1 fw-bold'>$</span>5<sup className='fw-bold'>.99</sup></Bigtxt>
<div className='container-lg'></div>
<Smalltxt>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repellat porro assumenda unde, quod minima velit inventore eum odit est.</Smalltxt>
  <div className='py-3'>
    <div className="col">
<div><i class="bi bi-check-circle-fill p-2 d-inline"></i><Smalltxt className='p-1 d-inline'>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</Smalltxt></div>
<div><i class="bi bi-check-circle-fill p-2 d-inline"></i><Smalltxt className='p-1 d-inline'>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</Smalltxt></div>
<div><i class="bi bi-check-circle-fill p-2 d-inline"></i><Smalltxt className='p-1 d-inline'>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</Smalltxt></div>

    

</div>
  </div>


<PackageButton className='rounded-pill'>Buy Now</PackageButton>

      </div>

    )
  }
}

export default Indpackage