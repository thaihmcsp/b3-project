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
  const [selectValue, setSelectValue] = useState([])

  let token = window.localStorage.getItem("user")
  const getOrders = async (value) => {
    try {
      let res = await axios.get('https://shope-b3.thaihm.site/api/order/get-all-order' , { headers: { Authorization: token } })
      console.log(33 , res);
    } catch (error) {
      console.log(35 , error);
    }
  }
  getOrders()

  const getUsers = async (value) => {
    try {
      let resUser = await axios.get('https://shope-b3.thaihm.site/api/auth/get-loged-in-user' , { headers: { Authorization: token } })
      console.log(43 , resUser);
    } catch (errorUser) {
      console.log(45 , errorUser);
    }
  }
  getUsers()

  for (let i = 0; i < order.length; i++) {
    const elementOrder = order[i];
    for (let j = 0; j < user.length; j++) {
      const elementUser = user[j];
      if (elementOrder.userId === elementUser._id) {
        elementOrder.userName = elementUser.fullname
        elementOrder.phone = elementUser.phone
      }
    }
  }

 console.log(61 , order);
  let count = 0;
  for (let i = 0; i < order.length; i++) {
    count += 1;
  }

  const columns = [
    {
      title: 'IdOrder',
      dataIndex: '_id',
      key: '_id',
      render: (text) =>
      <Link to={`/admin/order//admin/order/${text}`}>
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
      render: (statusOrder) => <select name={statusOrder} id="" style={{border: 'none'}}>
        <option value="pending">pending</option>
        <option value="cancel">cancel</option>
      </select>
    }
  ];

  // function getOrderId (userNameOrder) {
  //   let orderId = '' 
  //   for (let i = 0; i < order.length; i++) {
  //     const element = order[i];
  //     if(element.userName = userNameOrder){
  //       orderId = element._id
  //     }
  //   }
  //   return orderId
  // }
  // function getSelectValueOrder(){
  //   let select = document.querySelector('.typeSeacher').value
  //   console.log(select);
  // }

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
      <Table columns={columns} dataSource={order} />
    </div>
  )
}

export default Order