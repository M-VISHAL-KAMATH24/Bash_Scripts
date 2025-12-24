'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function AboutSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="w-full max-w-6xl mx-auto py-20 px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-80 h-80 md:w-96 md:h-96 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-green-400/20 to-blue-500/20 border-4 border-white/30 shadow-2xl group-hover:scale-105 transition-all duration-500">
            <Image
              src="/profile.jpeg"  // Add your photo here as public/profile.jpg
              alt="M Vishal Kamath"
              width={384}
              height={384}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 group-hover:brightness-110"
              priority
            />
          </div>
          {/* Glow effect */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-blue-500/30 rounded-2xl blur-xl animate-pulse" />
          )}
        </div>

        {/* Right: About Me */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Passionate Software Developer building modern web apps with Next.js, React, and Tailwind. 
            I love creating fast, beautiful experiences and staying ahead with the latest tech.
            I love creating fast, beautiful experiences and staying ahead with the latest tech.
            I love creating fast, beautiful experiences and staying ahead with the latest tech.
            I love creating fast, beautiful experiences and staying ahead with the latest tech.

            
          </p>
          
        </div>
      </div>
    </section>
  );
}
