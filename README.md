# AI Digital Twin Portfolio (M Dinesh Karthik)

A production-grade, agentic AI-powered portfolio and interactive AI Digital Twin built for **M Dinesh Karthik** (Undergraduate Computer Science student at IIIT Kottayam).

Unlike standard static portfolios, this application features a stateful **LangGraph Portfolio Supervisor** coordinating 6 specialist agent nodes, integrated RAG for factual grounding, live GitHub synchronization, and dual floating interactive corner widgets: a voice-reactive AI Digital Twin on the bottom-left and an intelligent chatbot assistant on the bottom-right.

---

## 🏛️ System Architecture

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

## 📁 Repository Structure

```
ai-digital-twin-portfolio/
│
├── data/                               # Ground-truth structured portfolio database
│   ├── profile.json                    # Dinesh's persona, bio, contacts
│   ├── education.json                  # IIIT Kottayam, Narayana, Sri Chaitanya
│   ├── skills.json                     # Generative AI, LangGraph, Python, etc.
│   ├── projects.json                   # Sovereign Agent, Nexora-AI, etc.
│   ├── experience.json                 # Academic & open-source software dev
│   ├── achievements.json               # School 94.33% & milestones
│   └── dinesh-portrait.png             # Official portrait asset
│
├── backend/                            # FastAPI & LangGraph Backend
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes.py               # /api/chat, /api/voice/*, /api/projects, etc.
│   │   │   └── __init__.py
│   │   ├── agents/                     # LangGraph Multi-Agent Architecture
│   │   │   ├── state.py                # AgentState TypedDict
│   │   │   ├── supervisor.py           # Intent classifier & router
│   │   │   ├── profile_agent.py        # Background, IIIT Kottayam, bio
│   │   │   ├── project_agent.py        # Deep project specs with RAG
│   │   │   ├── skills_agent.py         # Technical skills queries
│   │   │   ├── resume_agent.py         # Education, GPA/grades, credentials
│   │   │   ├── github_agent.py         # Live repos (MDineshkarthik0203)
│   │   │   ├── contact_agent.py        # Collaboration & email
│   │   │   ├── graph.py                # StateGraph assembly & compilation
│   │   │   └── __init__.py
│   │   ├── core/
│   │   │   ├── config.py               # Pydantic Settings & environment vars
│   │   │   └── __init__.py
│   │   ├── models/
│   │   ├── rag/                        # RAG & Semantic Retrieval
│   │   │   ├── embeddings.py           # Embeddings generator
│   │   │   ├── vector_store.py         # In-memory vector store
│   │   │   ├── retriever.py            # Multimodal portfolio retriever
│   │   │   └── __init__.py
│   │   ├── schemas/                    # Pydantic Request/Response models
│   │   │   ├── chat.py
│   │   │   ├── profile.py
│   │   │   ├── voice.py
│   │   │   └── __init__.py
│   │   ├── services/
│   │   │   ├── data_loader.py          # Cached JSON database loader
│   │   │   ├── llm_factory.py          # Pluggable Groq / OpenAI / Local / Fallback
│   │   │   ├── voice_service.py        # Audio STT/TTS service abstraction
│   │   │   └── __init__.py
│   │   ├── tools/                      # Agent Tools
│   │   │   ├── github_tool.py          # GitHub API integration with TTL caching
│   │   │   ├── portfolio_search.py     # Structured search tool
│   │   │   ├── resume_tool.py          # Resume summarizer
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   └── main.py                     # FastAPI entrypoint & lifespan
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/                           # Next.js 14 / React 18 / Tailwind CSS
│   ├── app/
│   │   ├── globals.css                 # Dark theme & styling
│   │   ├── layout.tsx                  # Root layout with dual floating corner widgets
│   │   └── page.tsx                    # Landing page
│   ├── components/
│   │   ├── avatar/
│   │   │   ├── TwinAvatar.tsx          # Portrait with listening/speaking states
│   │   │   └── WaveformVisualizer.tsx  # Dynamic animated audio bars
│   │   ├── chat/
│   │   │   └── FloatingChatbot.tsx     # Bottom-Right corner floating chat
│   │   ├── voice/
│   │   │   └── FloatingVoiceTwin.tsx   # Bottom-Left corner floating voice twin
│   │   ├── sections/
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroSection.tsx         # Tagline, CTAs & Twin stage
│   │   │   ├── AboutSection.tsx        # Profile & engineering philosophy
│   │   │   ├── SkillsSection.tsx       # Categorized skill taxonomy
│   │   │   ├── ProjectsSection.tsx     # 5 repos + deep architecture modal
│   │   │   ├── ArchitectureViewer.tsx  # Interactive LangGraph pipeline flow
│   │   │   ├── EducationSection.tsx    # IIIT Kottayam & grades
│   │   │   ├── GitHubSection.tsx       # Live repo showcase
│   │   │   ├── ContactSection.tsx      # Email copy & links
│   │   │   └── Footer.tsx
│   ├── hooks/
│   │   ├── useVoice.ts                 # Web Speech API recognition & speech
│   │   └── useChat.ts                  # Chat conversation state
│   ├── lib/
│   │   ├── api.ts                      # Backend API client with offline fallback
│   │   └── utils.ts
│   ├── public/
│   │   └── dinesh-portrait.png         # Portrait asset
│   ├── types/
│   │   └── index.ts                    # TypeScript types
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── docs/
│   └── architecture.md                 # Detailed architecture specification
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🚀 How to Run the Project

### Prerequisites
- **Python**: 3.10+ (tested on Python 3.13)
- **Node.js**: 18+ (tested on Node v24)
- **npm** or **pnpm**

---

### Step 1: Backend Setup (FastAPI & LangGraph)

1. Open a terminal in the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   # Windows PowerShell
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # Linux/macOS
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure your `.env` file (optional for basic run, recommended for live Groq inference):
   ```bash
   cp .env.example .env
   # Set GROQ_API_KEY=your_key_here
   ```
   *Note: If `GROQ_API_KEY` is not provided, the backend automatically uses an intelligent built-in fallback model so you can test immediately without setup blockers.*

5. Run the FastAPI development server:
   ```bash
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   - Swagger Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)
   - Health Check: [http://localhost:8000/api/health](http://localhost:8000/api/health)

---

### Step 2: Frontend Setup (Next.js & React)

1. In a separate terminal, open the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Run the Next.js development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   - [http://localhost:3000](http://localhost:3000)

---

### Step 3: Containerized Run with Docker Compose (Alternative)

```bash
docker-compose up --build
```
This runs the FastAPI backend on port `8000` and the Next.js frontend on port `3000`.

---

## 🎙️ Dual-Corner Interaction Guide

- **Bottom-Left Corner (Voice Twin)**:
  - Click on the glowing portrait icon in the bottom-left corner.
  - An interactive modal will expand showing Dinesh's avatar and real-time audio waveform.
  - Click "Hold / Click to Speak", speak your question using your microphone, and Dinesh's Digital Twin will answer both on-screen and through browser speech synthesis.

- **Bottom-Right Corner (Chatbot Agent)**:
  - Click on the "Ask Dinesh's AI" button in the bottom-right corner.
  - Type questions such as *"Tell me about the Sovereign Agent Architecture"* or *"What is his education at IIIT Kottayam?"*.
  - Observe the badge indicating which LangGraph specialist agent was routed to resolve the inquiry.
