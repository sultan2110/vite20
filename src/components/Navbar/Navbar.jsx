import React from 'react'
import "./Navbar.css"
import { BsBlockquoteRight, BsCircleFill } from "react-icons/bs";


function Navbar() {
  return (
    <div className='Navbar'>
        <div><span><BsBlockquoteRight/></span></div>
        <div className='bayram'>
        <div><span><BsCircleFill/></span></div>
        <div><span>Berdimuratov Bayram Abatbaevich</span></div>
        </div>
    </div>
  )
}

export default Navbar