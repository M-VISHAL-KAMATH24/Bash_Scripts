'use client';
import React from 'react'

const ExploreBtn = () => {
  return (
    <button className='mt-7 mx-auto' type='button' id='explore-btn' onClick={()=>console.log('Click')}>
      <a href="#events">
        explore events      </a>
    </button>
  )
}

export default ExploreBtn