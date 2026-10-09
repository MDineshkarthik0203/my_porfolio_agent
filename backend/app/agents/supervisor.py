import logging
from typing import Dict, Any
from langchain_core.messages import HumanMessage, SystemMessage
from app.agents.state import AgentState
from app.services.llm_factory import get_llm

logger = logging.getLogger(__name__)

SUPERVISOR_SYSTEM_PROMPT = """You are the Portfolio Supervisor for Dinesh's AI Digital Twin.
Your role is to classify the user's inquiry and select the single most appropriate specialist agent:

Options:
- "profile_agent": Questions about who Dinesh is, bio, background, university (IIIT Kottayam), personal interests, or overview.
- "project_agent": Questions about Dinesh's projects (Sovereign Agent Architecture, Nexora-AI, AI Student Learning Assistant, AI E-commerce Assistant, AI Knowledge Navigator, tech stacks used in projects).
- "skills_agent": Inquiries about technical abilities, programming languages (Python, SQL), AI frameworks (LangGraph, LangChain, Mistral AI, RAG), or frontend/backend skills.
- "resume_agent": Inquiries about degrees, GPA/grades (Sri Chaitanya 94.33%), educational timeline, or resume download.
- "github_agent": Inquiries about GitHub repositories, open-source code, commits, or repo links.
- "contact_agent": Inquiries about emailing Dinesh, LinkedIn, hiring, reaching out, or location.

Reply with ONLY the agent name: profile_agent, project_agent, skills_agent, resume_agent, github_agent, or contact_agent.
Do not provide any explanation."""

def supervisor_node(state: AgentState) -> Dict[str, Any]:
    query = state.get("user_query", "").lower()
    
    # Fast heuristic routing
    if any(k in query for k in ["github", "repo", "repository", "git "]):
        return {"next_agent": "github_agent", "routed_agent": "GitHub Agent"}
    if any(k in query for k in ["email", "contact", "hire", "phone", "linkedin", "reach out", "touch with"]):
        return {"next_agent": "contact_agent", "routed_agent": "Contact Agent"}
    if any(k in query for k in ["resume", "cv", "grade", "percentage", "cgpa", "school", "intermediate", "marks", "college"]):
        return {"next_agent": "resume_agent", "routed_agent": "Resume Agent"}
    if any(k in query for k in ["skill", "tech stack", "languages", "know", "langgraph", "langchain", "python", "framework"]):
        return {"next_agent": "skills_agent", "routed_agent": "Skills Agent"}
    if any(k in query for k in ["project", "sovereign", "nexora", "assistant", "navigator", "build", "demo", "workbench"]):
        return {"next_agent": "project_agent", "routed_agent": "Project Agent"}
    if any(k in query for k in ["who is", "about dinesh", "dinesh", "background", "study", "iiit", "tell me about"]):
        return {"next_agent": "profile_agent", "routed_agent": "Profile Agent"}

    # Fallback to LLM classification
    try:
        llm = get_llm(temperature=0.0)
        messages = [
            SystemMessage(content=SUPERVISOR_SYSTEM_PROMPT),
            HumanMessage(content=state.get("user_query", ""))
        ]
        res = llm.invoke(messages)
        content = res.content.strip().lower()
        valid_agents = ["profile_agent", "project_agent", "skills_agent", "resume_agent", "github_agent", "contact_agent"]
        chosen = next((a for a in valid_agents if a in content), "profile_agent")
        
        name_map = {
            "profile_agent": "Profile Agent",
            "project_agent": "Project Agent",
            "skills_agent": "Skills Agent",
            "resume_agent": "Resume Agent",
            "github_agent": "GitHub Agent",
            "contact_agent": "Contact Agent"
        }
        return {"next_agent": chosen, "routed_agent": name_map.get(chosen, "Profile Agent")}
    except Exception as e:
        logger.error(f"Supervisor classification error: {e}")
        return {"next_agent": "profile_agent", "routed_agent": "Profile Agent"}
