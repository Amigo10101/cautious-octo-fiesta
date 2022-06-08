import React, { Component } from 'react'
import Sliderind from './issusesliderind'
import Messagesliderind from './messsagesliderind'
import "./messageslider.css"
import { Blue, Lbluebg } from '../../style'
export class Messageslider extends Component {
  render() {
    return (
    <Lbluebg className='p-2 '>
      <Blue style={{fontSize:'60px', }} className="fw-bold">Over 415,000 patients cared for.</Blue>
  <div id="messageslider" className="carousel slide text-dark  py-5" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#messageslider" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
      <button type="button" data-bs-target="#messageslider" data-bs-slide-to={1} aria-label="Slide 2" />
      <button type="button" data-bs-target="#messageslider" data-bs-slide-to={2} aria-label="Slide 3" />
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
    <Messagesliderind/>
      </div>
      <div className="carousel-item ">
    <Messagesliderind/>
      </div>
    </div>
    <button className="carousel-control-prev text-dark fs-1" type="button" data-bs-target="#messageslider" data-bs-slide="prev">
    <i class="bi bi-arrow-left-circle fs-1"></i>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#messageslider" data-bs-slide="next">
    <i class="bi bi-arrow-right-circle fs-1"></i>
    </button>
  </div>
</Lbluebg>

    )
  }
}

export default Messageslider