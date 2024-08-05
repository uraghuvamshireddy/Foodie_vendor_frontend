import React, { useEffect } from 'react'

const Navbar = ({showLoginHandler,showRegisterHandler,logout,logoutHandler}) =>{

const firmName = localStorage.getItem('firmName');


  return (
    <div className="navSection">
      
        <div className="company">
            Vendor Dashboard
        </div>
        <div className="firmName">
          <h4>{firmName}</h4>
        </div>
        <div className="userAuth">
          {!logout ? <>
            <span onClick={showLoginHandler}>Login /</span>
            <span onClick={showRegisterHandler}>Register</span>
          </> : <span onClick={logoutHandler}>Logout</span>}
          
            
        </div>
    </div>
  )
}

export default Navbar
