"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface UseVoiceOptions {
  onTranscript?: (text: string) => void;
  onSpeechEnd?: (text: string) => void;
}

export function useVoice({ onTranscript, onSpeechEnd }: UseVoiceOptions = {}) {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const textAccumulatorRef = useRef<string>("");
  const onTranscriptRef = useRef(onTranscript);
  const onSpeechEndRef = useRef(onSpeechEnd);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
    onSpeechEndRef.current = onSpeechEnd;
  }, [onTranscript, onSpeechEnd]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setIsSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          setIsListening(true);
          setError(null);
        };

        recognition.onresult = (event: any) => {
          let fullText = "";
          for (let i = 0; i < event.results.length; ++i) {
            fullText += event.results[i][0].transcript;
          }
          textAccumulatorRef.current = fullText;
          setTranscript(fullText);
          onTranscriptRef.current?.(fullText);
        };

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event.error);
          setIsListening(false);
          if (event.error !== "no-speech") {
            setError(`Voice error: ${event.error}`);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          const finalText = textAccumulatorRef.current.trim();
          if (finalText) {
            onSpeechEndRef.current?.(finalText);
          }
        };

        recognitionRef.current = recognition;
      }

      if ("speechSynthesis" in window) {
        synthRef.current = window.speechSynthesis;
      }
    }
  }, []);

  const startListening = useCallback(() => {
    setError(null);
    setTranscript("");
    textAccumulatorRef.current = "";

    // Stop speaking if currently speaking
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err: any) {
        // If already started, restart
        try {
          recognitionRef.current.stop();
          setTimeout(() => recognitionRef.current?.start(), 150);
        } catch (e) {
          console.error("Failed to start voice recognition:", e);
        }
      }
    } else {
      setError("Speech recognition is not supported in this browser. You can click any prompt chip below!");
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn(e);
      }
    }
    setIsListening(false);
    const captured = textAccumulatorRef.current.trim();
    if (captured) {
      onSpeechEndRef.current?.(captured);
    }
  }, []);

  const speak = useCallback((text: string, onDone?: () => void) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;

    // Fix Chromium stuck speaking bug
    synth.cancel();
    if (synth.paused) {
      synth.resume();
    }

    // Clean markdown asterisks or links for cleaner speech
    const cleanSpeech = text
      .replace(/https?:\/\/\S+/g, "")
      .replace(/[*#_`]/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();

    if (!cleanSpeech) return;

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    const pickVoice = () => {
      const voices = synth.getVoices();
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Google") ||
            v.name.includes("Natural") ||
            v.name.includes("Daniel") ||
            v.name.includes("Guy") ||
            v.name.includes("US"))
      ) || voices.find((v) => v.lang.startsWith("en"));

      if (preferred) {
        utterance.voice = preferred;
      }
    };

    pickVoice();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = pickVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onDone?.();
    };
    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
      setIsSpeaking(false);
      onDone?.();
    };

    // Chrome bug workaround: sometimes speech hangs after long text
    synth.speak(utterance);
    setIsSpeaking(true);
  }, []);

  const cancelSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isSupported,
    isListening,
    isSpeaking,
    transcript,
    error,
    startListening,
    stopListening,
    speak,
    cancelSpeech,
  };
}
