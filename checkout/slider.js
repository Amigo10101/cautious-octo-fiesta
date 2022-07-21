import React from 'react'
import "./slider.css"

export default function Slider() {


    
    

  return (
    <div className="switch">
    <div class="button" id="button-container">
      <div id="my-button" class="button-element">
        <span id="Monthly">Monthly</span>
      </div>
      <span id="Yearly">Yearly</span>
    </div>
    <label hidden>
      <input
        id="for-button"
        type="text"
        name="method"
        value="Monthly"
      />
    </label>
  </div>
  )
}
