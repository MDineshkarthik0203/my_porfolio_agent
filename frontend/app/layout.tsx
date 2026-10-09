import type { Metadata } from "next";
import "./globals.css";
import { FloatingVoiceTwin } from "@/components/voice/FloatingVoiceTwin";
import { FloatingChatbot } from "@/components/chat/FloatingChatbot";

export const metadata: Metadata = {
  metadataBase: new URL("https://dineshkarthik.ai"),
  title: "M Dinesh Karthik | AI Digital Twin Portfolio",
  description:
    "AI Digital Twin Portfolio of M Dinesh Karthik - AI Engineering Student at IIIT Kottayam specializing in Generative AI, LangGraph, Autonomous Multi-Agent Systems, and RAG pipelines.",
  keywords: [
    "Dinesh Karthik",
    "AI Engineer",
    "Generative AI",
    "LangGraph",
    "Agentic AI",
    "IIIT Kottayam",
    "AI Digital Twin",
    "RAG",
    "Python",
    "FastAPI"
  ],
  authors: [{ name: "M Dinesh Karthik" }],
  openGraph: {
    title: "M Dinesh Karthik | AI Digital Twin Portfolio",
    description:
      "Interactive AI Digital Twin Portfolio featuring LangGraph multi-agent supervisor, voice interaction, and sovereign agent workflows.",
    url: "https://dineshkarthik.ai",
    siteName: "Dinesh Karthik Portfolio",
    images: [
      {
        url: "/dinesh-portrait.png",
        width: 800,
        height: 800,
        alt: "M Dinesh Karthik Portrait",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        {children}

        {/* Dual Corner Floating AI Widgets */}
        {/* Bottom-Left: Voice Agent Digital Twin */}
        <FloatingVoiceTwin />

        {/* Bottom-Right: Chatbot Agent */}
        <FloatingChatbot />
      </body>
    </html>
  );
}
