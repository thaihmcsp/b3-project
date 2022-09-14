import React from "react";
import { FiFilter } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import "./Menufilter.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const dataCheck = ["SamSung","Redmi","HP","Apple","Oppo"]
function FilterMenu() {
  let [filterBox ,setFilterBox] = useState([])
  
  let nav = useNavigate()

function changeBox (vbox){
  let check = document.querySelector(`.${vbox}`).value
  let cheKbox = document.querySelector(`.${vbox}`).checked
   let l = ""
   let del = [...filterBox].findIndex(function(value){
    return value === vbox
  })
  console.log(del);
  if(!cheKbox){

  console.log("bo tick");
}
else{
   
  console.log("tick");
}



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
