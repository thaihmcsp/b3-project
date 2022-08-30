import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import React, { useState } from 'react';
import { Input } from 'antd';
import './AddProduct.css'
import { Select } from 'antd';
const { Option } = Select;
function AddProduct() {

  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem('Điện thoại', 'sub1', null, [
   
    ]),
    getItem('Laptop', 'sub2', null, [

    ]),
    getItem('Máy tính bảng', 'sub3', null, [

    ]),
    getItem('Âm thanh', 'sub4', null, [

    ]),
    getItem('Đồng hồ', 'sub5', null, [

    ]),
    getItem('Nhà thông minh', 'sub6', null, [

    ]),
    getItem('Phụ kiện', 'sub7', null, [

    ]),
    getItem('PC - Màn hình', 'sub8', null, [

    ]),
    getItem('Tivi', 'sub9', null, [

    ]),

  ];

  const onClick = (e) => {
    console.log('click', e);
  };

  return (
    <div className='classAddProduct'>
      <div className='addProduct-header'>
        <h4>Thêm 1 sản phẩm mới</h4>
        <p>Vui lòng chọn nghành hàng phù hợp cho sản phẩm của bạn</p>
      </div>
      <hr />
      <div className='search-product'>
        <span>Tên sản phẩm : </span><Input showCount maxLength={120} onChange={onChange} placeholder='Nhập vào' />
      </div>
      <div className='addProduct-body'>
        <div className="input-search">
          <Search
            placeholder="Tên nghành hàng"
            onSearch={onSearch}
            style={{
              width: '30%',
              borderRadius: 20
            }}
          /> <span>Chọn nghành hàng chính xác , <a className='link-addProduct' href="/">Bấm vào đây để tìm hiểu</a></span>
        </div>
        <div className="menuAddProduct">
          <Menu
            onClick={onClick}
            style={{
              width: 256,
            }}
            mode="vertical"
            items={items}
          />
        </div>
      </div>
      <div className='footer-addProduct'>
        <div className='chose-addProduct'>
          Đã chọn :   <p> {listOrder}</p>
        </div>
        <div className='btn-next'>
          <button>Tiếp theo</button>
        </div>
      </div>
    </div>
  )
}

export default AddProduct