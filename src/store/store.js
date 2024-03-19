import { useContext, createContext, useEffect, useState } from 'react'

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState("")

    let isLoggedIn = !!token

    const storeTokenLS = (item) => {
        setToken(item)
        return localStorage.setItem('token', item)
    }

    const logoutUser = () => {
        setToken('')
        localStorage.removeItem('token')
    }

    const AuthenticateUser = async () => {
        try {
            const response = await fetch("https://mern-server-q0i1.onrender.com/api/user/auth", {
                method: "POST",
                headers: {
                    token: token
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log('data on auth ', data)
                setUser(data);
            } else {
                console.log("error on auth")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        AuthenticateUser()
    }, [token])

    return (<authContext.Provider value={{ AuthenticateUser, storeTokenLS, logoutUser, isLoggedIn, user }}>
        {children}
    </authContext.Provider>)

}

export const useAuth = () => {
    return useContext(authContext)
}
