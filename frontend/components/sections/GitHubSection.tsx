"use client";

import React from "react";
import { Github, Star, GitFork, ExternalLink, Code2 } from "lucide-react";

interface RepoItem {
  name: string;
  description: string;
  language: string;
  url: string;
  topics: string[];
}

const REPOSITORIES: RepoItem[] = [
  {
    name: "sovereign-agent-architecture",
    description: "Autonomous multi-agent architecture built for sovereign LLMs and verifiable workflows",
    language: "Python",
    url: "https://github.com/MDineshkarthik0203/sovereign-agent-architecture",
    topics: ["langgraph", "multi-agent", "agentic-ai", "mistral-ai"],
  },
  {
    name: "Nexora-AI",
    description: "Next-generation intelligent agent platform for contextual reasoning and automation",
    language: "Python",
    url: "https://github.com/MDineshkarthik0203/Nexora-AI",
    topics: ["generative-ai", "rag", "fastapi", "react"],
  },
  {
    name: "AI-Student-Learning-Assistant",
    description: "Personalized adaptive learning companion powered by generative AI",
    language: "Python",
    url: "https://github.com/MDineshkarthik0203/AI-Student-Learning-Assistant",
    topics: ["ai-tutor", "generative-ai", "nlp", "llm"],
  },
  {
    name: "AI-E-commerce-Shopping-Assistant",
    description: "Conversational commerce agent for product recommendation and preference discovery",
    language: "Python",
    url: "https://github.com/MDineshkarthik0203/AI-E-commerce-Shopping-Assistant",
    topics: ["django", "conversational-ai", "recommendations"],
  },
  {
    name: "ai-knowledge-navigator-v2",
    description: "Scalable multi-source RAG engine and knowledge exploration interface",
    language: "Python",
    url: "https://github.com/MDineshkarthik0203/ai-knowledge-navigator-v2",
    topics: ["rag", "langchain", "vector-database", "deep-search"],
  },
];

export const GitHubSection: React.FC = () => {
  return (
    <section id="github" className="py-20 border-t border-border/80 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-white">
              <Github className="w-3.5 h-3.5" />
              <span>OPEN SOURCE ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              GitHub Repositories
            </h2>
            <p className="text-sm sm:text-base text-muted max-w-xl">
              Public repositories maintained by MDineshkarthik0203 across agentic workflows,
              educational assistants, and RAG pipelines.
            </p>
          </div>

          <a
            href="https://github.com/MDineshkarthik0203"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border hover:border-slate-600 text-white text-xs font-semibold transition-all group"
          >
            <span>Visit GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REPOSITORIES.map((repo, idx) => (
            <a
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border hover:border-accent/40 rounded-2xl p-6 flex flex-col justify-between transition-all group hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-white font-mono text-sm font-semibold group-hover:text-accent transition-colors">
                    <Code2 className="w-4 h-4 text-accent" />
                    <span className="truncate">{repo.name}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted group-hover:text-white transition-colors" />
                </div>

                <p className="text-xs text-muted leading-relaxed mb-4 line-clamp-3">
                  {repo.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {repo.topics.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border/80 text-slate-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span className="font-mono text-[11px]">{repo.language}</span>
                </div>
                <span className="font-mono text-[11px] text-accent">Public Repo</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
