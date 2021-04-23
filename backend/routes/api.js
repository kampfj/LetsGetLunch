const express = require('express')
const Friends = require('../models/friends')
const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated')

/**
 * every interaction with the database should have the following shape 
 * try: 
    * make a call to DB to retrieve something: 
    *  if it's there: 
    *    do what you gotta do with it 
    *  otherwise: 
    *    res.send("ERROR: error message")
* catch: 
*   res.send('ERROR: error message')
**/

router.get('/', (req, res) => {
  res.send('On account API')
})

router.post('/friend', async (req, res) => {
  const { sender, getter } = req.body
  // if there already is a record for this sender and getter, want to update it to reflect that they are now friends. 
  // if there isn't we want to create it. 
  try {
    const res = await Friends.updateOne( { sender: sender, getter: getter}, { status: 2 } )
    if (res.n === 0) {
      await Friends.create( { sender: sender, getter: getter, status: 2 }, (err, results) => {
        if (err) {
          res.send(`Error: could not befriend ${getter}.`)
        } else {
          res.send(`Success! You are now friends with ${getter}.`)
        }
      })
    } else {
      res.send(`Success! You are now friends with ${getter}.`)
    }
  } catch (err) {
    res.send(`Error: there was a problem friending ${getter}.`)
  }
})

router.post('/unfriend', async (req, res, next) => {
  const { sender, getter } = req.body
  // if there already is a record for this sender and getter, want to update it to reflect that they are no longer friends
  // if there isn't then we remove it. 
  try {
    const res = await Friends.updateOne( { sender: sender, getter: getter}, { status: 1 } )
    if (res.n === 0) {
      res.send(`Error: Cannot unfriend ${getter}. You must be friends to unfriend someone.`)
    } else {
      res.send(`You are no longer friends with ${getter}.`)
    }
  } catch (err) {
    res.send(`Error: there was a problem friending ${getter}.`)
  }
})

module.exports = router