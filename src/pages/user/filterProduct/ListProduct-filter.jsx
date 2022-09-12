import React, { useState } from 'react'
import Data from "./product.json"
import {useEffect} from "react"
import { Card } from 'antd';
import "./Listproduct-filter.css"
import { Pagination } from 'antd';

import {useLocation} from "react-router-dom"
import { instance } from '../../../config/axios'
import { Link } from 'react-router-dom';
const { Meta } = Card;
function ListProduct() {
    const [dataFake,setDataFake] = useState([])
    const location = useLocation()
    const cutLink = new URLSearchParams(location.search)
   
    async function getData (){
      try {
            let cut = cutLink.get("search")
            
          let data = await instance.get(`/product/find-products-by-name?productName=${cut}`)
          
          setDataFake(data.data.products);
      } catch (error) {
        
      }
    }

    useEffect(() => {

      getData()

      }, [location])
      function clickPage (page,pageSize){
        pageSize = 12
        let dataClone = Data.slice((pageSize*(page-1)),(pageSize*page))
        
        setDataFake(dataClone)
        
      }
   
  return (
    <>
    <div className='Listproduct-product'>
            {
                dataFake.map(function(value,index){
                  
                    return(
                        <div className='Listproduct-product-card' key={index} >
                                <Link to={`/product-detail/${value._id}`}>
                                        <Card hoverable cover={<img alt="example" src={value.thumbnail}  className="card-listproduct"/>}>
                                            <Meta title={value.productName} description={value.price?value.price.toLocaleString():"Het hang "} />
                                            </Card>
                                </Link>

                        </div>
                        
                    )
                    
                })
            }

            
    </div>
    
    <div>
               <Pagination defaultCurrent={1} total={dataFake.length} onChange={clickPage} />;
     </div>
    </>
  )
}

export default ListProduct