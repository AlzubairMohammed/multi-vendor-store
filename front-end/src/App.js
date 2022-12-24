import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/Uitily/NavBar'
import { HomePage } from './pages/Home/HomePage'

export const App = () => {
  return (
   <div className='font'>
     <NavBar /> 
     <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
   </div>
  )
}
