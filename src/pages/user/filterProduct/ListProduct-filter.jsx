import React, { useState } from 'react'
import Data from "./product.json"
import {useEffect} from "react"
import { Card } from 'antd';
import "./Listproduct-filter.css"

import {useLocation} from "react-router-dom"

const { Meta } = Card;
function ListProduct(props) {
    const [dataFake,setDataFake] = useState([])
    function takeData (){
      setDataFake(props.cloneData)
    }



    useEffect(() => {
      takeData()
      
    
    }, [props.cloneData])
    
  return (
    <>
    <div className='Listproduct-product'>
            {
                dataFake.map(function(value,index){
                    return(
                        <div className='Listproduct-product-card' key={index} >
                                
                                    <Card hoverable cover={<img alt="example" src={value.thumpnail}  className="card-listproduct"/>}>
                                    <Meta title={value.productName} description={value.price.toLocaleString()} />
                                    </Card>
                                 
                        </div>
                    )
                })
            }

            
    </div>
    
    </>
  )
}

export default ListProduct