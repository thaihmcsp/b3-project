import React, { useState } from 'react'
import FilterMenu from "./FilterMenu"
import ListProduct from "./ListProduct-filter"
import {useParams} from "react-router-dom"
import Data from "./../../../static/Truong/product.json"
import {useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"
import { useSearchParams } from "react-router-dom";
import { Pagination } from 'antd';
function FilterProduct() {
  const nav =useNavigate()
  const [cloneData,setCloneData]= useState(Data)
  // const condition = useParams()
  let [searchParams, setSearchParams] = useSearchParams();
  const [count,setCount] = useState(0)
  const location = useLocation()
  const [urlValue,setUrlValue] = useState([])
  const [dataPage,setDataPage]=useState(Data)
  let locationUrl = new URLSearchParams(location.search)
  let link=''
  function showData (){
    let page = locationUrl.get("page")
      let pageSize = locationUrl.get("pageSize")
      let start = pageSize*(page-1)
      let stop = page*pageSize
      let cutData = Data.slice(start,stop)
      setCloneData(cutData)
      // console.log(page,pageSize);
      // link = `/filter?page=${page}&pageSize=${pageSize}`
      // nav()
      setUrlValue([...urlValue,{page,pageSize}])
    if(locationUrl.get("brand")){
      
      let Brand = locationUrl.get("brand").split(" ");
      
      let cloneFilter = Data.filter(function(value){
        // console.log(value);
            for(let i=0;i<Brand.length;i++){
              if(value.brand === Brand[i]){
                return value
              }
            }
          })
          
          setCloneData(cloneFilter);
          setDataPage(cloneFilter)
   }
  
   
  }
function setCondition (valueBox){
  console.log(urlValue);
 console.log(valueBox);
   if(valueBox !="s"||valueBox !="r" || valueBox !="h" || valueBox !="o" || valueBox !="a" ){
    setUrlValue([valueBox,...urlValue])
  }
  if(valueBox === "s"){
    const index = urlValue.findIndex(function(value){
      return  value === "Samsung"
    })
    let urlClone = urlValue.splice(index,1)

    setUrlValue([...urlValue])
    console.log(urlClone);
  }
  if(valueBox === "r"){
    const index = urlValue.findIndex(function(value){
      return  value === "Redmi"
    })
    let urlClone = urlValue.splice(index,1)

    setUrlValue([...urlValue])
    console.log(urlClone);
  }
  if(valueBox === "h"){
    const index = urlValue.findIndex(function(value){
      return  value === "Hp"
    })
    let urlClone = urlValue.splice(index,1)

    setUrlValue([...urlValue])
    console.log(urlClone);
  }
 
  if(valueBox === "a"){
    const index = urlValue.findIndex(function(value){
      return  value === "Apple"
    })
    let urlClone = urlValue.splice(index,1)

    setUrlValue([...urlValue])
    console.log(urlClone);
  }
  if(valueBox === "o"){
    const index = urlValue.findIndex(function(value){
      return  value === "Oppo"
    })
    let urlClone = urlValue.splice(index,1)

    setUrlValue([...urlValue])
    console.log(urlClone);
  }
  
      if(!urlValue){
        link= "/filter"
      }
  console.log(urlValue);
  if(urlValue){
      
    for(let i=0;i<[valueBox,...urlValue].length;i++){
      if(i==0){
          if([valueBox,...urlValue][0] ==="s"||[valueBox,...urlValue][0] ==="r" || [valueBox,...urlValue][0] ==="h" || [valueBox,...urlValue][0] ==="o" || [valueBox,...urlValue][0] ==="a" ){

           
            link = `/filter?brand=${[...urlValue]}`
            
          }
          else if( [valueBox,...urlValue][0] !=="s"||[valueBox,...urlValue][0] !=="r" || [valueBox,...urlValue][0] !=="h" || [valueBox,...urlValue][0]!=="o" || [valueBox,...urlValue][0] !=="a") {
            link = `/filter?brand=${[valueBox,...urlValue][0]}`
          }
          
          
      }

      else  if( [valueBox,...urlValue][0] !=="s"||[valueBox,...urlValue][0] !=="r" || [valueBox,...urlValue][0] !=="h" || [valueBox,...urlValue][0]!=="o" || [valueBox,...urlValue][0] !=="a" && i!==0) {
        link = link+` ${[valueBox,...urlValue][i]}`
        
      }
     console.log(i);
    }
  }
 
  
  nav(link)
  
  
  
  console.log(location);
  console.log(link);
}
useEffect(() => {
  
  showData();

  
 
  
  }, [location])

  function clickPage (page,pageSize){
    pageSize = 12
    let dataClone = Data.slice((pageSize*(page-1)),(pageSize*page))
    
    setCloneData(dataClone)
    if(link){
      nav(link+` page=${page}&pageSize=${pageSize}`)
      // setUrlValue([...urlValue,{page,pageSize}])
    }
    else if (!link){
      
      nav(`/filter?page=${page}&pageSize=${pageSize}`)
    }
  console.log(urlValue);
  }
  return (
    <div className='Filter-flex'>
          <div  className='filter-menu-css'><FilterMenu setCondition={setCondition}></FilterMenu></div>
          <div className='product-css'>
                <div  ><ListProduct cloneData={cloneData} count={count}></ListProduct></div>
                <Pagination defaultCurrent={1} total={dataPage.length} onChange={clickPage} />;
          </div>
    </div>
  )
}

export default FilterProduct