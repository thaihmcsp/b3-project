import React from 'react'
import data from '../../../static/Truong/productDetail.json'
import order from '../../../static/Truong/order.json'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react'
import './UserOrderHistory.css'



const items = [
  {
    label: 'Tất cả',
    key: 'all',
    icon: null,
  },
  {
    label: 'Chờ xác nhận',
    key: 'wait-confirm',
    icon: null,
  },
  {
    label: 'Chờ lấy hàng',
    key: 'wait-order',
    icon: null
  },
  {
    label: 'Đang giao',
    key: 'shipping',
    icon: null
  },
  {
    label: 'Đã giao',
    key: 'shipped',
    icon: null
  },
  {
    label: 'Đã hủy',
    key: 'cancel',
    icon: null
  }
];
console.log(data);
console.log(order);

function UserOrderHistory() {
  const [current, setCurrent] = useState('all');


  const onClick = (e) => {
    // console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div className='order-history'>
      <div className="order-history--item">
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      </div>
      <div className="order-product">

      </div>
    </div>
  )
}

export default UserOrderHistory