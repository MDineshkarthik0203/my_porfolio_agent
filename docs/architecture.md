# AI Digital Twin Portfolio - System Architecture

## 1. Overview
The **AI Digital Twin Portfolio** is a production-grade full-stack portfolio for **M Dinesh Karthik**, an AI & Generative AI engineering student at IIIT Kottayam. Unlike conventional static portfolios, this platform provides an interactive AI Digital Twin that speaks, listens, and reasons about Dinesh's projects, technical skills, education, and GitHub repositories using a stateful multi-agent supervisor architecture built on **LangGraph**.

---

## 2. High-Level Architecture

```
                    ┌────────────────────────────────────────┐
                    │          Visitor / Recruiter           │
                    └───────────────────┬────────────────────┘
                                        │ (Voice / Text)
                                        ▼
                    ┌────────────────────────────────────────┐
                    │      Next.js Frontend (React 19)       │
                    │   - Dual Corner Floating Widgets:      │
                    │       * Bottom-Left: Voice Agent Twin  │
                    │       * Bottom-Right: Chatbot Agent    │
                    │   - Web Speech API (STT / TTS)         │
                    │   - Audio Waveform Visualizer          │
                    │   - Interactive Architecture Graphs    │
                    └───────────────────┬────────────────────┘
                                        │ REST / SSE API
                                        ▼
                    ┌────────────────────────────────────────┐
                    │            FastAPI Backend             │
                    │   - Input Validation & Rate Limiting   │
                    │   - Dual-Voice Abstraction Layer       │
                    │   - Structured Data & Vector Pipelines │
                    └───────────────────┬────────────────────┘
                                        │
                                        ▼
                    ┌────────────────────────────────────────┐
                    │      LangGraph Portfolio Supervisor    │
                    │   (Intent Classification & Routing)    │
                    └───┬───────┬───────┬───────┬───────┬────┘
                        │       │       │       │       │
       ┌────────────────┘       │       │       │       └────────────────┐
       ▼                        ▼       ▼       ▼                        ▼
┌──────────────┐ ┌──────────────┐ ┌───────────┐ ┌────────────┐ ┌─────────────────┐
│Profile Agent │ │Project Agent │ │Skills Agt │ │Resume Agt  │ │  GitHub Agent   │
└──────┬───────┘ └──────┬───────┘ └─────┬─────┘ └─────┬──────┘ └────────┬────────┘
       │                │               │             │                 │
       ▼                ▼               ▼             ▼                 ▼
┌──────────────┐ ┌──────────────┐ ┌───────────┐ ┌────────────┐ ┌─────────────────┐
│ profile.json │ │projects.json │ │skills.json│ │education & │ │ GitHub REST API │
│ + bio data   │ │+ RAG Docs    │ │+ taxonomy │ │experience  │ │ (with caching)  │
└──────────────┘ └──────────────┘ └───────────┘ └────────────┘ └─────────────────┘
```

---

## 3. LangGraph Multi-Agent Architecture

The core agent intelligence is organized as a hierarchical supervisor state graph (`StateGraph`):

1. **State Definition (`AgentState`)**:
   - `messages`: Conversation history (`List[BaseMessage]`).
   - `next_agent`: Targeted routing node (`profile`, `project`, `skills`, `resume`, `github`, `contact`, or `FINISH`).
   - `context`: Retrieved grounded context from JSON sources or vector search.
   - `error`: Error capture field for safe fallback degradation.

2. **Portfolio Supervisor**:
   - Acts as the central traffic controller.
   - Classifies query intent with structured output routing.
   - Dispatches to specialized workers.

3. **Specialized Agents**:
   - **Profile Agent**: Answers questions about Dinesh, his background, education at IIIT Kottayam, interests, and bio.
   - **Project Agent**: Answers deep technical inquiries regarding Dinesh's projects (`sovereign-agent-architecture`, `Nexora-AI`, `AI-Student-Learning-Assistant`, `AI-E-commerce-Shopping-Assistant`, `ai-knowledge-navigator-v2`).
   - **Skills Agent**: Provides accurate skill assessments across GenAI, LangGraph, Python, Machine Learning, and Backend frameworks.
   - **Resume Agent**: Summarizes educational records, timeline, coursework, and facilitates resume inspection.
   - **GitHub Agent**: Queries live public repositories from GitHub with server-side API token management and caching.
   - **Contact Agent**: Provides verified professional links (GitHub, LinkedIn, Email).

---

## 4. Grounded Knowledge System
To prevent hallucinations and guarantee 100% factual fidelity:
- Ground truth is stored in modular, version-controlled JSON files in `data/`:
  - `profile.json`: Personal bio, persona configuration, contact endpoints.
  - `education.json`: Verified academic credentials (IIIT Kottayam, Narayana, Sri Chaitanya).
  - `skills.json`: Verified technical expertise breakdown.
  - `projects.json`: Deep project metadata, problem, solution, workflow, and repo links.
  - `experience.json`: Academic and open-source software engineering experience.
  - `achievements.json`: Verified milestones and grades.
- RAG pipeline (`app/rag/`) indexes unstructured documents, project READMEs, and technical writeups into vector stores (pgvector/Qdrant/FAISS fallback).

---

## 5. Dual-Agent Floating Corner UI Concept
As specifically requested:
1. **Bottom-Left Corner: AI Digital Twin (Voice Agent)**:
   - Features Dinesh's avatar portrait with interactive pulse, speaking waves, and listening state rings.
   - One-click microphone toggle.
   - Visual waveform reaction using HTML5 Audio / Canvas.
   - Direct audio playback of twin responses.
2. **Bottom-Right Corner: AI Chatbot Assistant**:
   - Floating expandable chat widget with conversational threading, quick prompt suggestion chips, code syntax highlighting, and copy-to-clipboard.

---

## 6. Pluggable LLM & Speech Abstraction Layer
- **LLM Factory**: Defaults to ultra-fast **Groq** (`llama-3.3-70b-versatile` or `mixtral-8x7b-32768`), with dynamic swappability to OpenAI (`gpt-4o`) or local Ollama / Mistral models.
- **Voice Factory**:
  - Phase 1 & Browser Stage: High-compatibility Web Speech API (`SpeechRecognition` & `SpeechSynthesis`).
  - Backend API endpoints (`/api/voice/transcribe` & `/api/voice/synthesize`) prepared for Whisper / ElevenLabs / Cartesia upgrade without frontend architectural rework.
