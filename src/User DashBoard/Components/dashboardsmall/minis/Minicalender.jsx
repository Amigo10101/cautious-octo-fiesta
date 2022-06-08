import React, { Component } from 'react'
import cal from "./date.png"
export class Minicalender extends Component {
  render() {
    return (
      <div className='container  bg-white rounded-5  '>
<h5 className='fw-bold p-3'>May, 2022</h5>
<img className='w-75' src={cal} alt="" />
      </div>
    )
  }
}

export default Minicalender