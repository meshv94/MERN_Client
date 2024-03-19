import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useAuth } from '../store/store'
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate()
  const { storeTokenLS } = useAuth()

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(user)
    try {
      const response = await fetch("https://mern-server-q0i1.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      const data = await response.json()
      // console.log(data)
      if (response.ok) {
        storeTokenLS(data.token)
        navigate('/home')
        toast.success(" Login successful")
      } else {
        toast.error(data.issues[0].message);
        // console.log(data)
      }
    } catch (error) {
      toast.error("Invalid Credentials")
    }
  }
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="https://cdn-icons-png.flaticon.com/256/8662/8662284.png"
                  alt=" let's fill the login form "
                  width="500"
                  height="500"
                />
              </div>

              {/* let tackle registration form  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">login form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Login
