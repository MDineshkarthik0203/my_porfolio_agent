"use client";

import React, { useState } from "react";
import { Sparkles, Network, ArrowRight, ArrowDown, Database, Cpu, Layers, Terminal } from "lucide-react";

interface ArchNode {
  id: string;
  title: string;
  role: string;
  tech: string;
  description: string;
}

const ARCH_NODES: ArchNode[] = [
  {
    id: "visitor",
    title: "1. Visitor & Recruiter Interaction",
    role: "User Entry Point",
    tech: "Voice (Web Speech API) & Floating Chat UI",
    description: "The visitor inputs natural language via browser speech recognition or text chat with dual floating corner widgets.",
  },
  {
    id: "fastapi",
    title: "2. FastAPI Backend Gateway",
    role: "Validation, CORS & Rate Limiting",
    tech: "FastAPI, Pydantic, Python 3.11+",
    description: "Validates incoming chat turns, checks history, enforces CORS, and calls the LangGraph state graph execution run.",
  },
  {
    id: "supervisor",
    title: "3. LangGraph Portfolio Supervisor",
    role: "Intent Classification & Router Node",
    tech: "LangGraph StateGraph, Groq Llama-3.3 / Mistral",
    description: "Evaluates the visitor's goal, updates typed AgentState, and conditionally routes to one of 6 specialist agents.",
  },
  {
    id: "agents",
    title: "4. Specialist Agent Cluster",
    role: "Domain-Grounded Reasoning",
    tech: "Profile, Project, Skills, Resume, GitHub, Contact Agents",
    description: "Dedicated nodes equipped with specific tool schemas and strict system prompts preventing hallucinations.",
  },
  {
    id: "knowledge",
    title: "5. Grounded Knowledge & RAG Layer",
    role: "Fact Verification & Vector Search",
    tech: "data/*.json, Vector Store, GitHub REST API",
    description: "Provides verified ground truth for education (IIIT Kottayam), project specs, skill taxonomies, and live GitHub repos.",
  },
  {
    id: "output",
    title: "6. Synthesized Output & Speech",
    role: "Dual Delivery",
    tech: "Speech Synthesis & Streaming Markdown UI",
    description: "Returns first-person answers, citation sources, and speaks audio through the digital twin persona.",
  },
];

export const ArchitectureViewer: React.FC = () => {
  const [activeNode, setActiveNode] = useState<ArchNode>(ARCH_NODES[2]); // Default to supervisor

  return (
    <section id="architecture" className="py-20 border-t border-border/80 relative bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-primary">
            <Network className="w-3.5 h-3.5" />
            <span>AGENTIC SYSTEM SPECIFICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            LangGraph Supervisor Architecture
          </h2>
          <p className="text-sm sm:text-base text-muted max-w-2xl">
            Interactive visualization of the end-to-end multi-agent pipeline powering Dinesh's AI Digital Twin.
            Click any node below to inspect its execution lifecycle.
          </p>
        </div>

        {/* Interactive Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Diagram Steps */}
          <div className="lg:col-span-7 space-y-3">
            {ARCH_NODES.map((node, idx) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div key={node.id}>
                  <button
                    onClick={() => setActiveNode(node)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-card border-primary/50 shadow-md shadow-primary/5 ring-1 ring-primary/20"
                        : "bg-surface border-border hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                          isSelected ? "bg-primary text-black" : "bg-card text-muted"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{node.title}</h4>
                        <p className="text-xs text-muted font-mono">{node.role}</p>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? "text-primary translate-x-1" : "text-muted"
                      }`}
                    />
                  </button>

                  {idx < ARCH_NODES.length - 1 && (
                    <div className="flex justify-center my-1 text-slate-700">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Node Inspector */}
          <div className="lg:col-span-5 sticky top-28 bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="text-xs font-mono text-primary uppercase">Pipeline Stage Inspector</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface border border-border text-slate-300">
                Active Node
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">{activeNode.title}</h3>
              <p className="text-xs font-mono text-accent mt-0.5">{activeNode.role}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-surface border border-border">
                <span className="font-semibold text-slate-300 block mb-1">Technology Stack</span>
                <span className="font-mono text-primary">{activeNode.tech}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface border border-border">
                <span className="font-semibold text-slate-300 block mb-1">Execution Behavior</span>
                <p className="text-slate-300 leading-relaxed">{activeNode.description}</p>
              </div>
            </div>

            {/* Live routing table snippet for Supervisor */}
            {activeNode.id === "supervisor" && (
              <div className="p-3 rounded-xl bg-background border border-border/80 font-mono text-[11px] text-slate-400 space-y-1">
                <div className="text-accent font-semibold">// StateGraph Dynamic Router</div>
                <div>&quot;Who is Dinesh?&quot; → Profile Agent</div>
                <div>&quot;Explain Sovereign Agent&quot; → Project Agent</div>
                <div>&quot;What tech does he know?&quot; → Skills Agent</div>
                <div>&quot;Show me his GitHub&quot; → GitHub Agent</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
