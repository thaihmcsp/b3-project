import React from 'react'
import MenuProfile from './MenuProfile'
import { Outlet } from 'react-router-dom'
<<<<<<< HEAD
=======
import './usermenu.css'
>>>>>>> 86220023a592891ca982b71c97a3d1b9a07350de

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