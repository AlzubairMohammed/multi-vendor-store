import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import Cim from '../../images/pro2.jpg'

export const CardProduct = () => {
  return (
    <Col lg='2' md='3' sm='4' xs='6'>
        <Card className='mb-2 mt-2' style={{width:'150px',height:'270px'}}>
        <Card.Img style={{height:'120px'}} src={Cim} />
        <Card.Body>
            <Card.Title className='fw-bold'>
            منتج العاب
            </Card.Title>
            <Card.Text className='h6'>
                هذا المنتج جديد علي اسواق الخليج
            </Card.Text>
            <Button className='w-100' variant="primary">اضافة للسلة</Button>
        </Card.Body>
        </Card>
    </Col>
  )
}
