import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const Login = () => {
  const history = useHistory()

  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState("")

  const handleOnChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {

      const { data } = await axios.post('http://localhost:5000/api/login', credentials)
      localStorage.setItem('token', data.payload)
      setCredentials({ username: "", password: "" })
      setLoading(false)
      history.push('/protected')
    } catch (e) {
      setLoading(false)
      setError("Try Lambda School, i<3Lambd4")
      setCredentials({ username: "", password: "" })
      setTimeout(() => { setError("") }, 4000)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleOnSubmit}>
        <input onChange={handleOnChange} type="text" name="username" value={credentials.username} />
        <input type="password" name="password" value={credentials.password} onChange={handleOnChange} />
        <input type="submit" value="submit" />
      </form>
      <h4 className="error">{error}</h4>
    </div>
  )
}