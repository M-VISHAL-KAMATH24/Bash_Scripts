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
      <div className='mt-20 space-y-7'>
        <h3>featured events</h3>
        <ul className='events'>
          {[1,2,3,4,5].map((event)=>(
            <li key={event}>Event {event}</li>
          ))}
        </ul>

      </div>
      </section>
    </div>
  )
}

export default page