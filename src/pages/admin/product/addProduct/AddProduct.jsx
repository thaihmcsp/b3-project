import React, { useState } from 'react'
import { Input, Space, Form, Button } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { AudioOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import '../addProduct/addProduct.css'
import axios from 'axios';
import { useEffect } from 'react';
import { instance } from '../../../../config/axios';
import { getAPI, postAPI } from '../../../../config/api';

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = (value) => console.log(value);

function AddProduct() {

  const listOrder = 'Chưa chọn ngành hàng'
  const [idProduct, setIdProduct] = useState([])
  const [count, setCount] = useState(0)


  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      let res = await postAPI('/product/create-product', values)
      console.log(30, res);
    } catch (error) {
      console.log(32, error);
      alert('Mặt hành này đã tồn tại')
    }
  };

  const getIdProduct = async (value) => {
    try {
      let resId = await getAPI('product/get-all-products')
      console.log(44, resId);
      console.log(resId.data.products);
      setIdProduct(resId.data.products)
    } catch (error) {
      console.log(46, error);
    }
  }

  console.log(59, idProduct);
  let idNewProduct = idProduct[idProduct.length - 1]?._id

  useEffect(() => {

    getIdProduct()

  }, [count])

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (e) => {
    console.log(24, 'Change:', e.target.value);
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
      getItem(null, null, null, [getItem('Apple', 'Apple'), getItem('SamSung', '2')], 'group')
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

  const onClick = (value) => {
    console.log(88, 'click', value.key);
    listOrder = value.key
    return listOrder
  };

  console.log(listOrder);




  return (
    <div className='classAddProduct'>
      <div className='addProduct-header'>
        <h4>Thêm 1 sản phẩm mới</h4>
        <p>Vui lòng chọn ngành hàng phù hợp cho sản phẩm của bạn</p>
      </div>
      <hr />
      <div className='search-product'>
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <Form.Item className='inp-search-addProduct' label="Tên sản phẩm :" name="productName" rules={[{ required: true, message: 'Hãy nhập vào tên sản phẩm' }]} >
            <Input className='input-addProductName' showCount maxLength={120} onChange={onChange} placeholder='Nhập vào' />
          </Form.Item>
          <div className='addProduct-body'>
            <div className="input-search">
              <Search
                placeholder="Tên ngành hàng"
                onSearch={onSearch}
                style={{
                  width: '30%',
                  borderRadius: 20
                }}
              /> <span>Chọn ngành hàng chính xác , <a className='link-addProduct' href="/">Bấm vào đây để tìm hiểu</a></span>
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

            <Link to={`/admin/product/${idNewProduct}/detail/create`}>
            <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
              <Button id='btn-addProduct' type="primary" htmlType="submit">
                Tiếp theo
              </Button>
            </Form.Item>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default AddProduct