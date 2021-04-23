import React, { useState } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

const Login = ({ isLoggedIn, setIsLoggedIn, setUsername }) => {
  const [currentUsername, setCurrentUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHelper = async () => {
    const { data, status } = await axios.post('account/login', { username: currentUsername, password })
    console.log(data)
    if (status !== 200 || data.includes('Error')) {
      window.alert(data)
    } else {
      setUsername(currentUsername)
      setIsLoggedIn(true)
    }
  }

  // TODO: Styling on this guy using semantic UI. 
  return (
    <> 
      <div> Hi there we're on sign in. </div>
    </>
  )
}

export default Login
