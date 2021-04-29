import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'

const NavBar = props => {
  const { isLoggedIn, setIsLoggedIn, username, setUsername } = props

  const logoutHelper = async () => {
    const result = await axios.post('/account/logout', {})
    setIsLoggedIn(false)
    setUsername('')
  }

  const renderLoggedOutNavRoutes = () => (
    <>
      &nbsp;
      <Nav.Link as={Link} to="/signup">
        <Button size="sm" variant="outline-primary"> Sign Up </Button>
      </Nav.Link>
      &nbsp;
      <Nav.Link as={Link} to="/login">
        <Button size="sm" variant="outline-primary"> Login </Button>
      </Nav.Link>
    </>
  )

  const renderLoggedInNavRoutes = () => (
    <>
      <Navbar.Text>
        Signed in as: &nbsp;
        {username}
      </Navbar.Text>
      &nbsp; &nbsp;
      <Link to="/">
        <Button size="sm" variant="outline-secondary" onClick={logoutHelper}> Logout </Button>
      </Link>
    </>
  )

  return (
    <>
      <Navbar bg="light">
        <Link to="/">
          <Navbar.Brand> Let's Get Lunch </Navbar.Brand>
        </Link>
        { !isLoggedIn
        && (
          renderLoggedOutNavRoutes()
        )}
        { isLoggedIn
        && (
          renderLoggedInNavRoutes()
        )}
      </Navbar>
    </>
  )
}

export default NavBar
