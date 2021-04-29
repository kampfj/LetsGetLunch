import React from 'react'
import ReactDOM from 'react-dom'
import '../styles/index.css'
import { Frame, useMotionValue, useTransform, useAnimation } from 'framer'
  
// Card component with destructured props
const TinderCard = ({ image, color, username, major, hometown, school}) => {
  const [swipeLeft, setSwipeLeft] = useState(false)
  const [swipeRight, setSwipeRight] = useState(false)


  // To move the card as the user drags the cursor
  const motionValue = useMotionValue(0)
  
  // To rotate the card as the card moves on drag
  const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50])
  
  // To decrease opacity of the card when swipped
  // on dragging card to left(-200) or right(200)
  // opacity gradually changes to 0
  // and when the card is in center opacity = 1
  const opacityValue = useTransform(
    motionValue,
    [-200, -150, 0, 150, 200],
    [0, 1, 1, 1, 0]
  )
  
  // Framer animation hook
  const animControls = useAnimation()
  
  // Some styling for the card
  // it is placed inside the card component
  // to make backgroundImage and backgroundColor dynamic
  const style = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundColor: color,
    boxShadow: '5px 10px 18px #888888',
    borderRadius: 10,
    height: 300
  }

  const swipeLeftHelper = () => {
    setSwipeLeft(true)
    window.alert(`You swiped left on ${username}`)
  }

  const swipeRightHelper = () => {
    setSwipeRight(true)
    window.alert(`You swiped right on ${username}. You will now be added as friends.`)
  }
  
  return (
    <>
      <div className='Card'>
        <Frame
          center
          // Card can be drag only on x-axis
          drag='x'
          x={motionValue}
          rotate={rotateValue}
          opacity={opacityValue}
          dragConstraints={{ left: -1000, right: 1000 }}
          style={style}
          onDragEnd={(event, info) => {
            
            // If the card is dragged only upto 150 on x-axis
            // bring it back to initial position
            if (Math.abs(info.point.x) <= 150) {
              animControls.start({ x: 0 });
            } else {
              
              // If card is dragged beyond 150
              // make it disappear
              animControls.start({ x: info.point.x < 0 ? -200 : 200 });
              if (info.point.x < 0) {
                swipeLeftHelper()
              } else {
                swipeRightHelper()
              }

            }
          }}
        >
          Username: {username}
          <br/>
          Major: {major}
          <br/>
          Hometown: {hometown}
          <br/>
          School: {school}
        </Frame>
      </div>
    </>
  )
}

export default TinderCard