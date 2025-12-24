import React from 'react'
import ExploreBtn from './components/ExploreBtn'

const page = () => {
  return (
    <div>
      <section>

      <h1 className='text-center'>
        The Hackathons for Every Dev
        <br />
        Event You Cant Miss
      </h1>
      <p className='text-center mt-5'>Hackathons, Meetups and Conferences All in one place</p>
      <ExploreBtn/>
      </section>
    </div>
  )
}

export default page