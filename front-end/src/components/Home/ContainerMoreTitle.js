import React from 'react'
import { Link } from 'react-router-dom'

export const ContainerMoreTitle = ({name, btn}) => {
  return (
    <div className='d-flex justify-content-between '>
      <div>{name}</div>
      {btn ? (
        <Link className='btn btn-primary' style={{textDecoration: 'none'}}>{btn}</Link>
      ): null}
    </div>
  )
}
