import React from 'react'
import { Container } from 'react-bootstrap'
import { SliderShow } from '../../components/Home/SliderShow'
import { ContentStore } from '../../components/Stores/ContentStore'
import { ContainerMoreTitle } from '../../components/Home/ContainerMoreTitle'

export const HomePage = () => {
  return (
    <div>
      <SliderShow />
      <Container className='mt-3'>
      <ContainerMoreTitle name='المتاجر' btn='المزيد'/>
        <ContentStore />
      </Container>
    </div>
  )
}
