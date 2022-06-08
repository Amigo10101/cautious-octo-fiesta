import React, { Component } from 'react'
import { Bigtxt, PackageButton, Shape, Smalltxt } from './packstyle'

export class Indquery extends Component {
  render() {
    return (
      <div style={{borderRadius:"20px"}} className="container py-4 pt-5 position-relative bg-light">
<Bigtxt>Ask A Doctor Now</Bigtxt>
<div className='container-lg'></div>
<Smalltxt>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repellat porro assumenda unde, quod minima velit inventore eum odit est.</Smalltxt>
  <div className='py-3'>
 <div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Enter details about your health Condition</label>
    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Cough,Age,etc" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
  </div>
</div>

  </div>


<PackageButton className='rounded-pill'>Buy Now</PackageButton>

      </div>

    )
  }
}

export default Indquery