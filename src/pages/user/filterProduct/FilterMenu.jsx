import React from "react";
import { FiFilter } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import "./Menufilter.css"
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const dataCheck = ["SamSung","Redmi","HP","Apple","Oppo"]
function FilterMenu() {
  let [filterBox ,setFilterBox] = useState([])
  let [valueCheckbox,setValueCheckbox] = useState([])
  let nav = useNavigate()
  let location = useLocation()
  console.log(location.search);
  let brand = new URLSearchParams(location.search)
  
function changeBox (vbox){
  let check = document.querySelector(`.${vbox}`).value
  let cheKbox = document.querySelector(`.${vbox}`).checked
   let l = ""
   let linkCheck = ""
   let  brandSearch = brand.get("brand")
  
   if(!cheKbox){
    setValueCheckbox([...valueCheckbox])
     let del = brandSearch.split(" ").findIndex((value)=>{return value === check})
     let cut = brandSearch.split(" ").splice(del,1)
     console.log(brandSearch.split(" ").splice(del,1));
     console.log(valueCheckbox);
     console.log(brandSearch.split(" "));
     linkCheck=location.search
     //  console.log(brandSearch.split(" "));
    }
    else{
      setValueCheckbox([...valueCheckbox,check])
      l = [...valueCheckbox,check].join(" ")
      if(!brandSearch){
        linkCheck =location.search +`&brand=${l}`
      }
      else if (brandSearch){
        linkCheck = location.search+` ${check}`
      }
      
    }
    
nav(linkCheck)

}
  return (
    <div className="filter-menu">
      <div className="filter-menu-header">
        <FiFilter className="icon-filter" />
        <h2>BỘ LỌC TÌM KIẾM</h2>
      </div>

      {/* ==============THEO DANH MỤC================= */}
      <div className="filter-menu-list">
        <p>Theo Danh Mục</p>

        <div className="filter-item">
          <input type="checkbox"  />
          <div>
            <span>LapTop</span>
          </div>
        </div>

        <div className="filter-item">
          <input type="checkbox" />
          <div>
            <span>Điện Thoại</span>
          </div>
        </div>

        <div className="filter-item">
          <input type="checkbox" />
          <div>
            <span>PC</span>
          </div>
        </div>

        <div className="add">
          Thêm
          <AiOutlineDown className="icon-add" />
        </div>
      </div>
      <div className="line"></div>
      {/* ==============THEO DANH MỤC (DONE)================= */}

      {/* ==============THEO THƯƠNG HIỆU================= */}
      <div className="filter-menu-list">
      <p>Theo Thương Hiệu</p>
      {
        dataCheck.map((value,index)=>{
              return(

                <div className="filter-item" key={index}>
                <input type="checkbox"  value={value}  className={value} onChange={()=>{changeBox(value)}}/>
                {/* <button >click</button> */}
                <div>
                  <span>{value}</span>
                </div>
              </div>

              )
                 
          
                
        })
        
      }
      </div>
      <div className="line"></div>
      {/* ==============THEO THƯƠNG HIỆU (DONE)================= */}

      {/* ==============THEO KHOẢNG GIÁ================= */}
      <div className="filter-menu-list">
        <p>Khoảng Giá</p>

        <div className="filter-item-price">
          <input type="text" placeholder="₫ TỪ" className="price" />
          <div className="price-line"></div>
          <input type="text" placeholder="₫ ĐẾN" className="price" />
        </div>
        <button className="price-btn">ÁP DỤNG</button>
      </div>
    </div>
  );
}

export default FilterMenu;
