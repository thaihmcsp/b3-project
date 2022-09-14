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
      // let brandCut = []
      try {
            let cut = cutLink.get("search")
          let   brandCut = cutLink.get("brand")
          let data = await instance.get(`/product/find-products-by-name?productName=${cut}`)
          let data1 = data.data.products
          if(!brandCut){
            setDataFake(data.data.products);
          }
          else if(brandCut){
            let arrBrand = brandCut.split(" ")
              for(let i=0; i < arrBrand.length;i++ ){
                  let data2 = data1.filter((value)=>{
                  return value.brand === arrBrand[i]
                })
                console.log(data2); 
              } 
              
          }
      } catch (error) {
        console.log(error);
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