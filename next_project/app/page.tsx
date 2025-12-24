import ExploreBtn from './components/ExploreBtn';
import EventCard from './components/EventCard';
import events from '@/lib/constants';
export default function HomePage() {  // ← Server Component
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pb-20">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        The Hackathons for Every Dev
        <br />
        Event You Cant Miss
      </h1>
      
      <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
        Hackathons, Meetups and Conferences All in one place
      </p>
      
      <ExploreBtn />
      
      <div className="mt-20 space-y-7 w-full max-w-4xl">
        <h3 className="text-3xl font-bold">Featured Events</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">  {/* ← Grid instead of ul */}
          {events.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}
