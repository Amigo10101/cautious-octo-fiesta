import React, { Component } from 'react'
import Content from './content'
import { Unactiveicon, Activeicon, BoldDash } from './style'


export class Sidenav extends Component {
  render() {
    return (
        
  <div class="container-fluid overflow-hidden">
    <div class="row vh-100 overflow-auto">
        <div class="col-12 col-sm-2 col-xl-1 px-sm-2 px-0 d-flex sticky-top">
        <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-center   pt-2 text-white">
                <BoldDash>
                    <a href="/" className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto fw-bold text-decoration-none fs-5 mx-0">
                     COmpny  </a></BoldDash>
             
              <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start" id="menu">
                <li className="nav-item py-sm-4">
                  <a href="#" className=" text-decoration-none  px-sm-0  ">
                   <Activeicon className=''><i className="fs-4 text-white bi-house " /></Activeicon> <div style={{color:'#147aff',fontWeight:'600'}} className="ms-1 d-none d-sm-block fs-6 px-1  ">Home</div>
                  </a>
                </li>
      
                <li className="nav-item py-sm-4">
                  <a href="#" className="nav-link px-sm-0  ">
                   <Unactiveicon className=''><i style={{color:'#147aff',fontWeight:'600'}} className="fs-4 bi-house " /></Unactiveicon> <div style={{color:'#147aff',fontWeight:'600'}} className="ms-1 d-none d-sm-block fs-6 px-1">Home</div>
                  </a>
                </li>
                <li className="nav-item py-sm-4">
                  <a href="#" className="nav-link px-sm-0  ">
                   <Unactiveicon className=''><i style={{color:'#147aff',fontWeight:'600'}} className="fs-4 bi-house " /></Unactiveicon> <div style={{color:'#147aff',fontWeight:'600'}} className="ms-1 d-none d-sm-block fs-6 px-1">Home</div>
                  </a>
                </li>
                <li className="nav-item py-sm-4">
                  <a href="#" className="nav-link px-sm-0  ">
                   <Unactiveicon className=''><i style={{color:'#147aff',fontWeight:'600'}} className="fs-4 bi-house " /></Unactiveicon> <div style={{color:'#147aff',fontWeight:'600'}} className="ms-1 d-none d-sm-block fs-6 px-1">Home</div>
                  </a>
                </li>
                
                
               
              </ul>
              <div className="dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/mdo.png" alt="hugenerd" width={28} height={28} className="rounded-circle" />
                  <div className="d-none d-sm-block mx-1">LOLewef</div>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                  <li><a className="dropdown-item" href="#">New project...</a></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
              </div>
            </div>
        </div>
        <div style={{backgroundColor:'#f3f8ff'}} class="col d-flex flex-column h-sm-100 py-4">
            <Content>w</Content>
        </div>
    </div>
</div>

    )
  }
}

export default Sidenav

