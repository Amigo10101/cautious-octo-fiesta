import React, { Component } from 'react'
import { Blue, LBlue } from '../../style'
import Issuseslider from './Issuseslider'

export class Issues extends Component {
  render() {
    return (
    
      <>  
      <div className=' w-lg-50 px-5'>
          
          <Blue className='fs-2 fw-bold d-block text-center' >From <LBlue className='fs-1 fw-bolder'>little</LBlue> to 
      <LBlue className='fs-1 fw-bolder'> life-altering</LBlue>
      <Blue className='d-block fs-5 fw-bold text-start py-3 text-center'> issues,
      Get answers for anything and everything.</Blue></Blue>
      <Issuseslider/>
      
      </div>
      </>
    )
  }
}

export default Issues