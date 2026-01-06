import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Video Logo + Brand */}
          <a href="/" className="flex items-center space-x-3">
            <video
              src="/videos/logo.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-10 h-10 lg:w-12 lg:h-12 object-contain rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              Krish Vet Corner
            </span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-10">
            {['Home', 'About', 'Services', 'Blog'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-medium text-white hover:text-green-400 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href="#book"
            className="hidden md:block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-7 py-3 rounded-2xl font-semibold text-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            Book Appointment
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 focus:outline-none"
          >
            {open ? (
              <X size={26} className="text-white" />
            ) : (
              <Menu size={26} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-black/80 backdrop-blur-lg rounded-2xl mt-2">
            <ul className="flex flex-col p-6 space-y-4">
              {['Home', 'About', 'Services', 'Blog'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block py-3 px-4 font-medium text-white hover:text-green-400 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#book"
                  className="block bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-semibold text-center mt-2"
                  onClick={() => setOpen(false)}
                >
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
