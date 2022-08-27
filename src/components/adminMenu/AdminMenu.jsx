import React from 'react'
import { FormOutlined, ShoppingOutlined, ProfileOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './AdminMenu.css'

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
    getItem('Quản lí đơn hàng', 'sub1', <FormOutlined />, [
        getItem('Tất cả đơn hàng', 'g1', null),
        getItem('Đơn hủy', 'g2', null),
        getItem('Trả hàng/Hoàn tiền', 'g3', null),
    ]),
    getItem('Quản lí sản phẩm', 'sub2', <ShoppingOutlined />, [
        getItem('Tất Cả Sản Phẩm', '5'),
        getItem('Thêm sản phẩm', '6'),
        getItem('Sửa sản phẩm', '7'),
        getItem('Phân loại sản phẩm', '8'),
    ]),
    getItem('Quản lí hồ sơ', 'sub3', <SettingOutlined />, [
        getItem('Trang cá nhân', '7'),
        getItem('Đổi mật khẩu', '8'),
    ]),
];

function AdminMenu() {


    return (
        <div className='menu-admin'>
                <Menu
                    style={{
                        width: '100%',
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
                    mode="inline"
                    items={items}
                />

        </div>



    )
}

export default AdminMenu