import { DatePicker, Space, Input, Table, Select } from 'antd';
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
import { getAPI, patchAPI } from '../../../config/api';

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

const { Option } = Select;

const onSearch = (value) => {

  console.log('value', value);
}
function Order() {
  const [getOrder, setGetOrder] = useState([])
  const [getUser, setGetUser] = useState([])
  const [savePlaceholder, setSavePlaceholder] = useState([])
  const [valueSelect, setValueSelect] = useState([])
  const [changeStatus , setChangeStatus] = useState('')
  const getOrders = async (value) => {
    try {
      let res = await getAPI('/order/get-all-order')
      console.log(33, res);

      let orders = res.data.orders
      let statusPending = orders.filter(function (value) {
        return value.status === 'pending'
      })

      let statusCancel = orders.filter(function (value) {
        return value.status === "canceled"
      })

      let statusDone = orders.filter(function (value) {
        return value.status === "done"
      })

      let order = [...statusPending, ...statusCancel, ...statusDone]
      let users = []
      for (let i = 0; i < orders.length; i++) {
        const element = orders[i];
        users.push(element.userId)
      }

      setGetUser(users)
      setGetOrder(order)
    } catch (error) {
      console.log(35, error);
    }
  }

  for (let i = 0; i < getOrder.length; i++) {
    const elementOrder = getOrder[i];
    for (let j = 0; j < getUser.length; j++) {
      const elementUser = getUser[j];
      // console.log(55 ,elementOrder.userId._id);
      // console.log(56 , elementUser._id);
      if (elementOrder.userId._id === elementUser._id) {
        elementOrder.userName = elementUser.email
        elementOrder.phone = elementUser.phone
      }
    }
  }

  let product = getOrder.map(function (value) {
    return value.listProduct
  })

  let listProductDetail = product.map(function (valueProduct) {
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

  async function onChangeStatus(e) {
    console.log('e' , e.target.id);
    const id = e.target.id
    const value = e.target.value
    setChangeStatus(value)
    try {
      let res = await patchAPI('/order/change-order-status/' + id, {status: changeStatus})
      console.log(127 , res.data.order);
    } catch (error) {
      console.log(error);
    }
  }
  const columns = [
    {
      title: 'ID ',
      dataIndex: '_id',
      key: '_id',
      render: (text) => {

        return (
          <Link to={`/admin/order/${text}`}>
            <a>{text}</a>
          </Link>
        )
      }
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
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
      render: (text) => {
        let date = new Date(text)
        let dateTime = date.toLocaleDateString()
        return dateTime
      }
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text, record) => {
        return (
          <select name="" id={record._id} value={text} style={{ border: 'none' }} onChange={(e) => onChangeStatus(e)}>
            <option value="pending">pending</option>
            <option value="canceled">canceled</option>
            <option value="done">done</option>
          </select>
        )
      }
    }
  ];

  const handleChange = (value, text) => {
    setSavePlaceholder(text.children)
    setValueSelect(value)
  };

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
        <Select
          id="typeSeacher"
          defaultValue='Tên người mua'
          style={{
            width: 120,
          }}
          onChange={handleChange}
        >
          <Option value="userName">Tên người mua</Option>
          <Option value="phone">Số điện thoại</Option>
        </Select>
        <div className='input-search-order'>
          <Space direction="vertical">
            <Search className='ant-input-search-order' placeholder={savePlaceholder} onSearch={onSearch} style={{ width: 720 }} />
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