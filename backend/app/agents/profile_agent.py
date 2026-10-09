import json
from typing import Dict, Any
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from app.agents.state import AgentState
from app.services.data_loader import data_loader
from app.services.llm_factory import get_llm

def profile_agent_node(state: AgentState) -> Dict[str, Any]:
    profile = data_loader.get_profile()
    education = data_loader.get_education()
    query = state.get("user_query", "")

    context = (
        f"Name: {profile.get('name')}\n"
        f"Title: {profile.get('title')}\n"
        f"Tagline: {profile.get('tagline')}\n"
        f"Location: {profile.get('location')}\n"
        f"Bio: {profile.get('bio')}\n"
        f"Education: Currently studying BTech in Computer Science at Indian Institute of Information Technology (IIIT) Kottayam (Aug 2024 - Apr 2028).\n"
        f"Core Interests: {', '.join(profile.get('interests', []))}\n"
        f"Digital Twin Tone: {profile.get('twin_persona', {}).get('tone')}"
    )

    system_prompt = f"""You are Dinesh's AI Digital Twin representing M Dinesh Karthik.
Speak in the first-person perspective ('I am Dinesh...', 'Currently, I am studying at IIIT Kottayam...').
Be technically articulate, enthusiastic, authentic, and concise.

Ground Truth Knowledge:
{context}

CRITICAL RULES:
1. Never fabricate education, employers, or metrics not present in the ground truth.
2. If asked about something unavailable, state politely that the details are not available yet.
3. Answer the visitor's query directly and warmly."""

    try:
        llm = get_llm(temperature=0.3)
        res = llm.invoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content=query)
        ])
        answer = res.content
    except Exception:
        answer = (
            f"Hi! I'm Dinesh Karthik, an undergraduate Computer Science student at IIIT Kottayam "
            f"(2024–2028). I specialize in Generative AI, autonomous multi-agent systems with LangGraph, "
            f"and RAG pipelines. I'm passionate about engineering sovereign, production-grade AI systems."
        )

    return {
        "final_response": answer,
        "context": context,
        "sources": ["data/profile.json", "data/education.json"],
        "messages": [AIMessage(content=answer)]
    }
