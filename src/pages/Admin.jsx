import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

const Admin = () => {
    return (
        <>
            <div className="admin-container admin-dashboard my-10">
                <section className='adminSideBar'>
                    <ul>
                        <li> <NavLink to="/home">Home</NavLink> </li>
                        <li><NavLink to="/admin/users">users</NavLink></li>
                        <li><NavLink to="/admin/contacts">contacts</NavLink></li>
                    </ul>
                </section>
                <Outlet />
            </div>
        </>
    )
}

export default Admin
