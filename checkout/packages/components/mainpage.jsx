import React, { Component } from 'react'
import Packages from '../package'
import { Packbg } from './packstyle'



const Mainpage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(False);

  {
    if(isLoggedIn){
      return <button>Logout</button>
    } else{
      return <button>Login</button>
    }
  }
  
}

export default Mainpage