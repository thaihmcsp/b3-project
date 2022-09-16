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
   const [dataClone,setDataClone]= useState([])
  const [brandz,setBrandz] = useState([])
  let page = cutLink.get("page")
    async function getData (){
      try {
            let cut = cutLink.get("search")
            let brandlink = cutLink.get("brand")
            let data = await instance.get(`/product/find-products-by-name?productName=${cut}`)
            // let dataAll = await instance.get(`/product/get-all-products`)
            // setDataClone(data.data.products)
            // console.log(dataAll);
            let dataMini = data.data.products
            // let z = []
            if(!brandlink){
              setDataClone(data.data.products.slice((12*(page-1)),(12*page)))
              // console.log(data.data.products.slice((12*(page-1)),(12*page)));
              setDataFake(data.data.products)
            }
            else if(brandlink){
                   setBrandz(brandlink.toUpperCase().split(" "))
                          console.log(brandlink.toUpperCase().split(" "));
                    for(let i=0;i<brandlink.toUpperCase().split(" ").length;i++){
                        console.log(brandlink.toUpperCase().split(" ")[i]);
                    let  z = dataMini.filter(function(value){
                        if(value.brand){
                          return value.brand.toUpperCase() === brandlink.toUpperCase().split(" ")[i]
                          // console.log(value.brand.toUpperCase());
                          // console.log(brandz[i]);
                        }
                      })
                     
                      setDataClone([...dataClone,z]);
                    }
                  }
                  
         
      } catch (error) {
        console.log(error);
      }
    }
    
    useEffect(() => {

      getData()

      }, [location])
      function clickPage (page){
        let pageSize = 12
      //  let dataCl = dataClone
       let clone = dataClone.slice((pageSize*(page-1)),(pageSize*page))
        console.log(clone);
        setDataClone(clone)
        
      }
   
  return (
    <>
    <div className='Listproduct-product'>
            {
                dataClone.map(function(value,index){
                  
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