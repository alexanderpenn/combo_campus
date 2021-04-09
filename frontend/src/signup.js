import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom"
import axios from 'axios'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory() // am i handling history correctly?


    const signup = async (event) => {
      event.preventDefault()
      const { status } = await axios.post('/account/signup', { username, password })
      if (status === 200) {
          await axios.post('/account/login', { username, password })
          history.push("/")
      } else {
        alert('You were not able to sign up.') // TODO: give reason why
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

            <button onClick={signup}> Sign Up </button>
            <p>Already have an account? <Link to="/login">Log in here!</Link></p>
        </form>
    </div>
    )
}
export default Signup