import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import '../styles/index.css'
import { Image, Card, Button } from 'react-bootstrap'
import SMSForm from './SMSForm'

// Card component with destructured props
const Friends = ({ currentUsername }) => {
  const [friends, setFriends] = useState([])
  const [messageMode, setMessageMode] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(async () => {
    console.log(currentUsername)
    console.log('UMMM HIII')
    const { data, status } = await axios.get('api/user/friends')
    console.log('are we stilll heree')
    console.log(`Here is the data: ${data}`)
    if (status !== 200 || data.includes('Error')) {
      window.alert(data)
    } else {
      setFriends(data)
    }
  }, [])

  useEffect(async () => {
    const { data, status } = await axios.get('api/user/number')
    if (status !== 200 || data.includes('Error')) {
      window.alert(data)
    } else {
      setPhoneNumber(data)
    }
  })

  useEffect(async () => {
    const intervalID = setInterval(() => {
      console.log(messageMode)
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  const cardStyle = {
    borderRadius: 20,
  }

  const messageModeHelper = () => {
    console.log(messageMode)
    setMessageMode(true)
    console.log(messageMode)
  }

  return (
    <div>
      <div className="tinderCards__cardContainer">
        {friends.length === 0 && <h1> You have no friends to message :( go make some </h1>}
        {friends.map((username, index) => (
          <Card style={cardStyle} key={index} className="card">
            <Card.Body>
              <Card.Title> Hey I'm your friend {username} </Card.Title>
              <Card.Text>
                So many times people say they want to get together to get lunch but never really plan it - reach out to me and let's find a time.
              </Card.Text>
              <Button variant="outline-primary" onClick={(messageModeHelper)}> Message {username} </Button>
            </Card.Body>
            { messageMode ? <SMSForm username={currentUsername} phoneNumber={phoneNumber} messageMode={messageMode} setMessageMode={setMessageMode} /> : '' }
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Friends
