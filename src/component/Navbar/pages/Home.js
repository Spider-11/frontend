import React from 'react'
import './Home.css'
import PG from './PG.jpg'

const Home = () => {
  return (
    <div className='home'>
      <div className='header'>
        <h1>
            Stay closer to Home, While you are away
        </h1>
        </div>
        <div className='images'>
          <img src={PG} alt='PG Image'></img>
        </div>
    </div>
  )
}

export default Home
