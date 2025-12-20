// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Left: Company name */}
        <div className="text-lg font-semibold tracking-tight text-slate-100">
          YourCompany
        </div>

        {/* Right: Links */}
        <div className="hidden gap-8 text-sm font-medium text-slate-300 md:flex">
          <a href="#about" className="hover:text-white transition-colors">
            About Us
          </a>
          <a href="#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact Us
          </a>
        </div>

        {/* Mobile menu icon (optional, static for now) */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:bg-slate-800 hover:text-white md:hidden"
          aria-label="Open navigation"
        >
          <span className="block h-0.5 w-5 bg-current"></span>
          <span className="mt-1 block h-0.5 w-5 bg-current"></span>
          <span className="mt-1 block h-0.5 w-5 bg-current"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
