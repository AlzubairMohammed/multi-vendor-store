import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const ContainerMoreTitle = ({name, btn}) => {
  return (
    <div className='d-flex justify-content-between my-4'>
      <div className='h3'>{name}</div>
      {btn ? (
        <Link style={{textDecoration: 'none'}}><Button className='px-4' size='md' variant="outline-secondary" >{btn}</Button></Link>
      ): null}
    </div>
  )
}
