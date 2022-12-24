import React from 'react'
import { Container, Form, Nav, Navbar } from 'react-bootstrap'
import brand from '../../images/brand.jpg'

export const NavBar = () => {
  return (
    <Navbar className='sticky-top' bg='dark'>
      <Container>
        <Navbar.Brand>
        <img className='brand-style ms-3 rounded-circle' src={brand}></img>
        </Navbar.Brand>
        <Form.Control placeholder='بحث...' className='w-100 text-center'>

        </Form.Control>
        <Nav className='me-3'>
          <Nav.Link className='text-white'>
          <p className='mt-3' style={{fontSize:'12px'}}>دخول</p>
          
          </Nav.Link>
          <Nav.Link className='text-white' href='/cart'>
          <p className='mt-3' style={{fontSize:'12px'}}>العربة</p>
          </Nav.Link>
        </Nav>
      </Container>

    </Navbar>
  )
}
