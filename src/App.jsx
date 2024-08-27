import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import { Route,Routes } from 'react-router-dom'
import "./App.css"
import NotFound from './vendorDashboard/componants/NotFound'
import AllProducts from './vendorDashboard/componants/AllProducts'

function App() {
  // const firmID=localStorage.getItem("firmId")
  return (
    <div>
     
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/:id/menu"  element={<AllProducts />}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
      {/* <LandingPage /> */}
    </div>
  )
}

export default App

