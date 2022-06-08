import React, { Component } from 'react'
import Packages from '../package'
import { Packbg } from './packstyle'

export class Mainpage extends Component {
  render() {
    return (
      <div className='position-relative'><Packbg className="bg"><Packages/></Packbg></div>
        
     
    )
  }
}

export default Mainpage