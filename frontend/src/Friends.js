import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import '../styles/index.css'
import { Image, Card, Button } from 'react-bootstrap'
import SMSForm from './SMSForm'

// Card component with destructured props
const Friends = ({ currentUsername, myPhoneNumber }) => {
  const [friends, setFriends] = useState([])
  const [messageMode, setMessageMode] = useState(false)

  useEffect(async () => {
    const { data, status } = await axios.get('api/user/friends')
    if (status !== 200 || data.includes('Error')) {
      window.alert(data)
    } else {
      setFriends(data)
    }
  }, [])

  const cardStyle = {
    borderRadius: 20,
  }

  const messageModeHelper = () => {
    setMessageMode(true)
  }

  return (
    <div>
      <div className="tinderCards__cardContainer">
        {friends.length === 0 && <h1> You have no friends to message :( go make some </h1>}
        {friends.map(({ name, number }, index) => (
          <Card style={cardStyle} key={index} className="card">
            <Card.Body>
              <Card.Title> Hey I'm your friend {name} </Card.Title>
              <Card.Text>
                So many times people say they want to get together to get lunch but never really plan it - reach out to me and let's find a time.
              </Card.Text>
              <Button variant="outline-primary" onClick={(messageModeHelper)}> Message {name} </Button>
            </Card.Body>
            { messageMode ? <SMSForm myUsername={currentUsername} yourUsername={name} myPhoneNumber={myPhoneNumber} yourPhoneNumber={number} setMessageMode={setMessageMode} /> : '' }
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Friends
