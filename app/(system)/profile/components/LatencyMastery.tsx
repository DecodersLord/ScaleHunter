import React from "react";

function LatencyMastery() {
  return (
    <>
      {/* Stat 2 */}
      <div className="flex flex-col border-b-4 border-secondary pb-6">
        <div className="flex justify-between text-secondary mb-4 items-end">
          <h4 className=" text-2xl font-bold tracking-widest">
            LATENCY WISDOM
          </h4>
          <span className="text-4xl font-display font-bold">89</span>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed font-sans">
          Sub-millisecond reactivity. Forging optimized caching layers and CDN
          edge networks to strike before the client request is even fully
          formed.
        </p>
      </div>
    </>
  );
}

export default LatencyMastery;
