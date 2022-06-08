import React from 'react'
import { BrowserRouter as Router, Outlet, Route,Routes } from "react-router-dom";
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import Step4 from './steps/step4';

export default function Checkoutmain() {
  return (
    <div>
        <h1>Checkout</h1>
      
        <Outlet/>
        
    </div>
  )
}
