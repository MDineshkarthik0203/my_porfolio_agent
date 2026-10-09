"use client";

import React, { useState } from "react";
import { FolderGit2, ExternalLink, Github, ArrowUpRight, Cpu, Layers, Sparkles, Check, X } from "lucide-react";

interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  agent_workflow: string;
  technologies: string[];
  highlights: string[];
  github_url: string;
  demo_url?: string | null;
  status: string;
  featured: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "sovereign-agent-architecture",
    name: "Sovereign Agent Architecture",
    tagline: "Autonomous multi-agent architecture built for sovereign LLMs and verifiable workflows",
    description: "An advanced agentic architecture exploring self-governing multi-agent coordination, state management, and sovereign LLM workflows. Designed to eliminate single-point failures and vendor lock-in in autonomous agents.",
    problem: "Traditional single-agent LLM chains are brittle, vendor-locked, and lack reliable multi-step decision loops, state persistence, and verifiable execution checkpoints.",
    solution: "Architected a modular agentic framework featuring hierarchical state tracking, dynamic task allocation across specialist agents, and local/open-weight model execution fallback.",
    agent_workflow: "Supervisor decomposes user objective -> dispatches sub-tasks to specialized domain nodes -> aggregates intermediate feedback -> verifies terminal state before returning response.",
    technologies: ["LangGraph", "LangChain", "Python", "Mistral AI", "Autonomous Agents", "Vector Search"],
    highlights: [
      "Dynamic agent routing with stateful memory loops",
      "Sovereign multi-model support including Mistral AI and open-source models",
      "Explicit error-recovery and task replanning nodes"
    ],
    github_url: "https://github.com/MDineshkarthik0203/sovereign-agent-architecture",
    demo_url: null,
    status: "Active / Research",
    featured: true
  },
  {
    id: "nexora-ai",
    name: "Nexora AI",
    tagline: "Next-generation intelligent agent platform for contextual reasoning and automation",
    description: "An end-to-end GenAI application providing deep document comprehension, conversational RAG, and agentic tool dispatch for knowledge workers.",
    problem: "Information fragmentation across disparate unstructured docs makes knowledge synthesis slow and prone to hallucinations.",
    solution: "Built a hybrid RAG pipeline with high-precision vector embeddings, semantic re-ranking, and conversational memory with streaming UI feedback.",
    agent_workflow: "User query -> Intent Classifier -> Semantic Vector Search + Chunk Reranking -> LLM Synthesis with Citations -> Streamed UI Output.",
    technologies: ["Generative AI", "RAG", "FastAPI", "Python", "Vector DB", "React"],
    highlights: [
      "Document ingestion and chunking pipeline with citation tracking",
      "Low-latency streaming responses",
      "Interactive conversational workspace"
    ],
    github_url: "https://github.com/MDineshkarthik0203/Nexora-AI",
    demo_url: null,
    status: "Completed / Production-ready",
    featured: true
  },
  {
    id: "ai-student-learning-assistant",
    name: "AI Student Learning Assistant",
    tagline: "Personalized adaptive learning companion powered by generative AI",
    description: "An educational AI agent tailored for university and high school students to synthesize complex engineering concepts, generate interactive quizzes, and track comprehension.",
    problem: "Standard educational chatbots offer one-size-fits-all responses without assessing the student's mastery level or providing progressive scaffolding.",
    solution: "Engineered an adaptive pedagogical agent that assesses student baseline knowledge, creates customized learning roadmaps, and tests retention with active recall.",
    agent_workflow: "Topic selection -> Diagnostic question generation -> Student response evaluation -> Dynamic difficulty adjustment -> Conceptual reinforcement.",
    technologies: ["Python", "Generative AI", "NLP", "LLM", "Prompt Engineering"],
    highlights: [
      "Adaptive difficulty calibration based on user answers",
      "Structured flashcard and quiz generator",
      "Conceptual breakdowns tailored for STEM topics"
    ],
    github_url: "https://github.com/MDineshkarthik0203/AI-Student-Learning-Assistant",
    demo_url: null,
    status: "Completed",
    featured: true
  },
  {
    id: "ai-ecommerce-shopping-assistant",
    name: "AI E-commerce Shopping Assistant",
    tagline: "Conversational commerce agent for product recommendation and preference discovery",
    description: "An autonomous conversational shopping assistant that understands natural language consumer intent, filters inventory with precision, and provides contextual rationale for product choices.",
    problem: "Static e-commerce search engines fail when users query by subjective criteria, complex lifestyle constraints, or implicit needs.",
    solution: "Developed a conversational AI assistant that extracts multi-parameter product constraints from chat, queries structured product databases, and explains why products match.",
    agent_workflow: "Natural language dialogue -> Entity and intent extraction -> SQL / Catalog query generation -> Constraint satisfaction check -> Conversational pitch generation.",
    technologies: ["Python", "Django REST Framework", "SQL", "LLM", "NLP"],
    highlights: [
      "Robust constraint extraction from natural dialogue",
      "Integration with relational catalog databases",
      "Transparent recommendation justification"
    ],
    github_url: "https://github.com/MDineshkarthik0203/AI-E-commerce-Shopping-Assistant",
    demo_url: null,
    status: "Completed",
    featured: false
  },
  {
    id: "ai-knowledge-navigator-v2",
    name: "AI Knowledge Navigator v2",
    tagline: "Scalable multi-source RAG engine and knowledge exploration interface",
    description: "Second-generation knowledge navigator offering multi-hop question answering across technical documentation, codebases, and research papers with zero-shot query expansion.",
    problem: "Complex technical queries often span multiple documents and require multi-step reasoning that single-pass RAG cannot handle.",
    solution: "Built a multi-step query expansion and iterative retrieval pipeline that surfaces cross-document relationships with verifiable source attribution.",
    agent_workflow: "Multi-hop query -> Sub-query decomposition -> Parallel vector searches -> Cross-document context fusion -> Synthesized response with line citations.",
    technologies: ["RAG", "LangChain", "Python", "Vector Embeddings", "FastAPI"],
    highlights: [
      "Multi-hop iterative reasoning",
      "High-recall query expansion",
      "Source verification and hallucination reduction"
    ],
    github_url: "https://github.com/MDineshkarthik0203/ai-knowledge-navigator-v2",
    demo_url: null,
    status: "Completed",
    featured: false
  }
];

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 border-t border-border/80 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-primary">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            AI Engineering Projects
          </h2>
          <p className="text-sm sm:text-base text-muted max-w-2xl">
            Production-oriented architectures demonstrating sovereign multi-agent coordination,
            state graphs with LangGraph, hybrid RAG pipelines, and conversational tools.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="bg-card border border-border hover:border-primary/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-muted">
                    {proj.status}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                  {proj.name}
                </h3>
                <p className="text-xs text-muted mt-1 mb-4 line-clamp-2">
                  {proj.tagline}
                </p>

                {/* Description snippet */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {proj.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.technologies.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border/70 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.technologies.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface border border-border/70 text-muted">
                      +{proj.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  Deep Architecture <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={proj.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-surface border border-border text-muted hover:text-white hover:border-slate-600 transition-colors"
                  title="View on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Architecture Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <span className="text-xs font-mono text-primary uppercase">Deep Architecture Blueprint</span>
                <h3 className="text-2xl font-bold text-white mt-1">{selectedProject.name}</h3>
                <p className="text-xs text-muted">{selectedProject.tagline}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg text-muted hover:text-white hover:bg-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-surface border border-red-500/20">
                <h4 className="font-semibold text-red-400 mb-1">Problem Addressed</h4>
                <p className="text-slate-300 leading-relaxed">{selectedProject.problem}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-primary/20">
                <h4 className="font-semibold text-primary mb-1">Architectural Solution</h4>
                <p className="text-slate-300 leading-relaxed">{selectedProject.solution}</p>
              </div>
            </div>

            {/* Agent Workflow */}
            <div className="p-4 rounded-xl bg-surface border border-accent/20 text-xs">
              <h4 className="font-semibold text-accent mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Agent Execution Graph
              </h4>
              <p className="font-mono text-slate-300 bg-background/60 p-3 rounded-lg border border-border">
                {selectedProject.agent_workflow}
              </p>
            </div>

            {/* Key Technical Highlights */}
            <div className="text-xs space-y-2">
              <h4 className="font-semibold text-white">Engineering Highlights</h4>
              <ul className="space-y-1.5">
                {selectedProject.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="text-xs space-y-2">
              <h4 className="font-semibold text-white">Full Stack & Frameworks</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="font-mono px-2.5 py-1 rounded bg-surface border border-border text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <a
                href={selectedProject.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface hover:bg-surfaceHover border border-border text-white text-xs font-semibold transition-all"
              >
                <Github className="w-4 h-4" /> View Source on GitHub
              </a>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl bg-primary text-black text-xs font-semibold hover:bg-primary/90 transition-all"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
