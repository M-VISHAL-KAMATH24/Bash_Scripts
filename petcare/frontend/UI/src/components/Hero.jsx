import React from 'react';

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-400 via-blue-300 to-indigo-500 flex items-center justify-center text-white px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Krish Vet Corner
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-lg">
            Expert pet care consultations. Book now for personalized advice on vaccines, health, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#book"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Book Appointment
            </a>
            <a
              href="#services"
              className="border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300"
            >
              Our Services
            </a>
          </div>
        </div>
        {/* Right: Image */}
        <div className="relative">
          <img
            src="/images/vet-hero.jpeg" // Happy vet with pet
            alt="Vet with pet"
            className="w-full h-96 object-cover rounded-3xl shadow-2xl mx-auto md:ml-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
