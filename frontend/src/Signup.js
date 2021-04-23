import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHelper = async () => {
    const { data, status } = await axios.post('account/signup', { username, password })
    if (status !== 200 || data.includes('Error')) {
      window.alert(data)
    }
  }

  // TODO: Styling on this guy using Semantic UI. 
  return (
    <>
      <div> Hey there's we're on signup. </div>
    </>
  )
}

export default Signup
