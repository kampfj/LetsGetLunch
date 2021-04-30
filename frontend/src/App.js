import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import NavBar from './NavBar'
import Homepage from './Homepage'
import Signup from './Signup'
import Login from './Login'
import Friends from './Friends'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [myPhoneNumber, setMyPhoneNumber] = useState('')

  const fetchLoggedIn = async () => {
    const { data } = await axios.get('/logged_in')
    setIsLoggedIn(data.isLoggedIn)
    setUsername(data.username)
  }

  const fetchNumber = async () => {
    const { data, status } = await axios.get('api/user/number')
    if (status !== 200 || data.includes('Error')) {
      window.alert(data)
    } else {
      console.log(`We got back ${data}`)
      setMyPhoneNumber(data)
    }
  }

  useEffect(async () => {
    const result = await axios.get('/logged_in')
    console.log(result.data.isLoggedIn)
    setIsLoggedIn(result.data.isLoggedIn)
    setUsername(result.data.username)
    setMyPhoneNumber(result.data.number)
  }, [])

  return (
    <>
      <Router>
        <NavBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          username={username}
          setUsername={setUsername}
        />
        <br />
        <Switch>
          <Route path="/" exact>
            <Homepage isLoggedIn={isLoggedIn} currentUsername={username} myPhoneNumber={myPhoneNumber} />
          </Route>
          <Route path="/signup" exact>
            <Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUsername={setUsername} setCurrentPhoneNumber={setMyPhoneNumber} />
          </Route>
          <Route path="/login" exact>
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setCurrentPhoneNumber={setMyPhoneNumber} />
          </Route>
          <Route path="/friends" exact>
            <Friends currentUsername={username} myPhoneNumber={myPhoneNumber} />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
