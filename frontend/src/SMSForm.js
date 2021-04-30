import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import { Modal, Container, Form, Button } from 'react-bootstrap'

const SMSForm = ({ myUsername, myPhoneNumber, yourPhoneNumber, username: yourUsername, setMessageMode }) => {
  // if you're friends you get to see their number
  const [message, setMessage] = useState('')

  const sendMessageHelper = async () => {
    const completeMessage = `${myUsername} sent you a message via Let's Get Lunch: ${message}. Reach out to them at ${myPhoneNumber}!`
    await setMessage(completeMessage)
    const { status, data } = await axios.post('api/messages', { to: yourPhoneNumber, body: completeMessage })
    setMessageMode(false)
  }

  const cancelHandler = () => {
    setMessageMode(false)
  }

  return (
    <>
      <Modal show backdrop="static" keyboard="false">
        <Modal.Header>
          <Modal.Title> Send a message to {yourUsername} </Modal.Title>
        </Modal.Header>
        <Form>
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
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SMSForm
