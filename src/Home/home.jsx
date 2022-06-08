import React, { Component } from 'react'
import { Downscrollbutton, Fbutton } from '../style'
import  bg from "./bgc.jpg"
import  bgmd from "./bg-md.jpg"
import Issues from './Components/issues'
import Messageslider from './Components/messageslider'
import Affordable from "./Components/affordable";
import Productsbody from "./Components/products";



export class Home extends Component {
  render() {
    return (
      
      <div>
        <div style={{height:""}} className=''>

        <img style={{zIndex:"-1"}} className='w-100 h-auto  start-0 d-none d-md-block' src={bg} alt="" />
        <img style={{zIndex:"-1"}} className='w-100 h-auto  d-block .d-sm-none d-md-none ' src={bgmd} alt="" />

     <Downscrollbutton className='rounded-circle'>
     <i class="bi bi-chevron-down fs-1 "></i>
     </Downscrollbutton>
      </div>

      <div className='position-relative' style={{backgroundColor:""}}>
        <svg style={{transform:'scaleY(-1)'
}} fill="#b2dded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><path d="M 0 0 L 0 20 L 100 20 L 100 0 Q 50 30 0 0" /></svg>
<div></div>
<Issues/>
<Productsbody/>

<Affordable/>
 
<div className='w-100 '>
 <svg fill="#b2dded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><path d="M 0 0 L 0 20 L 100 20 L 100 0 Q 50 30 0 0" /></svg>
</div>
<Messageslider/>

</div>
</div>
    )
  }
}

export default Home