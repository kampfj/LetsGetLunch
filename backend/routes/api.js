const express = require('express')
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
)

const Friends = require('../models/friends')
const User = require('../models/user')

const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/', (req, res) => {
  res.send('On account API')
})

router.get('/users', async (req, res, next) => {
  try {
    await User.find((err, questions) => {
      if (questions) {
        res.send(questions)
      } else {
        next('Error: there was a problem loading the questions')
      }
    })
  } catch (err) {
    res.send(`Error: ${err}`)
  }
})

router.get('/user/friends', async (req, res, next) => {
  const currentUsername = req.session.username
  console.log(`Session username is ${currentUsername}`)
  try {
    await User.find({ username: currentUsername }, 'friends', (err, value) => {
      if (value) {
        console.log(value)
        const { friends } = value[0]
        console.log(`got friends with length ${friends.length}`)
        res.send(friends)
      } else {
        res.send(`Error: could not retrieve friends of ${currentUsername} because ${err}`)
      }
    })
  } catch (err) {
    res.send(`Error: ${err}`)
  }
})

router.get('/user/number', async (req, res, next) => {
  const currentUsername = req.session.username
  try {
    await User.find({ username: currentUsername }, 'phoneNumber', (err, value) => {
      if (value) {
        console.log(value)
        const { phoneNumber } = value[0]
        console.log(`phone number is ${phoneNumber}`)
        res.send(phoneNumber)
      } else {
        res.send(`Error: could not retrieve number of ${currentUsername} because ${err}`)
      }
    })
  } catch (err) {
    res.send(`Error: ${err}`)
  }
})

router.post('/friend', async (req, res) => {
  const { sender, getter, senderNumber, getterNumber } = req.body
  try {
    const result = await Friends.updateOne({ sender, getter }, { status: 2 })
    // are we updating an existing entry
    if (result.n === 0) {
      console.log('we are in the case where there is zero matching results')
      await Friends.create({ sender, getter, status: 2 }, async (err, results) => {
        if (err) {
          res.send(`Error: could not befriend ${getter}.`)
        } else {
          await User.updateOne({ username: sender }, { $addToSet: { friends: { name: getter, number: getterNumber } } }, (error, success) => {
            if (error) {
              console.log(error)
            }
          })
          await User.updateOne({ username: getter }, { $addToSet: { friends: { name: sender, number: senderNumber } } }, (error, success) => {
            if (error) {
              console.log(error)
            }
          })
          res.send(`Success! You are now friends with ${getter}.`)
        }
      })
    } else {
      console.log('we are in the case where there are some matching results')
      await User.updateOne({ username: sender }, { $addToSet: { friends: { name: getter, number: getterNumber } } }, (err, success) => {
        if (err) {
          console.log('we were unable to add you to the friends list')
        } else {
          console.log('successs')
        }
      })
      await User.updateOne({ username: getter }, { $addToSet: { friends: { name: sender, number: senderNumber } } }, (err, success) => {
        if (err) {
          console.log(err)
        }
      })
    }
  } catch (err) {
    res.send(`Error: there was a problem friending ${getter}.`)
  }
})

router.post('/unfriend', async (req, res, next) => {
  const { sender, getter, senderNumber, getterNumber } = req.body
  try {
    const result = await Friends.updateOne({ sender, getter }, { status: 1 })
    if (result.n === 0) {
      res.send(`Error: Cannot unfriend ${getter}. You must be friends to unfriend someone.`)
    } else {
      await User.updateOne({ username: sender }, { $pop: { friends: { name: getter, nunber: getterNumber } } })
      await User.updateOne({ username: getter }, { $pop: { friends: { name: sender, number: senderNumber } } })
      res.send(`You are no longer friends with ${getter}.`)
    }
  } catch (err) {
    await User.updateOne({ username: sender }, { $pop: { friends: { name: getter, number: getterNumber } } })
    await User.updateOne({ username: getter }, { $pop: { friends: { name: sender, number: senderNumber } } })
    res.send(`Error: there was a problem friending ${getter}.`)
  }
})

router.post('/messages', (req, res) => {
  res.header('Content-Type', 'application/json')
  client.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: req.body.to,
    body: req.body.body,
  })
    .then(() => {
      res.send(JSON.stringify({ sucess: true }))
    })
    .catch(err => {
      console.log(err)
      res.send(JSON.stringify({ success: false }))
    })
})

module.exports = router
