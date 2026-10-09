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

  const FEMALE_IDENTIFIERS = [
    "female",
    "zira",
    "susan",
    "hazel",
    "catherine",
    "linda",
    "heera",
    "samantha",
    "victoria",
    "karen",
    "fiona",
    "moira",
    "tessa",
    "veena",
    "jenny",
    "aria",
    "ana",
    "emma",
    "sonia",
    "ava",
    "allison",
    "serena",
    "stephanie",
    "zoe",
    "salli",
    "kimberly",
    "kendra",
    "joanna",
    "ivy",
    "google us english", // Chrome's default Google US English voice is female
    "google uk english female",
  ];

  const MALE_IDENTIFIERS = [
    "male",
    "david",
    "guy",
    "mark",
    "george",
    "ryan",
    "andrew",
    "daniel",
    "alex",
    "fred",
    "oliver",
    "rishi",
    "prabhat",
    "ravi",
    "tom",
    "aaron",
    "james",
    "richard",
    "brian",
    "matthew",
    "justin",
    "russell",
    "natural (male)",
    "google uk english male",
    "en-us-standard-b",
    "en-us-wavenet-b",
    "en-us-neural2-d",
  ];

  const selectMaleVoice = (synth: SpeechSynthesis): SpeechSynthesisVoice | null => {
    const voices = synth.getVoices();
    if (!voices || voices.length === 0) return null;

    const englishVoices = voices.filter((v) =>
      v.lang.toLowerCase().startsWith("en")
    );
    const pool = englishVoices.length > 0 ? englishVoices : voices;

    // 1. Explicit Male English voice (e.g. Microsoft David Desktop, Google UK English Male, Daniel, Alex)
    const explicitMale = pool.find((v) => {
      const nameLower = v.name.toLowerCase();
      const isMale = MALE_IDENTIFIERS.some((m) => nameLower.includes(m));
      const isFemale = FEMALE_IDENTIFIERS.some((f) => nameLower.includes(f));
      return isMale && !isFemale;
    });
    if (explicitMale) return explicitMale;

    // 2. English voice that is NOT in the female blacklist
    const nonFemale = pool.find((v) => {
      const nameLower = v.name.toLowerCase();
      return !FEMALE_IDENTIFIERS.some((f) => nameLower.includes(f));
    });
    if (nonFemale) return nonFemale;

    // 3. Fallback to pool first item
    return pool[0] || null;
  };

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
    utterance.rate = 1.0;
    utterance.pitch = 0.92; // Natural, resonant masculine pitch for Dinesh

    const configureAndSpeak = () => {
      const maleVoice = selectMaleVoice(synth);
      if (maleVoice) {
        utterance.voice = maleVoice;
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

      synth.speak(utterance);
      setIsSpeaking(true);
    };

    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = () => {
        configureAndSpeak();
      };
    } else {
      configureAndSpeak();
    }
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
