import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import { Route,Routes } from 'react-router-dom'
import "./App.css"
import NotFound from './vendorDashboard/componants/NotFound'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
      {/* <LandingPage /> */}
    </div>
  )
}

export default App

