import React, { Component } from 'react'
import "./nav.css"
export class Navb extends Component {
  render() {
    return (
      <div className="">
<navtop className="">
<div className="container-fluid px-md-2 sticky-top">
                <nav class="navbar  ">
  <a href="/"class="navbar-brand p-0 m-0"><img src="https://www.freewayinsurance.com/wp-content/themes/freewayv2/template/html/images/components/header/freeway-logo.svg" alt="" /></a>
  <ul className="nav justify-content-end">
  <div className="navbar-toggler   p-2 border-0 text-dark" >
    <span className='d-block d-sm-inline  d-lg-inline p-1'><i class="bi bi-globe "></i></span>  <span className='p'>Espanol</span>
    </div>
     
    <div className="navbar-toggler   p-2 border-0 text-dark" >
    <span className='d-block d-sm-inline d-lg-inline p-1'><i class="bi bi-phone "></i></span>  <span className='p'>09973432</span>
    </div>

     <li className="nav-item d-block d-md-none">
     <div className="navbar-toggler   p-2 border-0 text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className='d-block d-sm-inline d-md-block p-1'><i class="bi bi-list "></i></span>  <span className='p'>Menu</span>
    </div>
     </li>
   </ul>

</nav>
      </div>
</navtop>

     
   <nav className="navbar p-0  navbar-expand-md ">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"></a>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto me-auto mb-2 mb-lg-0  ">
        <li className="nav-item px-2">
          <a className="nav-link " aria-current="page" href="/">Online Doctor</a>
        </li>
        <li className="nav-item  px-2">
          <a className="nav-link" href="#">Online Prescription</a>
        </li>
        <li className="nav-item dropdown  px-2">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
         
        </li>
        <li className="nav-item  px-2">
          <a className="nav-link disabled">Disabled</a>
        </li>
      </ul>
      
    </div>
  </div>
  
</nav>
</div>

    )
  }
}

export default Navb