import React from 'react'
import "../components/navbar.css"
import { NavLink } from "react-router-dom"
import { useAuth } from '../store/store'

const Navbar = () => {
    const { isLoggedIn , user } = useAuth()
    return (
        <>
            <header>
                <div className="navbar">
                    <div className="logo">
                        <img src="https://cdn-icons-png.flaticon.com/128/3800/3800024.png" alt="logo" width={40} height={40} />
                    </div>
                    <div className="items">
                        <ul>
                            <NavLink to="/home">Home</NavLink>
                            <NavLink to="/contact">Contact</NavLink>
                            { isLoggedIn ? 
                            <>
                            {user.isAdmin ? (<NavLink to="/admin" >Admin</NavLink>) : ''} 
                            <NavLink to="/logout" >Logout</NavLink> 
                            </>
                            : 
                            <>
                                <NavLink to="/register">Register</NavLink>
                                <NavLink to="/login" >Login</NavLink>
                            </>
                            }
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar
