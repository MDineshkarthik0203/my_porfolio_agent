import { Profile, SkillCategory, EducationItem, ProjectItem, GitHubRepo, ChatMessage } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchProfile(): Promise<Profile> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/profile`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch profile");
    return await res.json();
  } catch (err) {
    return {
      name: "M Dinesh Karthik",
      preferred_name: "Dinesh",
      title: "Aspiring AI Engineer | Generative AI & Agentic AI Specialist",
      tagline: "AI Engineer • Generative AI • Agentic AI",
      avatar_url: "/dinesh-portrait.png",
      location: "Kottayam, Kerala / India",
      bio: "Undergraduate Computer Science student at IIIT Kottayam specializing in Generative AI, Autonomous AI Agents, RAG pipelines, and LangGraph architectures.",
      about: "I am an AI engineering undergraduate student at IIIT Kottayam specializing in Generative AI, Autonomous AI Agents, RAG pipelines, LangGraph, and Python backend engineering.",
      contact: {
        email: "dineshkarthik0218@gmail.com",
        phone: "+91 9948435422",
        github: "https://github.com/MDineshkarthik0203",
        linkedin: "https://www.linkedin.com/in/dinesh-karthik-madduluri-537821336"
      },
      interests: ["Agentic AI", "LangGraph", "RAG Systems", "Python Backend", "LLM Orchestration"],
      twin_persona: {
        role: "AI Digital Twin of M Dinesh Karthik",
        tone: "Sharp, technically articulate, humble, and professional",
        greeting: "Hi! I'm Dinesh's AI Digital Twin. Ask me anything about my projects, BTech at IIIT Kottayam, or AI agents!"
      }
    };
  }
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/projects`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return await res.json();
  } catch (err) {
    return [];
  }
}

export async function fetchSkills(): Promise<{ categories: SkillCategory[] }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/skills`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch skills");
    return await res.json();
  } catch (err) {
    return { categories: [] };
  }
}

export async function fetchEducation(): Promise<EducationItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/education`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch education");
    return await res.json();
  } catch (err) {
    return [];
  }
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/github`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("Failed to fetch github");
    const data = await res.json();
    return data.repositories || [];
  } catch (err) {
    return [];
  }
}

/**
 * Intelligent first-person conversational response generator for Dinesh Karthik
 */
function generateDineshResponse(queryText: string): { response: string; routed_agent: string; sources: string[] } {
  const q = queryText.toLowerCase().trim();

  // 1. Greetings
  if (["hi", "hello", "hey", "hola", "hey there", "greetings", "hii", "hi dinesh"].includes(q)) {
    return {
      response: "Hey! Great to meet you, I'm Dinesh Karthik. I'm currently studying Computer Science at IIIT Kottayam (2024–2028) and specializing in Generative AI, LangGraph multi-agent architectures, and RAG pipelines. What would you like to know about my projects, skills, or college journey?",
      routed_agent: "Profile Agent",
      sources: ["data/profile.json"]
    };
  }

  // 2. Who is Dinesh / About me
  if (q.includes("who are you") || q.includes("who is dinesh") || q.includes("about you") || q.includes("tell me about yourself") || q.includes("introduce yourself") || q.includes("about dinesh")) {
    return {
      response: "I'm M Dinesh Karthik, an undergraduate Computer Science student at IIIT Kottayam. My passion is building production-grade autonomous agent systems, multi-agent supervisors with LangGraph, and RAG pipelines. On the backend, I work extensively with Python, Django REST Framework, FastAPI, and SQL.",
      routed_agent: "Profile Agent",
      sources: ["data/profile.json", "data/education.json"]
    };
  }

  // 3. Technical Skills
  if (q.includes("skill") || q.includes("technologies") || q.includes("tech stack") || q.includes("languages") || q.includes("what do you know") || q.includes("what tech") || q.includes("ai skills")) {
    return {
      response: "My core technical skill set centers around:\n• Generative AI & Agents: LangGraph (State Graphs, Cyclic Multi-Agent Orchestration), LangChain, RAG pipelines, LLMs, Mistral AI, Prompt Engineering\n• Machine Learning & NLP: Semantic Embeddings, Vector Search, NLP, Deep Learning\n• Backend & Systems: Python, FastAPI, Django & Django REST Framework, SQL, PostgreSQL & pgvector\n• Tools & Observability: Git, GitHub, LangSmith, Linux",
      routed_agent: "Skills Agent",
      sources: ["data/skills.json"]
    };
  }

  // 4. Sovereign Agent Architecture
  if (q.includes("sovereign") || q.includes("agent architecture") || q.includes("workbench")) {
    return {
      response: "In my Sovereign Agent Architecture project (https://github.com/MDineshkarthik0203/sovereign-agent-architecture), I designed an autonomous multi-agent system using LangGraph and Mistral AI. The system coordinates specialized agent nodes with hierarchical state tracking and local open-weight model execution to ensure verifiable execution without closed-API vendor lock-in.",
      routed_agent: "Project Agent",
      sources: ["data/projects.json"]
    };
  }

  // 5. Nexora AI
  if (q.includes("nexora")) {
    return {
      response: "I engineered Nexora-AI (https://github.com/MDineshkarthik0203/Nexora-AI) as an enterprise intelligent agent platform for conversational RAG. It features high-precision vector embeddings, semantic re-ranking, and citation tracking with FastAPI and React to eliminate hallucinations across large document collections.",
      routed_agent: "Project Agent",
      sources: ["data/projects.json"]
    };
  }

  // 6. AI Student Learning Assistant
  if (q.includes("student") || q.includes("learning assistant") || q.includes("tutor")) {
    return {
      response: "My AI Student Learning Assistant project (https://github.com/MDineshkarthik0203/AI-Student-Learning-Assistant) is an adaptive personalized tutoring companion. It assesses a student's baseline knowledge, generates active recall quizzes, and dynamically scaffolds complex STEM concepts to accelerate comprehension.",
      routed_agent: "Project Agent",
      sources: ["data/projects.json"]
    };
  }

  // 7. AI E-commerce Assistant
  if (q.includes("shopping") || q.includes("ecommerce") || q.includes("e-commerce")) {
    return {
      response: "For the AI E-commerce Shopping Assistant (https://github.com/MDineshkarthik0203/AI-E-commerce-Shopping-Assistant), I built a conversational commerce assistant using Python, Django REST Framework, and SQL that understands natural language consumer intent, filters inventory constraints, and provides contextual purchase rationale.",
      routed_agent: "Project Agent",
      sources: ["data/projects.json"]
    };
  }

  // 8. AI Knowledge Navigator v2
  if (q.includes("navigator") || q.includes("knowledge navigator")) {
    return {
      response: "My AI Knowledge Navigator v2 (https://github.com/MDineshkarthik0203/ai-knowledge-navigator-v2) is a multi-hop RAG engine. It breaks down complex technical queries into parallel vector searches, fuses cross-document insights, and outputs answers with verifiable citations.",
      routed_agent: "Project Agent",
      sources: ["data/projects.json"]
    };
  }

  // 9. AI Clinic Assistant
  if (q.includes("clinic") || q.includes("hospital") || q.includes("medical")) {
    return {
      response: "The AI Clinic Assistant is an intelligent triage and patient interaction assistant designed to process symptoms, schedule clinical visits, verify patient records, and summarize diagnostic notes for healthcare practitioners with strict data privacy.",
      routed_agent: "Project Agent",
      sources: ["data/projects.json"]
    };
  }

  // 10. Adaptive Tourism Companion
  if (q.includes("tourism") || q.includes("travel") || q.includes("companion")) {
    return {
      response: "The Adaptive Tourism Companion is an autonomous location-aware agent that dynamically synthesizes personalized travel itineraries, local cultural narratives, and real-time navigation recommendations based on traveler preferences.",
      routed_agent: "Project Agent",
      sources: ["data/projects.json"]
    };
  }

  // 11. ResearchPilot
  if (q.includes("researchpilot") || q.includes("research pilot") || q.includes("research")) {
    return {
      response: "ResearchPilot is an autonomous multi-agent research copilot that ingests scientific arXiv papers, extracts key methodology contributions, performs cross-paper citation synthesis, and formats structured literature reviews.",
      routed_agent: "Project Agent",
      sources: ["data/projects.json"]
    };
  }

  // 12. All projects / Key AI projects (matching reference design response!)
  if (q.includes("best ai project") || q.includes("best project") || q.includes("key project") || (q.includes("project") && q.includes("what"))) {
    return {
      response: "Sure! Some of my key AI projects are:\n1. Sovereign Agentic AI Workbench (LangGraph & Mistral)\n2. AI Clinic Assistant\n3. Adaptive Tourism Companion\n4. ResearchPilot\n5. Nexora-AI & Sovereign Agent Architecture\n\nWould you like me to explain any of them in detail?",
      routed_agent: "Project Agent",
      sources: ["data/projects.json"]
    };
  }

  // 10. Education / College / Grades
  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("iiit") || q.includes("study") || q.includes("studying") || q.includes("grade") || q.includes("school") || q.includes("percentage") || q.includes("marks")) {
    return {
      response: "Here is my academic journey:\n• BTech in Computer Science: Indian Institute of Information Technology (IIIT) Kottayam (Aug 2024 – Apr 2028, currently pursuing)\n• Intermediate (10+2): Narayana Junior College (Jun 2022 – Apr 2024)\n• Secondary Education: Sri Chaitanya Techno School (Jun 2017 – Apr 2022) with a 94.33% grade.",
      routed_agent: "Resume Agent",
      sources: ["data/education.json"]
    };
  }

  // 11. Contact / Phone / Email / LinkedIn
  if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("number") || q.includes("reach") || q.includes("hire") || q.includes("linkedin")) {
    return {
      response: "I'd love to connect! You can reach me directly:\n• Phone: +91 9948435422\n• Email: dineshkarthik0218@gmail.com\n• LinkedIn: https://www.linkedin.com/in/dinesh-karthik-madduluri-537821336\n• GitHub: https://github.com/MDineshkarthik0203",
      routed_agent: "Contact Agent",
      sources: ["data/profile.json"]
    };
  }

  // 12. GitHub
  if (q.includes("github") || q.includes("repo") || q.includes("git") || q.includes("code")) {
    return {
      response: "All my open-source repositories and code are publicly available on GitHub at https://github.com/MDineshkarthik0203. Feel free to explore my repos for Sovereign Agent Architecture, Nexora-AI, and more!",
      routed_agent: "GitHub Agent",
      sources: ["GitHub API"]
    };
  }

  // 13. LangGraph specific
  if (q.includes("langgraph") || q.includes("graph") || q.includes("state")) {
    return {
      response: "I work deeply with LangGraph to build cyclical, stateful agent architectures. In my projects, I use LangGraph StateGraphs to define typed agent states, supervisor routing nodes, conditional transitions, and self-correcting evaluation loops that make multi-agent systems reliable.",
      routed_agent: "Skills Agent",
      sources: ["data/skills.json", "data/projects.json"]
    };
  }

  // 14. RAG specific
  if (q.includes("rag") || q.includes("retrieval") || q.includes("vector")) {
    return {
      response: "In RAG, I focus on overcoming hallucinations and low-recall chunking. In Nexora-AI and AI Knowledge Navigator v2, I implemented semantic embeddings, hybrid keyword/vector search, and multi-hop query expansion with precise line citations.",
      routed_agent: "Project Agent",
      sources: ["data/projects.json"]
    };
  }

  // Default dynamic conversational answer
  return {
    response: `I'm Dinesh Karthik, an AI Engineering student at IIIT Kottayam specializing in Generative AI, LangGraph, and RAG architectures. Regarding "${queryText}", I focus on building production-ready autonomous workflows and backend systems with Python and FastAPI. Feel free to ask me about my Sovereign Agent Architecture, Nexora-AI, my skills, or how to connect!`,
    routed_agent: "Profile Agent",
    sources: ["data/profile.json"]
  };
}

export async function sendChatMessage(
  message: string,
  history: ChatMessage[],
  mode: "text" | "voice" = "text"
): Promise<{ response: string; routed_agent: string; sources: string[] }> {
  const formattedHistory = history.map(h => ({
    role: h.role,
    content: h.content,
    agent_used: h.agent_used,
    timestamp: h.timestamp
  }));

  // Strategy 1: Try Next.js server-side API proxy route
  try {
    const proxyRes = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: formattedHistory, mode }),
      signal: AbortSignal.timeout(4000)
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (!data.fallback && data.response) {
        return data;
      }
    }
  } catch (err) {
    // continue to next strategy
  }

  // Strategy 2: Direct FastAPI Backend call
  try {
    const directRes = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: formattedHistory, mode }),
      signal: AbortSignal.timeout(4000)
    });

    if (directRes.ok) {
      return await directRes.json();
    }
  } catch (err) {
    // continue to client-side persona engine
  }

  // Strategy 3: Dynamic First-Person Persona Engine (guarantees instant, authentic response for every single question)
  return generateDineshResponse(message);
}
