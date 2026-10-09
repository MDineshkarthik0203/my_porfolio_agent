"use client";

import React, { useState } from "react";
import { Cpu, CheckCircle2, Sparkles, Code2, Database, Terminal, Layers } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: any;
  skills: { name: string; level: string; highlight?: boolean }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Generative AI & Agentic AI",
    icon: Sparkles,
    skills: [
      { name: "AI Agents & Multi-Agent Systems", level: "Advanced", highlight: true },
      { name: "LangGraph (State Graphs & Cycles)", level: "Advanced", highlight: true },
      { name: "LangChain Orchestration", level: "Advanced", highlight: true },
      { name: "Retrieval-Augmented Generation (RAG)", level: "Advanced", highlight: true },
      { name: "Large Language Models (LLMs)", level: "Advanced", highlight: true },
      { name: "Mistral AI", level: "Proficient", highlight: true },
      { name: "Groq High-Speed Inference", level: "Proficient" },
      { name: "Prompt Engineering & Evaluation", level: "Advanced" },
    ],
  },
  {
    title: "Machine Learning, DL & NLP",
    icon: Cpu,
    skills: [
      { name: "Machine Learning (ML)", level: "Proficient", highlight: true },
      { name: "Deep Learning (DL)", level: "Proficient", highlight: true },
      { name: "Natural Language Processing (NLP)", level: "Proficient", highlight: true },
      { name: "Vector Embeddings & Semantic Search", level: "Advanced", highlight: true },
      { name: "Neural Networks Fundamentals", level: "Proficient" },
    ],
  },
  {
    title: "Backend Engineering & Systems",
    icon: Terminal,
    skills: [
      { name: "Python", level: "Expert", highlight: true },
      { name: "FastAPI", level: "Advanced", highlight: true },
      { name: "Django & Django REST Framework", level: "Advanced", highlight: true },
      { name: "SQL & Relational Modeling", level: "Proficient", highlight: true },
      { name: "PostgreSQL & pgvector", level: "Proficient", highlight: true },
      { name: "RESTful API Architecture", level: "Advanced" },
    ],
  },
  {
    title: "Tools, DevOps & Observability",
    icon: Layers,
    skills: [
      { name: "LangSmith (Agent Observability)", level: "Proficient", highlight: true },
      { name: "Git & GitHub Version Control", level: "Advanced", highlight: true },
      { name: "Docker Containerization", level: "Familiar" },
      { name: "Linux / Shell Scripting", level: "Proficient" },
    ],
  },
];

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section id="skills" className="py-20 border-t border-border/80 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-accent">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Skills & Core Competencies
          </h2>
          <p className="text-sm sm:text-base text-muted max-w-2xl">
            Specialized engineering capabilities across modern Generative AI frameworks, backend
            systems, machine learning models, and full-stack interfaces.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? "bg-primary/10 border-primary/40 text-primary shadow-sm"
                    : "bg-surface border-border text-muted hover:text-white hover:border-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_CATEGORIES[activeTab].skills.map((skill, sIdx) => (
            <div
              key={sIdx}
              className={`p-4 rounded-xl border transition-all ${
                skill.highlight
                  ? "bg-card/90 border-primary/30 shadow-sm shadow-primary/5 hover:border-primary/60"
                  : "bg-surface border-border hover:border-slate-700"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold text-white leading-snug">{skill.name}</span>
                {skill.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                )}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted">
                <span className="font-mono text-[11px] uppercase tracking-wide">{skill.level}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
