"use client";

import React, { useState } from "react";
import { Mail, Phone, Github, Linkedin, Copy, Check, Sparkles } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);

  const email = "dineshkarthik0218@gmail.com";
  const phone = "+91 9948435422";
  const linkedin = "https://www.linkedin.com/in/dinesh-karthik-madduluri-537821336";
  const github = "https://github.com/MDineshkarthik0203";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="py-20 border-t border-border/80 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-card via-card to-surface border border-border rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COLLABORATION & INQUIRIES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Connect With M Dinesh Karthik
            </h2>

            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Interested in discussing Agentic AI engineering, Generative AI projects,
              or prospective software roles? Feel free to reach out directly via email, phone, or LinkedIn.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-primary text-black font-semibold text-xs transition-all hover:bg-primary/90 shadow-md shadow-primary/20"
              >
                {copiedEmail ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                <span>{copiedEmail ? "Email Copied!" : email}</span>
              </button>

              {/* Phone / Call Button */}
              <a
                href="tel:+919948435422"
                onClick={(e) => {
                  // copy phone as well
                  navigator.clipboard.writeText(phone);
                }}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-surface border border-border text-white font-semibold text-xs transition-all hover:bg-surfaceHover hover:border-slate-600"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{phone}</span>
              </a>

              {/* LinkedIn Link */}
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-border text-white text-xs font-semibold hover:bg-surfaceHover hover:border-accent/40 transition-all"
              >
                <Linkedin className="w-4 h-4 text-accent" />
                <span>LinkedIn</span>
              </a>

              {/* GitHub Link */}
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-border text-white text-xs font-semibold hover:bg-surfaceHover transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
