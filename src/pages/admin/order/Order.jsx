import { DatePicker, Space, Input, Table } from 'antd';
import { MenuOutlined, ShopOutlined } from '@ant-design/icons'
import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import './order.css'
import user from '../../../static/Truong/user.json'
import order from '../../../static/Truong/order.json'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import { getAPI } from '../../../config/api';

const { RangePicker } = DatePicker;
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

function Order() {
  const [getOrder, setGetOrder] = useState([])
  const [getUser, setGetUser] = useState([])
  const getOrders = async (value) => {
    try {
      let res = await getAPI('/order/get-all-order')
      console.log(33, res);

      let orders = res.data.orders

      let users = []
      for (let i = 0; i < orders.length; i++) {
        const element = orders[i];
        users.push(element.userId)
      }

      setGetUser(users)
      setGetOrder(orders)
    } catch (error) {
      console.log(35, error);
    }
  }

console.log(48 , getUser);
  for (let i = 0; i < getOrder.length; i++) {
    const elementOrder = getOrder[i];
    for (let j = 0; j < getUser.length; j++) {
      const elementUser = getUser[j];
      console.log(55 ,elementOrder.userId._id);
      console.log(56 , elementUser._id);
      if (elementOrder.userId._id === elementUser._id) {
        elementOrder.userName = elementUser.username
        elementOrder.phone = elementUser.phone
      }
    }
  }

  let product = getOrder.map(function(value){
    return value.listProduct
  })

  let listProductDetail = product.map(function(valueProduct){
    for (let i = 0; i < valueProduct.length; i++) {
      const element = valueProduct[i];
      if (element.productDetailId) {
        return element.productDetailId
      }
    }
  })

  let listDetail = []
  for (let i = 0; i < listProductDetail.length; i++) {
    const element = listProductDetail[i];
    if (element !== undefined) {
      listDetail.push(element)
    }
  }

  for (let i = 0; i < getOrder.length; i++) {
    const elementOrder = getOrder[i];
    for (let j = 0; j < elementOrder.listProduct.length; j++) {
      const element = elementOrder.listProduct[j];
      for (let k = 0; k < listDetail.length; k++) {
        const elementListDetail = listDetail[k];
       if (element.productDetailId !== null) {
        if (element.productDetailId._id === elementListDetail._id) {
          elementOrder.price = elementListDetail.price
        }
       }
      }
    }
  }

  let count = 0;
  for (let i = 0; i < getOrder.length; i++) {
    count += 1;
  }

  console.log(112, getOrder);

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (text) =>
        <Link to={`/admin/order/${getOrderId(text)}`}>
          <a>{text}</a>
        </Link>,
    },
    {
      title: 'total',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Ngày tạo',
      key: 'createdAt',
      dataIndex: 'createdAt',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    }
  ];

  function getOrderId(userNameOrder) {
    let orderId = ''
    for (let i = 0; i < getOrder.length; i++) {
      const element = getOrder[i];
      if (element.userName = userNameOrder) {
        orderId = element._id
      }
    }
    return orderId
  }

  useEffect(() => {

    getOrders()

  }, [])

  return (
    <div className="classOrder">
      <div className="header-order">
        <span>Ngày đặt hàng </span>
        <div className='date-order'>
          <Space direction="vertical" size={12}>
            <RangePicker />
          </Space>
        </div>

      </div>

      <div className="input-selector">
        <select id="typeSeacher">
          <option value="userName">Tên người mua </option>
          <option value="phoneNumber">Số điện thoại</option>
        </select>
        <div className='input-search-order'>
          <Space direction="vertical">
            <Search className='ant-input-search-order' placeholder={'getSelectValueOrder()'} onSearch={onSearch} style={{ width: 720 }} />
          </Space>
        </div>
        <button id='btn-search-product' >Tìm Kiếm</button>
        <button id='btn-setAgain'>Đặt lại</button>
      </div>

      <div className='btn-delivery'>
        <h1>{count} Đơn Hàng</h1>
        <div><button><span><ShopOutlined /></span><span>Giao Hàng Loạt</span></button></div>
      </div>
      <Table columns={columns} dataSource={getOrder} />
    </div>
  )
}

export default Order