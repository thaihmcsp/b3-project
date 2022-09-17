import React, { useState } from 'react'
import Data from "./product.json"
import {useEffect} from "react"
import { Card } from 'antd';
import "./Listproduct-filter.css"
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
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
  let nav = useNavigate()
  let page = cutLink.get("page")
  useEffect(() => {

    getData()

    }, [location])
    async function getData (){
      // let brandCut = []
      try {
            let cut = cutLink.get("search")
            let brandlink = cutLink.get("brand")
            let data = await instance.get(`/product/find-products-by-name?productName=${cut}`)        
            let dataMini = data.data.products
            let push =[]
            if(!brandlink){
              setDataClone(data.data.products.slice((12*(page-1)),(12*page)))
              // console.log(data.data.products.slice((12*(page-1)),(12*page)));
              setDataFake(data.data.products)
             
            }
            else if(brandlink){
                   setBrandz(brandlink.toUpperCase().split(" "))

                    dataMini.map(function(value){
                        if(value.brand){
                          for(let i=0;i<brandlink.toUpperCase().split(" ").length;i++){
                              if(brandlink.toUpperCase().split(" ")[i] === value.brand.toUpperCase() ){
                                push.push(value) 
                                
                                setDataClone(push.slice((12*(page-1)),(12*page)));
                                setDataFake(push)
                              }
                          }
                        }
                    })

                  }

      } catch (error) {
        console.log(error);
      }
    }
    
      function clickPage (page){
        let pageSize = 12
      //  let dataCl = dataClone
       let clone = dataFake.slice((pageSize*(page-1)),(pageSize*page))
        
        setDataClone(clone)
        let link = location.search.split("&")
        let mini = link[1].split("=")
        let l = ""
           mini[1] = page
       
        if(link.length === 3){

           l = link[0]+"&"+mini.join("=")+"&"+link[2]
          
        }
        if(link.length === 2){
          l = link[0]+"&"+mini.join("=")
          
        }
        nav(l)
      }
   
  return (
    <>
    <div className='Listproduct-product'>
            {
                dataClone.map(function(value,index){
                
                    return(
                        <div className='Listproduct-product-card' key={index} >
                                <Link to={`/product-detail/${value._id}`}>
                                        <Card hoverable cover={<img alt="example" src={value.thumbnail.startsWith("http")?value.thumbnail:'https://shope-b3.thaihm.site/'+value.thumbnail}  className="card-listproduct"/>}>
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