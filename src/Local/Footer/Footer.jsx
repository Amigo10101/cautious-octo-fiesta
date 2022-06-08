import React, { Component } from 'react'
import { LBluetext , Fmenuitem} from '../../style'

export class Footert extends Component {
  render() {
    return (
      <div  className="container-lg p-5 ">
        <div className="row justify-content-center p-0 ">
          <div className="col  fs-5 fw-bold text-start text-light">
          <h5 style={{color:'#b2dded' }} className='pb-2 fs-3 fw-bold text-start '>Get to know us</h5>
  <Fmenuitem>adawdawdawda</Fmenuitem>
  <Fmenuitem>adawdawdawda</Fmenuitem>
  <Fmenuitem>adawdawdawda</Fmenuitem>
  <Fmenuitem>adawdawdawda</Fmenuitem>

          </div>
          <div className="col text-light ">
          <h5  style={{color:'#b2dded' }} className='pb-2 fs-3 fw-bold text-start'>Get to know us</h5>
          <Fmenuitem>adawdawdawda</Fmenuitem>
  <Fmenuitem>adawdawdawda</Fmenuitem>
  <Fmenuitem>adawdawdawda</Fmenuitem>
  <Fmenuitem>adawdawdawda</Fmenuitem>
          </div>  
          
           <div className="col  fs-5 fw-bold text-start pb-5 text-light">
           <h5  style={{color:'#b2dded' }} className='pb-2 fs-3 fw-bold text-start '>Get to know us</h5>
         <div className="row text-light">      
         <Fmenuitem>adawdawdawda</Fmenuitem>
  <Fmenuitem>adawdawdawda</Fmenuitem>
  <Fmenuitem>adawdawdawda</Fmenuitem>
  <Fmenuitem>adawdawdawda</Fmenuitem>
         </div>
  <div className="row ">
    <h5  style={{color:'#b2dded' }} className='fw-bold text-start py-3 fs-3'>Engage with us</h5>
    <div className='text-light text-start'>
    <i class="bi bi-facebook text-light fs-1 p-3"></i>
    <i class="bi bi-facebook text-light fs-1 p-3"></i>
    <i class="bi bi-facebook text-light fs-1 p-3"></i>

    
    </div>
    <div>

    </div>
  </div>
          </div>
          <div  style={{color:'#b2dded' }} className="col fs-3 fw-bold text-center justify-content-center">App
        <div className="row p-2 pt-5 justify-content-center">
          <img className='w-50 ' src="https://plushcare.com/wp-content/themes/plushcare/dist/images/apple_badge.svg" alt="" />
        </div>
        <div className="row p-2 justify-content-center">
          <img className='w-50' src="https://plushcare.com/wp-content/themes/plushcare/dist/images/apple_badge.svg" alt="" />
        </div>
          </div>

        </div>
        <div className="row justify-content-center ">
          <LBluetext>

          Lorem ipsum dolor sit. <a className='fs-5' href='#'>Terms of Use </a>| <a className='fs-5' href=''>Privacy Policy</a> 
          </LBluetext>
        </div>
      </div>
    )
  }
}

export default Footert