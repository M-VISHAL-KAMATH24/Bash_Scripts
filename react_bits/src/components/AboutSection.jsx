// src/components/AboutSection.jsx
import React from "react";
import Antigravity from "./Antigravity";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Antigravity takes entire section */}
      <div className="absolute inset-0">
        <Antigravity autoAnimate={true} />
      </div>

      {/* Simple white text to prove layering */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-white text-4xl font-bold">
          About section over Antigravity
        </h1>
      </div>
    </section>
  );
};

export default AboutSection;
