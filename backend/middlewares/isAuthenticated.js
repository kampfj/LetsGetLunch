const express = require('express')

const isAuthenticated = (req, res, next) => {
  if (!req.session.username) {
    next('user cannot be authenticated')
  } else {
    next()
  }
}

module.exports = isAuthenticated