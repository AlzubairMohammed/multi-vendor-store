import React from 'react'
import { Carousel } from 'react-bootstrap'
import brand from '../../images/slider2.jpg'
import brand2 from '../../images/slider4.png'
import brand3 from '../../images/slider5.jpg'

export const SliderShow = () => {
  return (
    <Carousel>
      <Carousel.Item className=''interval={1000}>
      <div className="d-flex flex-row justify-content-center align-items-center">
      <img src={brand} className='w-100 slider-img'></img>
        <div className="">
          <h3 className="slider-title">هناك خصم كبير</h3>
          <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
        </div> 
      </div>
      </Carousel.Item>
      <Carousel.Item className='' interval={1000}>
      <div className="d-flex flex-row justify-content-center align-items-center">
      <img src={brand2} className='w-100 slider-img'></img>
        <div className="">
          <h3 className="slider-title">هناك خصم كبير</h3>
          <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
        </div> 
      </div>
      </Carousel.Item>
      <Carousel.Item className='' interval={1000}>
      <div className="d-flex flex-row justify-content-center align-items-center">
      <img src={brand3} className='w-100 slider-img'></img>
        <div className="">
          <h3 className="slider-title">هناك خصم كبير</h3>
          <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
        </div> 
      </div>
      </Carousel.Item>
    </Carousel>
  )
}
