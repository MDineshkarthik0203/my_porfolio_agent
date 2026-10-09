"use client";

import React, { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles, Send } from "lucide-react";
import { TwinAvatar, AvatarState } from "../avatar/TwinAvatar";
import { WaveformVisualizer } from "../avatar/WaveformVisualizer";
import { useVoice } from "@/hooks/useVoice";
import { sendChatMessage } from "@/lib/api";

export const FloatingVoiceTwin: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [lastSpeech, setLastSpeech] = useState<string>("");
  const [textInput, setTextInput] = useState<string>("");
  const [twinReply, setTwinReply] = useState<string>(
    "Hey! I'm Dinesh Karthik. Click the microphone or tap any question below to hear me answer!"
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const {
    isSupported,
    isListening,
    isSpeaking,
    transcript,
    error,
    startListening,
    stopListening,
    speak,
    cancelSpeech,
  } = useVoice({
    onTranscript: (text) => {
      setLastSpeech(text);
    },
    onSpeechEnd: async (finalText) => {
      if (!finalText.trim()) return;
      await processVoiceInput(finalText);
    },
  });

  // Keep avatarState in sync
  useEffect(() => {
    if (isProcessing) {
      setAvatarState("processing");
    } else if (isSpeaking) {
      setAvatarState("speaking");
    } else if (isListening) {
      setAvatarState("listening");
    } else {
      setAvatarState("idle");
    }
  }, [isListening, isSpeaking, isProcessing]);

  const processVoiceInput = async (userInput: string) => {
    if (!userInput.trim() || isProcessing) return;
    setIsProcessing(true);
    setLastSpeech(userInput);
    try {
      const data = await sendChatMessage(userInput, [], "voice");
      setTwinReply(data.response);
      setIsProcessing(false);
      // Speak response aloud through speech synthesis
      speak(data.response, () => setAvatarState("idle"));
    } catch (err) {
      const fallback =
        "Hey, I'm Dinesh! I study Computer Science at IIIT Kottayam and specialize in Generative AI, LangGraph, and RAG pipelines.";
      setTwinReply(fallback);
      setIsProcessing(false);
      speak(fallback, () => setAvatarState("idle"));
    }
  };

  const handleOpenAndGreet = () => {
    setIsOpen(true);
    // Introduce Dinesh aloud
    const greeting =
      "Hey! I'm Dinesh Karthik. Great to meet you! What would you like to know about my AI projects, LangGraph, or my journey at IIIT Kottayam?";
    setTwinReply(greeting);
    speak(greeting);
  };

  const handleToggleRecord = () => {
    if (isSpeaking) {
      cancelSpeech();
    }
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleQuickQuestion = async (question: string) => {
    cancelSpeech();
    await processVoiceInput(question);
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    const q = textInput.trim();
    setTextInput("");
    await processVoiceInput(q);
  };

  const quickPrompts = [
    "Who are you?",
    "Explain Sovereign Agent",
    "What are your AI skills?",
    "How can I contact you?",
  ];

  return (
    <aside aria-label="AI Voice Digital Twin" className="fixed bottom-6 left-6 z-50">
      {/* Minimized Floating Avatar Trigger Button */}
      {!isOpen ? (
        <button
          onClick={handleOpenAndGreet}
          className="relative flex items-center gap-3 p-2 pr-4 bg-surface/90 hover:bg-surface border border-primary/40 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 group"
        >
          <TwinAvatar state={avatarState} size="sm" showStatusBadge={true} />
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-white tracking-wide">Voice Twin</span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            <p className="text-[10px] text-muted-foreground group-hover:text-primary transition-colors">
              Click to talk with Dinesh
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary ml-1 group-hover:bg-primary group-hover:text-black transition-colors">
            <Volume2 className="w-4 h-4" />
          </div>
        </button>
      ) : (
        /* Expanded Voice Twin Interactive Window */
        <div className="w-[340px] sm:w-[390px] bg-surface/95 border border-border/80 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/60">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-white">Dinesh's Voice Twin</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                Live Speech
              </span>
            </div>
            <button
              onClick={() => {
                cancelSpeech();
                stopListening();
                setIsOpen(false);
              }}
              className="p-1 rounded-md text-muted hover:text-white hover:bg-surfaceHover transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Central Avatar Visual Stage */}
          <div className="p-5 flex flex-col items-center justify-center bg-gradient-to-b from-surface/80 to-card/50">
            <TwinAvatar
              state={avatarState}
              size="lg"
              onClick={handleToggleRecord}
              className="hover:scale-105 transition-transform"
            />

            {/* Audio Waveform Reaction */}
            <div className="mt-3 w-full flex justify-center">
              <WaveformVisualizer
                isActive={isSpeaking || isListening}
                color={isSpeaking ? "bg-primary" : "bg-accent"}
                barCount={20}
              />
            </div>

            {/* State Caption */}
            <p className="mt-2 text-xs font-medium text-slate-300">
              {isListening
                ? "🎙️ Listening... speak now!"
                : isProcessing
                ? "🧠 Reasoning as Dinesh..."
                : isSpeaking
                ? "🔊 Dinesh is speaking..."
                : "Click the mic or choose a question below"}
            </p>
          </div>

          {/* Transcription & Response Preview */}
          <div className="px-4 py-3 max-h-36 overflow-y-auto border-t border-border/60 bg-card/40 text-xs space-y-2">
            {(lastSpeech || transcript) && (
              <div className="text-muted">
                <span className="font-semibold text-accent">You asked: </span>
                <span>{transcript || lastSpeech}</span>
              </div>
            )}
            <div className="text-slate-200">
              <span className="font-semibold text-primary">Dinesh: </span>
              <span>{twinReply}</span>
            </div>
            {error && (
              <div className="text-[11px] text-amber-400 bg-amber-500/10 p-1.5 rounded">
                {error}
              </div>
            )}
          </div>

          {/* Quick Click-to-Speak Prompt Chips */}
          <div className="px-3 py-2 border-t border-border/60 bg-surface/50 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-card hover:bg-surfaceHover border border-border text-[11px] text-slate-300 hover:text-primary transition-all flex-shrink-0"
              >
                🎙️ {q}
              </button>
            ))}
          </div>

          {/* Controls & Fallback Input Bar */}
          <div className="p-3 border-t border-border bg-surface flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleRecord}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-xs transition-all ${
                  isListening
                    ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                    : "bg-primary text-black hover:bg-primary/90 font-semibold shadow-md shadow-primary/20"
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-4 h-4" /> Stop & Speak
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" /> Click to Speak
                  </>
                )}
              </button>

              {isSpeaking && (
                <button
                  onClick={cancelSpeech}
                  className="p-2.5 rounded-xl border border-border text-muted hover:text-white hover:bg-surfaceHover transition-colors"
                  title="Mute Speech"
                >
                  <VolumeX className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick text submit for instant voice playback */}
            <form onSubmit={handleTextSubmit} className="flex items-center gap-1.5">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Or type to hear Dinesh answer..."
                disabled={isProcessing}
                className="flex-1 bg-card border border-border rounded-lg px-2.5 py-1.5 text-[11px] text-white placeholder-muted focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={!textInput.trim() || isProcessing}
                className="p-1.5 rounded-lg bg-surface border border-border text-primary hover:bg-primary hover:text-black disabled:opacity-40 transition-colors"
                title="Send & Speak"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};
