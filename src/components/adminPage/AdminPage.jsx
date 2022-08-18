import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminMenu from '../adminMenu/AdminMenu'

function AdminPage() {
  return (
    <div className='AdminPage'>
        <AdminMenu></AdminMenu>
        <Outlet/>
    </div>
  )
}

export default AdminPage