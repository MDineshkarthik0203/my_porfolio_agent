"use client";

import { useState, useCallback } from "react";
import { ChatMessage } from "@/types";
import { sendChatMessage } from "@/lib/api";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-greeting",
      role: "assistant",
      content: "Hey! I'm Dinesh Karthik. I'm studying Computer Science at IIIT Kottayam and building autonomous agent workflows with LangGraph and RAG. Ask me anything about my work, skills, or projects!",
      agent_used: "Profile Agent",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastRoutedAgent, setLastRoutedAgent] = useState<string>("Profile Agent");

  const sendMessage = useCallback(
    async (text: string, mode: "text" | "voice" = "text"): Promise<string> => {
      if (!text.trim()) return "";

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const responseData = await sendChatMessage(text, messages, mode);
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: responseData.response,
          agent_used: responseData.routed_agent,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sources: responseData.sources,
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setLastRoutedAgent(responseData.routed_agent);
        return responseData.response;
      } catch (err) {
        const errorMsg: ChatMessage = {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: "Sorry, I ran into an error connecting to the agent backend. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, errorMsg]);
        return errorMsg.content;
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    lastRoutedAgent,
    sendMessage,
    clearChat,
  };
}
