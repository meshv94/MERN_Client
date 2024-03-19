import React from 'react'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/store'
import { toast } from 'react-toastify';


const Logout = () => {
    const { logoutUser } = useAuth()

    useEffect(() => {
        logoutUser()
        toast.success(" Logout successful")
    }, [logoutUser])

    return <Navigate to="/login" />
}

export default Logout
