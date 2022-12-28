import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/Uitily/NavBar'
import { HomePage } from './pages/Home/HomePage'
import { AllProducts } from './pages/Products/AllProducts'

export const App = () => {
  return (
    <div className='font'>
      <NavBar />
      <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path='/products' element={<AllProducts />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}
