import React from 'react'
import MenuProfile from './MenuProfile'
import { Outlet } from 'react-router-dom'
import './usermenu.css'
import Header from '../header/Header'
import Footer from '../footer/Footer'

function UserMenu() {
    return (
        <div className='user-menu'>
                <Header/>
            <div className="container">
                <MenuProfile />
                <Outlet />
            </div>
        </div>
    )
}

export default UserMenu