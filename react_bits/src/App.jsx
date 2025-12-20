import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      {/* Page content placeholder */}
      <main className="pt-20">
        <section id="about" className="h-screen px-6 py-10">
          <h1 className="text-3xl font-bold">About section</h1>
        </section>
        <section id="services" className="h-screen px-6 py-10">
          <h1 className="text-3xl font-bold">Services section</h1>
        </section>
        <section id="contact" className="h-screen px-6 py-10">
          <h1 className="text-3xl font-bold">Contact section</h1>
        </section>
      </main>
    </div>
  );
}

export default App;
