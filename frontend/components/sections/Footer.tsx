"use client";

import React from "react";
import { Terminal, Shield, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-muted">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-white font-medium">M Dinesh Karthik</span>
          <span>•</span>
          <span>AI Digital Twin Portfolio</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span className="flex items-center gap-1 text-slate-400">
            <Sparkles className="w-3 h-3 text-primary" /> Powered by LangGraph & Next.js
          </span>
          <span>•</span>
          <span>IIIT Kottayam (2024–2028)</span>
        </div>
      </div>
    </footer>
  );
};
