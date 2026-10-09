"use client";

import React from "react";
import Image from "next/image";
import { User, Cpu, Shield, Network, GraduationCap, MapPin } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 border-t border-border/80 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-primary">
            <User className="w-3.5 h-3.5" />
            <span>ENGINEER PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            About M Dinesh Karthik
          </h2>
          <p className="text-sm sm:text-base text-muted max-w-2xl">
            Undergraduate Computer Science student at IIIT Kottayam dedicated to building autonomous
            agent architectures, deterministic AI workflows, and resilient software infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Portrait & Fast Metadata Card */}
          <div className="lg:col-span-4 bg-card border border-border rounded-2xl p-6 flex flex-col justify-between">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-border/60 bg-surface mb-6">
              <Image
                src="/dinesh-portrait.png"
                alt="M Dinesh Karthik"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-border/60">
                <span className="text-muted flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-accent" /> Institution
                </span>
                <span className="font-semibold text-white">IIIT Kottayam</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-border/60">
                <span className="text-muted flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-primary" /> Degree
                </span>
                <span className="font-semibold text-white">BTech Computer Science</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-border/60">
                <span className="text-muted flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Location
                </span>
                <span className="font-semibold text-white">Kerala / India</span>
              </div>
            </div>
          </div>

          {/* Narrative & About Me Details */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-bold text-white">About Me</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                I am an aspiring AI Engineer currently pursuing my Bachelor of Technology in Computer Science at the <span className="text-primary font-medium">Indian Institute of Information Technology (IIIT) Kottayam</span> (2024–2028).
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                My passion lies at the intersection of <span className="text-primary font-medium">Generative AI, Autonomous AI Agents, and Retrieval-Augmented Generation (RAG)</span>. I specialize in building stateful multi-agent architectures using LangGraph and LangChain, developing custom RAG pipelines, and integrating foundation models like Mistral AI and open-source LLMs into real-world applications.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Beyond AI agents, I have strong foundations in backend engineering with <span className="text-accent font-medium">Python, Django, Django REST Framework, FastAPI, and SQL</span>, allowing me to build robust, scalable, and end-to-end intelligent products.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Network className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-white">Agentic AI & LangGraph</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Building stateful agent supervisors, cyclic decision graphs, and autonomous multi-agent coordination.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-white">RAG & GenAI Systems</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Developing high-precision vector search, semantic embeddings, and verifiable knowledge retrieval.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-white">Backend & APIs</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Robust API architectures with Python, Django REST Framework, FastAPI, and PostgreSQL/SQL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
