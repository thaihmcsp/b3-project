import React from 'react'
import { FormOutlined, ShoppingOutlined, ProfileOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

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
        getItem('Sản Phẩm Vi Phạm', '6'),
    ]),
    getItem('Chăm sóc khách hàng', 'sub3', <ProfileOutlined />, [
        getItem('Trợ lí chat', '7'),
        getItem('Hỏi - Đáp', '8'),
    ]),
    getItem('Quản lí hồ sơ', 'sub4', <SettingOutlined />, [
        getItem('Trang cá nhân', '9'),
        getItem('Đổi mật khẩu', '10'),
        getItem('Đánh giá', '11'),
        getItem('Tất cả mã giảm giá', '12'),
    ]),
];

function AdminMenu() {


    return (
        <div className='menu-admin'>
            <div className="menu-admin-left">
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
            <div className="menu-admin-right">

            </div>
        </div>



    )
}

export default AdminMenu