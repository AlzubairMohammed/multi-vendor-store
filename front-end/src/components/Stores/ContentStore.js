import React from 'react'
import { Row } from 'react-bootstrap'
import { CardStore } from './CardStore'

export const ContentStore = () => {
  return (
    <Row>
      <CardStore storeName={'متجر اوميقا'} />
      <CardStore storeName={'متجر اوميقا'} />
      <CardStore storeName={'متجر اوميقا'} />
      <CardStore storeName={'متجر اوميقا'} />
      <CardStore storeName={'متجر اوميقا'} />
      <CardStore storeName={'متجر اوميقا'} />
    </Row>
  )
}
