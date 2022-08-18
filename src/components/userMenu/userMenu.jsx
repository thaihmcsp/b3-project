import React from 'react'
import MenuProfile from './MenuProfile'
import { Outlet } from 'react-router-dom'
import './usermenu.css'
import Footer from '../footer/Footer'

function UserMenu() {
    return (
        <div className='user-menu'>
            <div className="container">
                <MenuProfile />
                <Outlet />
            </div>
            <Footer/>
        </div>
    )
}

export default UserMenu