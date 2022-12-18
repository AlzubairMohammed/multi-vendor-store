import React from 'react'
import { Container, Form, Nav, Navbar } from 'react-bootstrap'
import second from 'brand.'

export const NavBar = () => {
  return (
    <Navbar className='py-3' bg='dark'>
      <Container>
        <Navbar.Brand>
          sldfls
        </Navbar.Brand>
        <Form.Control placeholder='بحث...' className='w-100 text-center'>

        </Form.Control>
        <Nav className='me-3'>
          <Nav.Link className='text-white'>
          <img src=''></img>
          دخول
          </Nav.Link>
          <Nav.Link className='text-white'>العربة</Nav.Link>
        </Nav>
      </Container>

    </Navbar>
  )
}
