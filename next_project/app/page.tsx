import AboutSection from './components/AboutSection';
import ExploreBtn from './components/ExploreBtn';

export default function HomePage() {  // Remove 'async' for now
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        M Vishal Kamath
        <br />
        Software Dev
      </h1>
      
      <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
        passionate , workoholic , amazing
      </p>
      
      <ExploreBtn />
      <AboutSection/>
      <div className="mt-20 space-y-7 w-full max-w-4xl">
        <h3 className="text-3xl font-bold">Featured Events</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Static data - no API */}
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <h4 className="font-semibold text-xl mb-2">React Conf 2026</h4>
            <p className="text-gray-400">Jan 15, 2026</p>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <h4 className="font-semibold text-xl mb-2">Next.js Workshop</h4>
            <p className="text-gray-400">Feb 20, 2026</p>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <h4 className="font-semibold text-xl mb-2">Hackathon Live</h4>
            <p className="text-gray-400">Mar 5, 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}
