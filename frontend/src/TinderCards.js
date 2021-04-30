import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import '../styles/index.css'
import '../styles/TinderCards.css'
import { Image, Card, Button } from 'react-bootstrap'
import TinderCard from 'react-tinder-card'

// Card component with destructured props
const TinderCards = ({ isLoggedIn, currentUsername, myPhoneNumber }) => {
  const [users, setUsers] = useState([])

  useEffect(async () => {
    const { data, status } = await axios.get('api/users')
    console.log(data)
    if (status !== 200 || data.includes('Error')) {
      window.alert(data)
    } else {
      setUsers(data)
    }
  }, [])

  const cardStyle = {
    borderRadius: 20,
  }

  // senderNumber -> number of person who is sending friend request
  // getterNumber -> number of person who is getting friend request
  const swiped = async (dir, username, senderNumber, getterNumber) => {
    console.log(`Sender is ${currentUsername}. Getter is ${username}`)
    console.log(`sender number is ${senderNumber}. Getter number is ${getterNumber}.`)
    if (dir === 'right' && isLoggedIn) {
      const { data, status } = await axios.post('api/friend', { sender: currentUsername, getter: username, senderNumber, getterNumber })
      if (status !== 200 || data.includes('Error')) {
        window.alert(data)
      }
    } else {
      console.log('tried to swipe but youre not logged in')
    }
  }

  const onCardLeftScreen = myIdentifier => {
    console.log(`${myIdentifier} left the screen`)
  }

  return (
    <div>
      <div className="tinderCards__cardContainer">
        {users.filter(user => user.username !== currentUsername).map(({ username, hometown, major, school, phoneNumber, image }, index) => (
          <TinderCard
            className="swipe"
            onSwipe={dir => swiped(dir, username, myPhoneNumber, phoneNumber)}
            onCardLeftScreen={() => onCardLeftScreen(username)}
            key={username}
            preventSwipe={['up', 'down']}
          >
            <Card style={cardStyle} className="card">
              <Card.Body>
                <Card.Title> {username} </Card.Title>
                <Card.Text>
                  Hey! I'm from {hometown}. I go to {school} and study {major}. Would love to get lunch with you sometime. Let's chat!
                </Card.Text>
              </Card.Body>
              { isLoggedIn ? <Card.Footer> Swipe right to add {username} as a friend, or swipe left to move on. </Card.Footer>
                : <Card.Footer> Log in to make friends and get lunch!! </Card.Footer> }
            </Card>
          </TinderCard>
        ))}
      </div>
    </div>
  )
}

export default TinderCards
