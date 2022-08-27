import React from "react";
import { FiFilter } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import "./Menufilter.css"

function FilterMenu(props) {
  
  function Click (){
   let x = document.querySelector(".Samsung").value;
  //  console.log(document.querySelector(".Samsung").checked);
   document.querySelector(".Samsung").checked ? props.setCondition(x) : props.setCondition("s")
   
  }
  function ClickRedmi (){
    let x = document.querySelector(".Redmi").value;
  //  console.log(document.querySelector(".Samsung").checked);
   document.querySelector(".Redmi").checked ? props.setCondition(x) : props.setCondition("r")
  }
  function ClickHP (){
    let x = document.querySelector(".hp").value;
  //  console.log(document.querySelector(".Samsung").checked);
   document.querySelector(".hp").checked ? props.setCondition(x) : props.setCondition("h")
  }
 
    function ClickAP (){
      let x = document.querySelector(".Apple").value;
  //  console.log(document.querySelector(".Samsung").checked);
   document.querySelector(".Apple").checked ? props.setCondition(x) : props.setCondition("a")
    }
    function ClickOP (){
      let x = document.querySelector(".Oppo").value;
  //  console.log(document.querySelector(".Samsung").checked);
   document.querySelector(".Oppo").checked ? props.setCondition(x) : props.setCondition("o")
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

        <div className="filter-item">
          <input type="checkbox"  value={"Samsung"} className="Samsung" onChange={Click} />
          {/* <button >click</button> */}
          <div>
            <span>Sam Sung</span>
          </div>
        </div>

        <div className="filter-item">
          <input type="checkbox" value={"Redmi"} className="Redmi" onChange={ClickRedmi} />
          <div>
            <span>Redmi</span>
          </div>
        </div>

        <div className="filter-item">
          <input type="checkbox"   value={"Hp"} className="hp" onChange={ClickHP}/>
          <div>
            <span>HP</span>
          </div>
        </div>

        <div className="filter-item">
          <input type="checkbox"   value={"Apple"} className="Apple" onChange={ClickAP}/>
          <div>
            <span>Apple</span>
          </div>
        </div>
        <div className="filter-item">
          <input type="checkbox"   value={"Oppo"} className="Oppo" onChange={ClickOP}/>
          <div>
            <span>Oppo</span>
          </div>
        </div>
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
