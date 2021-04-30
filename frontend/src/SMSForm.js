import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import { Modal, Container, Form, Button } from 'react-bootstrap'

const SMSForm = ({ phoneNumber, username, recipient, messageMode, setMessageMode }) => {
  // if you're friends you get to see their number
  const [myNumber, setMyNumber] = useState('')
  const [message, setMessage] = useState('')

  const sendMessageHelper = async () => {
    const { status, data } = await axios.post('api/messages', { to: phoneNumber, body: message })
    setMessageMode(false)
  }

  const cancelHandler = () => {
    setMessageMode(false)
  }

  return (
    <>
      <Modal show={messageMode} backdrop="static" keyboard="false">
        <Modal.Header>
          <Modal.Title> Send a message to {username} </Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group>
            <Form.Label> Enter your phone number here </Form.Label>
            <Form.Control value={myNumber} placeholder="Enter number..." onChange={e => setMyNumber(e.target.value)} />
            <Form.Text className="text-muted">
              Don't worry - your number is not visible to our backend and your data is safe.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label> Message </Form.Label>
            <Form.Control value={message} placeholder="Enter message" onChange={e => setMessage(e.target.value)} />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button size="sm" variant="outline-primary" onClick={sendMessageHelper}>
            Send
          </Button>
          <Button size="sm" variant="outline-secondary" onClick={cancelHandler}> Cancel </Button>
          <Redirect to="/"> </Redirect>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SMSForm
