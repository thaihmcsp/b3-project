import React, { Fragment } from 'react'
import productDetail from '../../../static/Truong/productDetail.json'
import order from '../../../static/Truong/order.json'
import product from '../../../static/Truong/product.json'
import { Menu } from 'antd';
import { useState } from 'react'
import './UserOrderHistory.css'
import { Link, Outlet } from 'react-router-dom';

// console.log(10, product);

const items = [
  {
    label: <Link to={'/user/order/'}>Tất cả</Link>,
    key: 'all',
    icon: null,
  },
  {
    label: <Link to={'/user/order/pending'}>Chờ xác nhận</Link>,
    key: 'wait-confirm',
    icon: null,
  },
  {
    label: <Link to={'/user/order/wait'}>Đã giao</Link>,
    key: 'shipping',
    icon: null
  },
  {
    label: <Link to={'/user/order/cancel'}>Đã hủy</Link>,
    key: 'cancel',
    icon: null
  }
];
// console.log(productDetail);
// console.log(order);
let data = []

data = JSON.parse(JSON.stringify(order));

productDetail.map((product) => {
  data.map((value) => {
    for (let i = 0; i < value.listProduct.length; i++) {
      if (value.listProduct[i].productDetailId === product._id) {
        value.listProduct[i].newData = product
        return data
      }
    }
  })
})

function UserOrderHistory() {
  const [current, setCurrent] = useState('all');


  const onClick = (e) => {
    // console.log('click ', e);
    setCurrent(e.key);
  };
  // console.log(67, data);

  return (
    <div className='order-history'>
      <div className="order-history--item">
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      </div>

      <div className="search-input">
        <svg width="19px" height="19px" viewBox="0 0 19 19"><g id="Search-New" stroke-width="1" fill="none" fill-rule="evenodd"><g id="my-purchase-copy-27" transform="translate(-399.000000, -221.000000)" stroke-width="2"><g id="Group-32" transform="translate(400.000000, 222.000000)"><circle id="Oval-27" cx="7" cy="7" r="7"></circle><path d="M12,12 L16.9799555,16.919354" id="Path-184" stroke-linecap="round" stroke-linejoin="round"></path></g></g></g></svg>
        <input type="text" placeholder='Tìm kiếm theo Tên Shop, ID đơn hàng hoặc tên sản phẩm' />
      </div>
      <Outlet></Outlet>
    </div>
  )
}

export { data }
export default UserOrderHistory