import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import '../styles/index.css'
import TinderCards from './TinderCards'

const Homepage = ({ isLoggedIn, currentUsername, myPhoneNumber }) => {

  return (
    <TinderCards isLoggedIn={isLoggedIn} currentUsername={currentUsername} myPhoneNumber={myPhoneNumber} />
  )
}

export default Homepage
