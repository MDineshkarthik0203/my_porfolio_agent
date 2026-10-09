"use client";

import React from "react";

interface WaveformVisualizerProps {
  isActive: boolean;
  color?: string;
  barCount?: number;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  isActive,
  color = "bg-primary",
  barCount = 16,
}) => {
  return (
    <div className="flex items-center justify-center gap-1 h-8 px-2">
      {Array.from({ length: barCount }).map((_, i) => {
        // Vary delay and animation durations for realistic sound wave effect
        const delay = (i % 5) * 0.15;
        const duration = 0.6 + ((i % 4) * 0.2);
        return (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-300 ${color}`}
            style={{
              height: isActive ? `${Math.max(6, (Math.sin(i * 1.5) * 12 + 16))}px` : "3px",
              animation: isActive ? `waveBar ${duration}s ease-in-out infinite` : "none",
              animationDelay: `${delay}s`,
              opacity: isActive ? 0.9 : 0.3,
            }}
          />
        );
      })}
    </div>
  );
};
