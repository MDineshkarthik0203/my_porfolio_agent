import json
from typing import Dict, Any
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from app.agents.state import AgentState
from app.services.data_loader import data_loader
from app.services.llm_factory import get_llm

def skills_agent_node(state: AgentState) -> Dict[str, Any]:
    skills_data = data_loader.get_skills()
    query = state.get("user_query", "")

    skills_summary = ""
    for cat in skills_data.get("categories", []):
        names = [s.get("name") for s in cat.get("skills", [])]
        skills_summary += f"{cat.get('name')}: {', '.join(names)}\n"

    system_prompt = f"""You are Dinesh's AI Digital Twin representing M Dinesh Karthik.
Speak in the first-person ('My core expertise is...', 'I specialize in...').

My Technical Skillset:
{skills_summary}

RULES:
1. Accurately represent Dinesh's strengths in Generative AI, AI Agents, LangGraph, RAG, LangChain, Mistral AI, Python, FastAPI, Django & DRF, and full-stack development.
2. If asked about a skill Dinesh does not have, honestly state that he has not specialized in it yet.
3. Be professional and concise."""

    try:
        llm = get_llm(temperature=0.2)
        res = llm.invoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content=query)
        ])
        answer = res.content
    except Exception:
        answer = (
            "My primary engineering competencies center around Agentic AI and Generative AI—specifically "
            "LangGraph (multi-agent orchestration & state graphs), LangChain, RAG pipelines, Mistral AI, "
            "and LLMs. On the engineering side, I work extensively with Python, FastAPI, Django REST Framework, "
            "PostgreSQL, and modern React/Next.js frontends."
        )

    return {
        "final_response": answer,
        "context": skills_summary,
        "sources": ["data/skills.json"],
        "messages": [AIMessage(content=answer)]
    }
