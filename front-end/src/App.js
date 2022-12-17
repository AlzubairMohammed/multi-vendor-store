import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/Uitily/NavBar'
import { HomePage } from './pages/Home/HomePage'

export const App = () => {
  return (
   <div>
     <NavBar /> 
     <BrowserRouter>
      <Routes>
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
   </div>
  )
}
