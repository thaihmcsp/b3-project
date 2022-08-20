import React from 'react'
import { Carousel } from 'antd';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  
};


function Cart() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div style={{marginTop:'125px'}}>
      <Carousel
       afterChange={onChange}
       
        >
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
  )
}

export default Cart