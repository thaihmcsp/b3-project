import { DatePicker, Space , Input } from 'antd';
import { MenuOutlined , ShopOutlined} from '@ant-design/icons'
import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import '../order/order.css'
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
          <div className='input-search'>
            <Space direction="vertical">
              <Search placeholder="input search text" onSearch={onSearch} style={{ width: 800 , }}/>
            </Space>
          </div>
          <button id='btn-search-product'>Tìm Kiếm</button>
          <button id='btn-setAgain'>Đặt lại</button>
      </div>

      <div className='btn-delivery'> 
        <h1>0 Đơn Hàng</h1>
        <div><button><span><ShopOutlined /></span><span>Giao Hàng Loạt</span></button></div>
      </div>
    </div>
  )
}

export default Order