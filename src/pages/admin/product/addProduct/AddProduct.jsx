import React, { useState } from 'react'
import { Input, Space, Form, Button } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { AudioOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import '../addProduct/addProduct.css'
import axios from 'axios';
import { useEffect } from 'react';
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

  const listOrder = 'Chưa chọn nghành hàng'
  const [newProduct, setNewProduct] = useState([])
  let token = window.localStorage.getItem("user")
  // async function US() {
  //   try {
  //     let checkUS = await axios.get('https://shope-b3.thaihm.site/api/auth/get-loged-in-user', { headers: { Authorization: token } })
  //     console.log(checkUS);
  //   } catch (error) {

  //   }
  // }
  // let getToken = axios.get('url', { headers: { Authorization: token } })
  // console.log(27, getToken);
  console.log(26, token);
  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      let res = await axios.post('https://shope-b3.thaihm.site/api/product/create-product', values, { headers: { Authorization: token } })
      console.log(30, res);
    } catch (error) {
      console.log(32, error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // const addNewProduct = async (value) => {
  //   try {
  //     let res = await axios.post('https://shope-b3.thaihm.site/api/product/create-product' , value)
  //     console.log(29 , res);
  //   } catch (error) {
  //     console.log(31 , error);
  //   }
  // }

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


  // useEffect(() => {

  //   US()

  // }, [])


  return (
    <div className='classAddProduct'>
      <div className='addProduct-header'>
        <h4>Thêm 1 sản phẩm mới</h4>
        <p>Vui lòng chọn nghành hàng phù hợp cho sản phẩm của bạn</p>
      </div>

      <div className='search-product'>
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <Form.Item label="Tên sản phẩm :" name="productName" rules={[{ required: true, message: 'Hãy nhập vào tên sản phẩm' }]} >
            <Input id='search-product-input' showCount maxLength={120} onChange={onChange} placeholder='Nhập vào' />
          </Form.Item>
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

            <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
              <Button id='btn-addProduct' type="primary" htmlType="submit">
                Thêm sản phẩm
              </Button>
            </Form.Item>

            <div className='btn-next'>
              <Link to='/admin/product/detail/create'><button>Tiếp theo</button></Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default AddProduct