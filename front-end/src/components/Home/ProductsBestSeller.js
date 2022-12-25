import React from 'react'
import { Row } from 'react-bootstrap'
import { CardProduct } from '../Products/CardProduct'

export const ProductsBestSeller = () => {
  return (
    <Row className='justify-content-center'>
    <CardProduct/>
    <CardProduct/>
    <CardProduct/>
    <CardProduct/>
    <CardProduct/>
    <CardProduct/>
    </Row>
  )
}
