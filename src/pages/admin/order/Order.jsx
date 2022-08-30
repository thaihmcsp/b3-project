import { DatePicker, Space , Input , Table } from 'antd';
import { MenuOutlined , ShopOutlined} from '@ant-design/icons'
import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import '../order/order.css'
import user from '../../../static/Truong/user.json'
import order from '../../../static/Truong/order.json'

for (let i = 0; i < order.length; i++) {
  const elementOrder = order[i];
  for (let j = 0; j < user.length; j++) {
    const elementUser = user[j];
    if(elementOrder.userId === elementUser._id){
      elementOrder.userName = elementUser.fullname
      elementOrder.phone = elementUser.phone
    }
  }
}

let count = 0 ;
for (let i = 0; i < order.length; i++) {
  count += 1;
}

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

const columns = [
  {
    title: 'userName',
    dataIndex: 'userName',
    key: 'userName',
    render: (text) => <a>{text}</a>,
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
  }
];

function Order() {
  return (
    <div className="classOrder">
      <div className="header-order">
        <span>Ngày đặt hàng </span>
        <div className='date-order'>
          <Space  direction="vertical" size={12}>
            <RangePicker />
          </Space>
        </div>
        <div className='btn-product-delivery'>
          <button>Xuất</button>
        </div>
        <div className='btn-report'>
          <button><MenuOutlined /></button>
        </div>
      </div>

      <div className="input-selector">
          <select id="typeSeacher">
            <option value="order-code">Mã đơn hàng </option>
            <option value="userName">Tên người mua </option>
            <option value="product">Sản phẩm </option>
            <option value="bill-code">Mã vận đơn </option>
          </select>
          <div className='input-search-order'>
            <Space direction="vertical">
              <Search placeholder="input search text" onSearch={onSearch} style={{ width: 700 , }}/>
            </Space>
          </div>
          <button id='btn-search-product'>Tìm Kiếm</button>
          <button id='btn-setAgain'>Đặt lại</button>
      </div>

      <div className='btn-delivery'> 
        <h1>{count} Đơn Hàng</h1>
        <div><button><span><ShopOutlined /></span><span>Giao Hàng Loạt</span></button></div>
      </div>

      {/* <div className='list-header-order'>
        <span>User name</span>
        <span>Tổng tiền</span>
        <span>Phone</span>
        <span>Địa chỉ</span>
        <span>Ngày tạo</span>
        <span>
          <select name="" id="header-transport-order">
            <option value="">Status</option>
            <option value="">pending</option>
            <option value="">delivering</option>
          </select>
        </span>
      </div>
      <div>
        {order.map(function(value){
          return (
            <div className='order-list'>
              <div id='userName'>{value.userName}</div>
              <div id='total'>{value.total}</div>
              <div id='phoneNumber'>{value.phone}</div>
              <div id='address-user-order'>{value.address}</div>
              <div id='createAt-order'>{value.createdAt}</div>
              <div id='status-order'>{value.status}</div>
            </div>
          )
        })}
      </div> */}
      <Table columns={columns} dataSource={order} />
    </div>
  )
}

export default Order