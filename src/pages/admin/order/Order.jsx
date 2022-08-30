import { DatePicker, Space , Input } from 'antd';
import { MenuOutlined , ShopOutlined} from '@ant-design/icons'
import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import '../order/order.css'
import '../../../static/Truong/order.json'

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
        <h1>0 Đơn Hàng</h1>
        <div><button><span><ShopOutlined /></span><span>Giao Hàng Loạt</span></button></div>
      </div>

      <div className='list-header-order'>
        <span>Sản phẩm</span>
        <span>Tổng đơn hàng</span>
        <span>Trạng thái</span>
        <span>Đếm ngược</span>
        <span>
          <select name="" id="header-transport-order">
            <option value="">Vận chuyển</option>
            <option value="">Nhanh</option>
            <option value="">Tiết kiệm</option>
            <option value="">Hỏa tốc</option>
            <option value="">Khác</option>
          </select>
        </span>
        <span>Thao tác</span>
      </div>
    </div>
  )
}

export default Order