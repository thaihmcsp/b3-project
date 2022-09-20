import React, { useEffect } from 'react'
import { EditOutlined, UserOutlined, FileDoneOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import axios from 'axios';
import { getAPI } from '../../config/api';



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
    getItem('Tài khoản của tôi', 'sub1', <UserOutlined />, [
        getItem(<Link to={'/user'}>Hồ sơ </Link>, '1'),
        getItem(<Link to={'/user/changePassword'}>Đổi mật khẩu </Link>, '2'),
    ]),
    getItem(<Link to='/user/order'>Đơn mua</Link>, 'sub2', <FileDoneOutlined />),
]; // submenu keys of first level

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

function MenuProfile() {
    const [data, setData] = useState({})
    const token = window.localStorage.getItem('user')
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const [Url, setUrl] = useState('')
    const [count , setCount] = useState(0)

    const domain = 'https://shope-b3.thaihm.site/'
    let link = ''


    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const getData = async () => {
        try {
            let res = await getAPI('auth/get-loged-in-user')
            link = res.data.user.avatar 

            if(!link.startsWith('https')){
                link = domain + link
            }
            setUrl(link)
            setData(res.data.user)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getData()
    }, [count])

    return (
        <div className='menu'>
            <div className="menu-header">
                <div className="header-left">
                    <img src={Url ? Url : "https://64.media.tumblr.com/970f8c9047f214078b5b023089059228/4860ecfa29757f0c-62/s640x960/9578d9dcf4eac298d85cf624bcf8b672a17e558c.jpg"} alt="" />
                </div>
                <div className="header-right">
                    <h5>{data.email ? data.email: "Đang tải"}</h5>
                    <p><EditOutlined /> Sửa hồ sơ</p>
                </div>
            </div>
            <div className="menu-list">
                <Menu
                    mode="inline"
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    style={{
                        width: '100%',
                        background: '#f5f5f5'
                    }}
                    items={items}
                />
            </div>
        </div>
    )
}

export default MenuProfile