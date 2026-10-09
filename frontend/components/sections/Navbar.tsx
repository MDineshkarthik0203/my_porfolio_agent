"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mic, Sun, Moon, Github, Linkedin, ExternalLink } from "lucide-react";

interface NavbarProps {
  onTalkToAI?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTalkToAI }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTalkClick = () => {
    if (onTalkToAI) {
      onTalkToAI();
    } else {
      const el = document.getElementById("ai-digital-twin-stage");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#090B10]/90 backdrop-blur-md border-b border-border/80 py-3 shadow-xl"
          : "bg-[#090B10]/40 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand: </> DINESH */}
        <Link href="#home" className="flex items-center gap-2 group">
          <div className="flex items-center gap-1.5">
            <span className="text-primary font-mono text-lg font-bold group-hover:scale-105 transition-transform">
              &lt;/&gt;
            </span>
            <span className="font-extrabold text-base tracking-wider text-white group-hover:text-primary transition-colors">
              DINESH
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-slate-300">
          <Link
            href="#home"
            className="text-white font-semibold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-primary"
          >
            Home
          </Link>
          <Link href="#about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="#projects" className="hover:text-white transition-colors">
            Projects
          </Link>
          <Link href="#skills" className="hover:text-white transition-colors">
            Skills
          </Link>
          <a
            href="#home"
            onClick={handleTalkClick}
            className="hover:text-primary transition-colors text-primary/90"
          >
            Ask My AI
          </a>
          <Link href="#github" className="hover:text-white transition-colors">
            GitHub
          </Link>
          <Link href="#education" className="hover:text-white transition-colors">
            Resume
          </Link>
          <Link href="#contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Controls: Theme Toggle & Talk to My AI button */}
        <div className="flex items-center gap-3">
          {/* Theme icon */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Talk to My AI prominent CTA */}
          <button
            onClick={handleTalkClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-500/25 hover:scale-[1.03] active:scale-[0.98]"
          >
            <Mic className="w-3.5 h-3.5 animate-pulse" />
            <span>Talk to My AI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
