import React from 'react'
import { Col } from 'react-bootstrap'
import brand from '../../images/pro1.png'

export const StoreCard = ({ storeName, storeImage }) => {
    return (
        <Col className='' md='4' lg='2' sm='6' xs='6'>
            <img className='store-image-style rounded-circle' src={brand}></img>
            <p className='mt-3 text-center'>{storeName}</p>
        </Col>
    )
}
