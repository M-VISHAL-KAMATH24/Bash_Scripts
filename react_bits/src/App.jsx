// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="pt-20">
        <AboutSection />

        <section
          id="services"
          className="min-h-screen flex items-center justify-center px-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Services</h2>
        </section>

        <section
          id="contact"
          className="min-h-screen flex items-center justify-center px-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Contact</h2>
        </section>
      </main>
    </div>
  );
}

export default App;
