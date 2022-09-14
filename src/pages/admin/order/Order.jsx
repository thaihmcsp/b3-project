import { DatePicker, Space, Input, Table } from 'antd';
import { MenuOutlined, ShopOutlined } from '@ant-design/icons'
import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import './order.css'
import user from '../../../static/Truong/user.json'
import order from '../../../static/Truong/order.json'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom'
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
  const [getOrder , setGetOrder] = useState([])
  const [getUser , setGetUser] = useState([])
  const getOrders = async (value) => {
    try {
      let res = await getAPI('/order/get-all-order')
      console.log(33 , res);

      let orders = res.data.orders

      let users = orders.map(function(value){
        let listUsers = []
        listUsers.push(value.userId) 
        return listUsers
      })
      setGetUser(users)
      setGetOrder(orders)
    } catch (error) {
      console.log(35 , error);
    }
  }
  console.log(48 , getUser);
  console.log(42 , getOrder);

  for (let i = 0; i < getUser.length; i++) {
    const element = getUser[i];
    console.log(element[0]);
  }

  for (let i = 0; i < getOrder.length; i++) {
    const elementOrder = getOrder[i];
    for (let j = 0; j < getUser.length; j++) {
      const elementUser = getUser[j][0];
      if (elementOrder.userId._id === elementUser._id) {
        elementOrder.phone = elementUser.phone
        if (elementUser.username === true) {
          elementOrder.userName = elementUser.username
        }else{
          elementOrder.userName = elementUser.email
        }
      }
    }
  }

 console.log(61 , getOrder);
  let count = 0;
  for (let i = 0; i < getOrder.length; i++) {
    count += 1;
  }

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
      dataIndex: 'total',
      key: 'total',
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
      render: (status) => <select name={status} id="" style={{border: 'none'}}>
        <option value="pending">pending</option>
        <option value="cancel">cancel</option>
      </select>
    }
  ];

  function getOrderId (userNameOrder) {
    let orderId = '' 
    for (let i = 0; i < getOrder.length; i++) {
      const element = getOrder[i];
      if(element.userName = userNameOrder){
        orderId = element._id
      }
    }
    return orderId
  }
  // function getSelectValueOrder(){
  //   let select = document.querySelector('.typeSeacher').value
  //   console.log(select);
  // }

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
        {/* <div className='btn-product-delivery'>
          <button>Xuất</button>
        </div>
        <div className='btn-report'>
          <button><MenuOutlined /></button>
        </div> */}
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