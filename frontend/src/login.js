import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom"
import axios from 'axios'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()


    const login = async (e) => {
        e.preventDefault()
        const { status } = await axios.post('/account/login', { username, password })
        if (status === 200) {
            history.push("/")
        } else {
          alert('You were not able to log in.') 
        }
      }

    return (
    <div>
        <form>
        <label for="username">Username:</label>
            <input type="text" id="username" name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label for="password">Password:</label>
            <input type="password" id="password" name="password"
              onChange={(e) => setPassword(e.target.value)}
              />
              
            <button onClick={login}> Log In </button>
            <p>Don't have an account? <Link to="/signup">Sign up here!</Link></p>
        </form>
    </div>
    )
}

export default Login