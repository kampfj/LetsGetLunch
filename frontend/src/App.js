import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import NavBar from './NavBar'
import Homepage from './Homepage'
import Signup from './Signup'
import Login from './Login'

// there's nothing rendering on this page. We're just setting up the frontend routes and delegating rendering to the individual components. 
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  const fetchLoggedIn = async () => {
    const { data } = await axios.get('/logged_in')
    console.log(data)
    setIsLoggedIn(data.isLoggedIn)
    setUsername(data.username)
  }

  useEffect(async () => {
    console.log(isLoggedIn)
    fetchLoggedIn()
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
            <Homepage />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/login" exact>
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
