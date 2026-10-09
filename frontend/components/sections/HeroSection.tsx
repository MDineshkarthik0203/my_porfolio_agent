"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Mic,
  MicOff,
  Keyboard,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Send,
  ExternalLink,
  Briefcase,
  Zap,
  GraduationCap,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { useVoice } from "@/hooks/useVoice";
import { sendChatMessage } from "@/lib/api";
import { ChatMessage } from "@/types";

interface ActionState {
  type: "idle" | "listening" | "thinking" | "speaking";
  label: string;
  topic?: string;
}

export const HeroSection: React.FC = () => {
  // Action & avatar state
  const [actionState, setActionState] = useState<ActionState>({
    type: "idle",
    label: "Digital Twin Ready",
  });
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showInputFocus, setShowInputFocus] = useState<boolean>(false);

  // Chat conversation
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "greeting",
      role: "assistant",
      content:
        "Hi! I'm Dinesh's AI digital twin. You can ask me anything about his projects, skills, experience, or even have a general conversation about AI.",
      agent_used: "Profile Agent",
      timestamp: "10:24 AM",
    },
    {
      id: "user-q1",
      role: "user",
      content: "What are your best AI projects?",
      timestamp: "10:24 AM",
    },
    {
      id: "twin-a1",
      role: "assistant",
      content:
        "Sure! Some of my key AI projects are:\n1. Sovereign Agentic AI Workbench (LangGraph & Mistral)\n2. Nexora-AI (Enterprise RAG Platform)\n3. AI Student Learning Assistant (Adaptive Pedagogy)\n4. AI E-commerce Shopping Assistant\n5. AI Knowledge Navigator v2\n\nWould you like me to explain any of them in detail?",
      agent_used: "Project Agent",
      timestamp: "10:24 AM",
    },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  // Hook for Speech STT & TTS
  const {
    isSupported,
    isListening,
    isSpeaking,
    transcript,
    startListening,
    stopListening,
    speak,
    cancelSpeech,
  } = useVoice({
    onTranscript: (txt) => {
      // live speech update
    },
    onSpeechEnd: async (finalText) => {
      if (!finalText.trim()) return;
      await handleSendMessage(finalText, "voice");
    },
  });

  // Determine avatar action based on user query topic
  const determineTopicAction = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("project") || q.includes("sovereign") || q.includes("nexora") || q.includes("workbench")) {
      return "💡 Explaining Project Architecture & LangGraph";
    }
    if (q.includes("skill") || q.includes("tech") || q.includes("python") || q.includes("rag")) {
      return "⚡ Demonstrating Technical Stack & Systems";
    }
    if (q.includes("education") || q.includes("iiit") || q.includes("college") || q.includes("study") || q.includes("degree")) {
      return "🎓 Discussing IIIT Kottayam & Academics";
    }
    if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("phone")) {
      return "🤝 Providing Contact & Collaboration Details";
    }
    if (q.includes("github") || q.includes("code") || q.includes("repo")) {
      return "💻 Presenting Open-Source Repositories";
    }
    return "🗣️ Conversing as Dinesh Karthik";
  };

  // Sync actionState with speech synthesis
  useEffect(() => {
    if (isListening) {
      setActionState({
        type: "listening",
        label: "Listening to your voice...",
        topic: "🎙️ Microphone Active",
      });
    } else if (isProcessing) {
      setActionState({
        type: "thinking",
        label: "Reasoning via LangGraph...",
        topic: "🧠 Agent Supervisor Routing",
      });
    } else if (isSpeaking) {
      // stays speaking
    } else {
      setActionState({
        type: "idle",
        label: "Digital Twin Ready",
      });
    }
  }, [isListening, isProcessing, isSpeaking]);

  const handleSendMessage = async (textToSend: string, mode: "text" | "voice" = "text") => {
    if (!textToSend.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    const topicLabel = determineTopicAction(textToSend);
    setActionState({
      type: "thinking",
      label: "Reasoning as Dinesh...",
      topic: topicLabel,
    });

    try {
      const data = await sendChatMessage(textToSend, messages, mode);

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: data.response,
        agent_used: data.routed_agent,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sources: data.sources,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsProcessing(false);

      // Perform Talking Action
      setActionState({
        type: "speaking",
        label: "Speaking with gestures...",
        topic: topicLabel,
      });

      if (!isMuted) {
        speak(data.response, () => {
          setActionState({
            type: "idle",
            label: "Digital Twin Ready",
          });
        });
      }
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "Hey! I'm Dinesh Karthik. I'm currently studying Computer Science at IIIT Kottayam and specialize in Generative AI, LangGraph, and RAG pipelines.",
        agent_used: "Profile Agent",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      setIsProcessing(false);
      setActionState({
        type: "idle",
        label: "Digital Twin Ready",
      });
    }
  };

  const handleMicToggle = () => {
    if (isSpeaking) {
      cancelSpeech();
    }
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleMuteToggle = () => {
    if (isSpeaking) {
      cancelSpeech();
    }
    setIsMuted(!isMuted);
  };

  const handleFocusType = () => {
    setShowInputFocus(true);
    inputRef.current?.focus();
  };

  const handleResetChat = () => {
    cancelSpeech();
    setMessages([
      {
        id: `init-${Date.now()}`,
        role: "assistant",
        content:
          "Hi! I'm Dinesh's AI digital twin. Feel free to ask me anything about my work, skills, or projects!",
        agent_used: "Profile Agent",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const skillChips = [
    ["Python", "FastAPI", "Django", "LangGraph"],
    ["Generative AI", "RAG", "MCP", "Agentic AI"],
    ["Machine Learning", "Deep Learning", "LLMs"],
  ];

  const tryAskingQueries = [
    "Tell me about Dinesh.",
    "Explain the Sovereign Agentic AI Workbench.",
    "What technologies do you use?",
    "Show me your GitHub projects.",
    "Can I download your resume?",
  ];

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden bg-[#07090E]">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Main 3-Column Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Headline, Tagline, Bio & Skill Badges       */}
          {/* ======================================================== */}
          <div className="lg:col-span-3 space-y-5 pt-2">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121624] border border-emerald-500/30 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
              <span className="text-emerald-400 font-semibold tracking-wide text-[11px] uppercase">
                AI DIGITAL TWIN
              </span>
            </div>

            {/* Giant Headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
              Hi, I’m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Dinesh
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-sm font-semibold text-slate-200">
              AI Engineer • Generative AI • Agentic AI
            </p>

            {/* Subhead Paragraph */}
            <p className="text-xs text-slate-400 leading-relaxed">
              You can talk to my AI digital twin. Ask me anything about my work, skills, projects,
              experience or feel free to just have a conversation about AI.
            </p>

            {/* Skill Chips Rows */}
            <div className="space-y-2 pt-2">
              {skillChips.map((row, rIdx) => (
                <div key={rIdx} className="flex flex-wrap gap-2">
                  {row.map((skill, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSendMessage(`What is your experience with ${skill}?`)}
                      className="px-3 py-1.5 rounded-lg bg-[#111420] hover:bg-[#191e30] border border-white/10 hover:border-indigo-400/40 text-[11px] font-medium text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* CENTER COLUMN: Talking Digital Twin Avatar & Audio Pod    */}
          {/* ======================================================== */}
          <div id="ai-digital-twin-stage" className="lg:col-span-5 flex flex-col items-center relative">
            {/* Action State Floating Pill */}
            <div className="mb-3 px-3.5 py-1 rounded-full bg-[#121626]/90 border border-indigo-500/30 backdrop-blur-md flex items-center gap-2 shadow-lg">
              <span
                className={`w-2 h-2 rounded-full ${
                  actionState.type === "speaking"
                    ? "bg-purple-400 animate-ping"
                    : actionState.type === "listening"
                    ? "bg-blue-400 animate-pulse"
                    : actionState.type === "thinking"
                    ? "bg-amber-400 animate-spin"
                    : "bg-emerald-400"
                }`}
              />
              <span className="text-[11px] font-mono text-slate-300 font-medium">
                {actionState.topic || actionState.label}
              </span>
            </div>

            {/* Avatar Frame Container */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-indigo-500/20 bg-[#0A0D15] shadow-2xl shadow-indigo-950/40 group">
              {/* Speaking Avatar Image (Hand gesturing) */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  actionState.type === "speaking" ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src="/dinesh-avatar-speaking.jpg"
                  alt="M Dinesh Karthik AI Twin Speaking"
                  fill
                  className="object-cover object-center filter brightness-105"
                  priority
                />
              </div>

              {/* Listening / Idle Avatar Image */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  actionState.type === "speaking" ? "opacity-0 z-0" : "opacity-100 z-10"
                }`}
              >
                <Image
                  src="/dinesh-avatar-listening.jpg"
                  alt="M Dinesh Karthik AI Twin Attentive"
                  fill
                  className="object-cover object-center filter brightness-105"
                  priority
                />
              </div>

              {/* Ambient studio glow overlay on bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent opacity-80 z-20 pointer-events-none" />

              {/* Live Status Badge overlay on avatar */}
              <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Dinesh Twin • Studio View</span>
              </div>
            </div>

            {/* Floating Audio Interaction Capsule (Center bottom) */}
            <div className="w-[92%] sm:w-[85%] -mt-10 z-30 bg-[#0E121E]/95 border border-indigo-500/30 rounded-2xl p-3 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-2">
              {/* Type button */}
              <button
                onClick={handleFocusType}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#14192A] hover:bg-[#1E253E] border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all active:scale-95"
              >
                <Keyboard className="w-4 h-4 text-slate-400" />
                <span className="text-[11px]">Type</span>
              </button>

              {/* Center Glowing Mic Pod & Waveforms */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3">
                  {/* Left Sound Wave bars */}
                  <div className="flex items-center gap-0.5 h-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={`left-${i}`}
                        className="w-1 rounded-full bg-indigo-400 transition-all"
                        style={{
                          height:
                            actionState.type === "speaking" || isListening
                              ? `${8 + Math.sin(i * 1.2) * 12 + 6}px`
                              : "4px",
                          opacity: actionState.type === "speaking" || isListening ? 0.9 : 0.3,
                          animation:
                            actionState.type === "speaking" || isListening
                              ? `waveBar ${0.5 + i * 0.15}s ease-in-out infinite`
                              : "none",
                        }}
                      />
                    ))}
                  </div>

                  {/* Circular Mic Button */}
                  <button
                    onClick={handleMicToggle}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-90 ${
                      isListening
                        ? "bg-red-500 text-white ring-4 ring-red-500/30 animate-pulse"
                        : actionState.type === "speaking"
                        ? "bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white ring-4 ring-indigo-500/40"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 ring-2 ring-indigo-400/30 shadow-indigo-500/30"
                    }`}
                    title={isListening ? "Stop listening" : "Tap to speak"}
                  >
                    {isListening ? (
                      <MicOff className="w-5 h-5 text-white" />
                    ) : (
                      <Mic className="w-5 h-5 text-white" />
                    )}
                  </button>

                  {/* Right Sound Wave bars */}
                  <div className="flex items-center gap-0.5 h-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={`right-${i}`}
                        className="w-1 rounded-full bg-purple-400 transition-all"
                        style={{
                          height:
                            actionState.type === "speaking" || isListening
                              ? `${8 + Math.cos(i * 1.2) * 12 + 6}px`
                              : "4px",
                          opacity: actionState.type === "speaking" || isListening ? 0.9 : 0.3,
                          animation:
                            actionState.type === "speaking" || isListening
                              ? `waveBar ${0.6 + i * 0.12}s ease-in-out infinite`
                              : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-400 mt-1">
                  {isListening ? "Listening..." : actionState.type === "speaking" ? "Speaking..." : "Tap to speak"}
                </span>
              </div>

              {/* Mute button */}
              <button
                onClick={handleMuteToggle}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all active:scale-95 ${
                  isMuted
                    ? "bg-red-500/20 border-red-500/30 text-red-400"
                    : "bg-[#14192A] hover:bg-[#1E253E] border-white/10 text-slate-300 hover:text-white"
                }`}
                title={isMuted ? "Unmute Speech" : "Mute Speech"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-slate-400" />}
                <span className="text-[11px]">{isMuted ? "Muted" : "Mute"}</span>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Integrated "Dinesh's AI" Chat Window       */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 bg-[#0C0F18]/95 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col h-[520px] shadow-2xl backdrop-blur-xl">
            {/* Chat Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-indigo-400/40">
                  <Image
                    src="/dinesh-portrait.png"
                    alt="Dinesh Thumbnail"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-black" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="text-xs font-bold text-white tracking-wide">Dinesh’s AI</h3>
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                  </div>
                  <p className="text-[10px] font-mono text-slate-400">
                    <span className="text-emerald-400">● Online</span> • Powered by LangGraph
                  </p>
                </div>
              </div>

              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Reset Chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3 text-xs pr-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed text-xs ${
                      m.role === "user"
                        ? "bg-[#2563EB] text-white rounded-tr-none font-medium"
                        : "bg-[#141926] text-slate-200 border border-white/10 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.content}</p>
                    <div className="mt-1 flex items-center justify-between text-[9px] text-slate-400/80">
                      {m.agent_used && (
                        <span className="font-mono text-indigo-300">via {m.agent_used}</span>
                      )}
                      <span className="ml-auto">{m.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}

              {isProcessing && (
                <div className="flex items-center gap-2 p-2 bg-[#141926] rounded-xl text-xs text-indigo-300 border border-indigo-500/20 w-fit">
                  <Sparkles className="w-3 h-3 animate-spin text-indigo-400" />
                  <span>Dinesh is thinking...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions: "Try asking..." */}
            <div className="pt-2 pb-2 border-t border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Try asking...
              </span>
              <div className="space-y-1 max-h-24 overflow-y-auto no-scrollbar">
                {tryAskingQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="w-full text-left px-2.5 py-1 rounded-lg bg-[#111522] hover:bg-[#181E32] border border-white/5 hover:border-indigo-400/30 text-[11px] text-slate-300 hover:text-white flex items-center justify-between transition-colors group"
                  >
                    <span className="truncate">↗ {q}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 opacity-60 group-hover:opacity-100 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Inline Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!inputText.trim()) return;
                const txt = inputText.trim();
                setInputText("");
                handleSendMessage(txt);
              }}
              className="mt-2 pt-2 border-t border-white/10 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Dinesh's AI anything..."
                disabled={isProcessing}
                className="flex-1 bg-[#121626] border border-white/10 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isProcessing}
                className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 transition-all font-semibold"
                title="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM STATS BANNER: 4 Metric Columns                   */}
        {/* ======================================================== */}
        <div className="mt-12 bg-[#0C0F18]/80 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {/* Stat 1 */}
          <div className="flex items-center gap-3.5 border-r border-white/5 last:border-r-0 pl-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">4+</div>
              <div className="text-[11px] text-slate-400">AI Projects</div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3.5 border-r border-white/5 last:border-r-0 pl-2">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Multiple</div>
              <div className="text-[11px] text-slate-400">Technologies</div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-3.5 border-r border-white/5 last:border-r-0 pl-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">B.Tech</div>
              <div className="text-[11px] text-slate-400">Computer Science</div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-3.5 pl-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Building</div>
              <div className="text-[11px] text-slate-400">Agentic AI Solutions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
