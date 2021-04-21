const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')
const path = require('path')

const AccountRouter = require('./routes/account')
// const ApiRouter = require('./routes/api')
// const isAuthenticated = require('./middlewares/isAuthenticated')

const app = express()
const MONGO_URI = 'mongodb://localhost:27017/testdb'
const ONE_DAY = 24 * 60 * 60 * 1000

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))
app.use(express.json())

app.use(
  cookieSession({
    name: 'local-session',
    keys: ['spooky'],
    maxAge: ONE_DAY,
  }),
)

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('/logged_in', (req, res) => {
  if (!req.session.username) {
    res.send({
      isLoggedIn: false,
    })
  } else {
    res.send({
      isLoggedIn: true,
      username: req.session.username,
    })
  }
})

app.use('/account', AccountRouter)
// app.use('/api', ApiRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.use((err, req, res, next) => {
  console.log('hit the default error handlerrrr')
  res.status(500)
  res.json({ error: err })
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})