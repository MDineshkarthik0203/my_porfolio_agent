"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, RefreshCw, Bot, User, ExternalLink } from "lucide-react";
import { useChat } from "@/hooks/useChat";

export const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { messages, isLoading, lastRoutedAgent, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;
    setInput("");
    await sendMessage(text, "text");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    "Explain Sovereign Agent Architecture",
    "What are your AI skills?",
    "Show me your GitHub repositories",
    "What is your background at IIIT Kottayam?",
    "How can I contact you?"
  ];

  return (
    <aside aria-label="AI Chat Assistant" className="fixed bottom-6 right-6 z-50">
      {/* Minimized Floating Chat Trigger */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-card hover:bg-surface border border-accent/40 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 group"
        >
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-colors">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-white">Ask Dinesh's AI</span>
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>
            <p className="text-[10px] text-muted-foreground group-hover:text-accent transition-colors">
              Chatbot Supervisor
            </p>
          </div>
        </button>
      ) : (
        /* Expanded Chatbot Window */
        <div className="w-[360px] sm:w-[420px] h-[520px] flex flex-col bg-surface/95 border border-border rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/70">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-white">Ask Dinesh's AI</h3>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-accent/15 text-accent">
                    LangGraph
                  </span>
                </div>
                <p className="text-[10px] text-muted">
                  Supervisor routed: <span className="text-primary font-mono">{lastRoutedAgent}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1.5 rounded-md text-muted hover:text-white hover:bg-surfaceHover transition-colors"
                title="Reset Conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md text-muted hover:text-white hover:bg-surfaceHover transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages History List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role !== "user" && (
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent/20 text-white border border-accent/30 rounded-tr-none"
                      : "bg-card text-slate-200 border border-border/80 rounded-tl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground gap-2">
                    {msg.agent_used && (
                      <span className="font-mono text-primary/80">via {msg.agent_used}</span>
                    )}
                    <span className="ml-auto">{msg.timestamp}</span>
                  </div>
                </div>
                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center text-accent mt-0.5">
                    <User className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-muted text-xs p-2 bg-card/40 rounded-xl w-fit">
                <Sparkles className="w-3.5 h-3.5 text-primary animate-spin" />
                <span>LangGraph agent thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-3 py-2 border-t border-border/60 bg-card/30 flex gap-1.5 overflow-x-auto no-scrollbar">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-surface hover:bg-surfaceHover border border-border text-[11px] text-muted hover:text-white transition-all flex-shrink-0"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-border bg-surface flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Dinesh's AI anything..."
              disabled={isLoading}
              className="flex-1 bg-card border border-border rounded-xl px-3.5 py-2 text-xs text-white placeholder-muted focus:outline-none focus:border-accent transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-xl bg-accent text-black hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
