import React from 'react';
export function LeaderboardHero() {
  return (
    <div className="w-full bg-white shadow-sm mb-8">
      {/* Main Hero Banner */}
      <div className="w-full max-w-7xl mx-auto">
        <img
          src="/1.png"
          alt="Colombo Dockyard Leaderboard Banner"
          className="w-full h-auto object-cover" />

      </div>

      {/* Title Section matching the design aesthetic */}
      <div className="text-center py-8 bg-[#D6DEFF]">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 tracking-tight">
          LEADERBOARD
        </h1>
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="h-px w-16 bg-black/50"></div>
          <div className="text-2xl text-black/70">❦</div>
          <div className="h-px w-16 bg-black/50"></div>
        </div>
        <p className="text-xl text-gray-800 font-medium tracking-wide uppercase">
          THINK ANEW, RISE TOGETHER
        </p>
      </div>
    </div>);

}