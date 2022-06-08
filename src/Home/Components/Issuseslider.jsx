import React, { Component } from 'react'
import img from "./bg-md.jpg"
import Sliderind from './issusesliderind'
export class Issuseslider extends Component {
  render() {
    return (
    <div>
  <div id="carouselExampleCaptions" className="carousel slide text-dark p-lg-5 py-5" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
    <Sliderind/>
      </div>
      <div className="carousel-item ">
    <Sliderind/>
      </div>
    </div>
    <button className="carousel-control-prev text-dark fs-1" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <i class="bi bi-arrow-left-circle fs-1"></i>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <i class="bi bi-arrow-right-circle fs-1"></i>
    </button>
  </div>
</div>

    )
  }
}

export default Issuseslider