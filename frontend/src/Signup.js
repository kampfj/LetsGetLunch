import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Button, Form } from 'react-bootstrap'

const Signup = ({ isLoggedIn, setIsLoggedIn, setCurrentUsername }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('')
  const [hometown, setHometown] = useState('')
  const [major, setMajor] = useState('')
  const [school, setSchool] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const submitHelper = async () => {
    const { data, status } = await axios.post('account/signup', { username, password, phoneNumber, image, hometown, major, school })
    if (status !== 200 || data.includes('Error')) {
      window.alert(data)
    }
    setIsLoggedIn(true)
    setCurrentUsername(username)
    console.log(data)
    console.log('posted to the db')
  }

  return (
    <>
      <Container>
        <Form>
          <h1> Sign up </h1>
          <Form.Group>
            <Form.Label> Username </Form.Label>
            <Form.Control value={username} placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
            <Form.Text className="text-muted">
              Your username is what will show up when you ask a question in class!
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label> Password </Form.Label>
            <Form.Control value={password} type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label> Profile Picture </Form.Label>
            <Form.Control value={image} placeholder="Enter image URL" onChange={e => setImage(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label> Hometown </Form.Label>
            <Form.Control value={hometown} placeholder="Tell us where you're from..." onChange={e => setHometown(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label> School </Form.Label>
            <Form.Control value={school} placeholder="Enter university name" onChange={e => setSchool(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label> Major </Form.Label>
            <Form.Control value={major} placeholder="Enter major" onChange={e => setMajor(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.Label> Phone Number </Form.Label>
            <Form.Control value={phoneNumber} placeholder="Enter number" onChange={e => setPhoneNumber(e.target.value)} />
          </Form.Group>

          <Link to="/">
            <Button size="sm" variant="outline-primary" type="submit" onClick={submitHelper}>
              Sign me up!
            </Button>
          </Link>
          <br /> <br />
          Already have an account? &nbsp;
          <Link to="/login">
            <Button size="sm" variant="outline-primary">
              Log in!
            </Button>
          </Link>
        </Form>
      </Container>
    </>
  )
}

export default Signup
