const express = require('express')
const User = require('../models/user')

const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/', (req, res) => {
  res.send('On account router')
})

router.post('/signup', async (req, res) => {
  const { username, password, image, phoneNumber, hometown, major, school } = req.body
  try {
    await User.create({ username, password, image, phoneNumber, hometown, major, school }, (err, user) => {
      if (user) {
        req.session.username = username
        req.session.password = password
        req.session.number = phoneNumber
        res.send('we logged you in')
      } else {
        res.send(`Error: we could not log you in due to ${err}`)
      }
    })
  } catch (err) {
    res.send(`Error: ${err}`)
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password, number } = req.body
  console.log(number)
  try {
    await User.findOne({ username, password }, (err, user) => {
      if (user) {
        req.session.username = username
        req.session.password = password
        req.session.number = number
        res.send('we logged you in')
      } else {
        res.send('Error: we could not log you in')
      }
    })
  } catch (err) {
    res.send(`Error: ${err}`)
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session = {}
  res.send('successfully logged out')
})

module.exports = router
