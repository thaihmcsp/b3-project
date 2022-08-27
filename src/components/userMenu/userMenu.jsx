import React from 'react'
import MenuProfile from './MenuProfile'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import './usermenu.css'
function UserMenu() {
    return (
        <div className='user-menu'>
            <div className="container">
                <MenuProfile />
                <Outlet />
            </div>
        </div>
    )
}

export default UserMenu