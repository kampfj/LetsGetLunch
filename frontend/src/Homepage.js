import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import '../styles/index.css';
import TinderCard  from './TinderCard'


const Homepage = () => {
  const [users, setUsers] = useState([])

  useEffect(async () => {
    const { data, status } = await axios.get('api/users')
      if (status !== 200 || data.includes('ERROR')) {
        window.alert(data)
      } else {
        console.log(data)
        setUsers(data)
      }
  }, [])

  
  return (
    <div className='Card'>
      {/* //   {/* Traversing through cards arrray using map function
      //   and populating card with different image and color */} 
      {users.map( ({username, hometown, major, school, image }) => {
        <TinderCard image={image} color={'#0a043c'} username={username} hometown={hometown} major={major} school={school} />
      })}
    </div>
  )
}

export default Homepage