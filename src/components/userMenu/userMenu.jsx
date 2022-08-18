import React from 'react'
import MenuProfile from './MenuProfile'
import { Outlet } from 'react-router-dom'

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