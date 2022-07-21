import React, { useState } from 'react'
import useMode from "./usemode";
import MembDashboard from "./memberdashboard/main";
import MainDashboard from "./dashboard/main";
import Errorpage from './404';
export default function Memboroffice() {
    const { mode, setMode } = useMode();
    const [modeval,setmodeval]=useState(mode);
    
  return (
    modeval==="N"?<MembDashboard/>:modeval==="O"?<MainDashboard/>:modeval==="A"?<MainDashboard/>:<Errorpage/>
  )
}
