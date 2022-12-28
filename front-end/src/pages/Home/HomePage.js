import React from 'react'
import { Container } from 'react-bootstrap'
import { SliderShow } from '../../components/Home/SliderShow'
import { ContentStore } from '../../components/Stores/ContentStore'
import { ContainerMoreTitle } from '../../components/Home/ContainerMoreTitle'
import { ProductsBestSeller } from '../../components/Home/ProductsBestSeller'

export const HomePage = () => {
  return (
    <div>
      <SliderShow />
      <Container className='mt-3'>
      <ContainerMoreTitle onClick='' name='المتاجر' btn='المزيد'/>
        <ContentStore />
        <ContainerMoreTitle name='الاكثر مبيعا' btn='المزيد' url='/products'/>
        <ProductsBestSeller/>
      </Container>
    </div>
  )
}
