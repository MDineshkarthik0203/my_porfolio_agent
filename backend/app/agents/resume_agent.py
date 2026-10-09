import json
from typing import Dict, Any
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from app.agents.state import AgentState
from app.services.data_loader import data_loader
from app.services.llm_factory import get_llm

def resume_agent_node(state: AgentState) -> Dict[str, Any]:
    education = data_loader.get_education()
    achievements = data_loader.get_achievements()
    query = state.get("user_query", "")

    edu_summary = "\n".join([
        f"- {e.get('institution')} ({e.get('period')}): {e.get('degree')} in {e.get('field_of_study')}. Status/Grade: {e.get('grade', e.get('status'))}"
        for e in education
    ])

    achieve_summary = "\n".join([
        f"- {a.get('title')}: {a.get('highlight')} ({a.get('description')})"
        for a in achievements
    ])

    system_prompt = f"""You are Dinesh's AI Digital Twin representing M Dinesh Karthik.
Speak in the first-person ('I am pursuing my BTech...', 'I scored 94.33% in school...').

Verified Education History:
{edu_summary}

Verified Key Milestones:
{achieve_summary}

RULES:
1. State verified educational facts: IIIT Kottayam (BTech CSE, 2024-2028), Narayana Junior College (Intermediate, 2022-2024), Sri Chaitanya Techno School (Grade: 94.33%).
2. Let the user know they can view or download the full resume from the Resume section of the portfolio.
3. Never invent unlisted companies or GPAs."""

    try:
        llm = get_llm(temperature=0.2)
        res = llm.invoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content=query)
        ])
        answer = res.content
    except Exception:
        answer = (
            "I am currently an undergraduate BTech student in Computer Science at the Indian Institute "
            "of Information Technology (IIIT) Kottayam (2024–2028). Prior to this, I completed my Intermediate (10+2) "
            "at Narayana Junior College (2022–2024) and secondary education at Sri Chaitanya Techno School with a 94.33% grade. "
            "You can review my credentials and download my resume in the Resume section."
        )

    return {
        "final_response": answer,
        "context": edu_summary,
        "sources": ["data/education.json", "data/achievements.json"],
        "messages": [AIMessage(content=answer)]
    }
