import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminMenu from '../adminMenu/AdminMenu'
import './AdminPage.css'

function AdminPage() {
  return (
    <div className='AdminPage'>
      <div className="adminPage-left">
        <AdminMenu></AdminMenu>
      </div>
      <div className="adminPage-right">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminPage