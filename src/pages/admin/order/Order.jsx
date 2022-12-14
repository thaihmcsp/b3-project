import React from 'react'
import { Input, Space } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { AudioOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

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

  const onChange = (e) => {
    console.log('Change:', e.target.value);
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
      getItem('Item 1', null, null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
      getItem('Item 2', null, null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
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

  return (
    <div className='classOrder'>
      <div className='order-header'>
        <h4>Thêm 1 sản phẩm mới</h4>
        <p>Vui lòng chọn nghành hàng phù hợp cho sản phẩm của bạn</p>
      </div>
      <hr />
      <div className='search-product'>
        <span>Tên sản phẩm : </span><Input showCount maxLength={120} onChange={onChange} placeholder='Nhập vào'/>
      </div>
      <div className='order-body'>
        <div className="input-search">
          <Search
            placeholder="Tên nghành hàng"
            onSearch={onSearch}
            style={{
              width: '30%',
              borderRadius: 20
            }}
          /> <span>Chọn nghành hàng chính xác , <a href="">Bấm vào đây để tìm hiểu</a></span>
        </div>
        <div className="menuOrder">
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
    </div>
  )
}

export default Order