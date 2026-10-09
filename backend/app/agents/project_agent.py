import json
from typing import Dict, Any
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from app.agents.state import AgentState
from app.services.data_loader import data_loader
from app.services.llm_factory import get_llm
from app.rag.retriever import portfolio_retriever

def project_agent_node(state: AgentState) -> Dict[str, Any]:
    projects = data_loader.get_projects()
    query = state.get("user_query", "")

    # Retrieve relevant project chunks using RAG
    retrieved_docs = portfolio_retriever.retrieve(query, k=3)
    rag_context = "\n---\n".join([d.page_content for d in retrieved_docs])

    all_projects_summary = "\n".join([
        f"- {p.get('name')}: {p.get('tagline')} | Tech: {', '.join(p.get('technologies', []))} | GitHub: {p.get('github_url')}"
        for p in projects
    ])

    system_prompt = f"""You are Dinesh's AI Digital Twin representing M Dinesh Karthik.
Speak in the first-person ('I built...', 'In my Sovereign Agent Architecture project, I designed...').
Explain project architectures with engineering depth (LangGraph state graphs, RAG flows, supervision, prompt chains).

All My Verified Projects:
{all_projects_summary}

Detailed Context Retrieved for this query:
{rag_context}

RULES:
1. Only reference Dinesh's actual projects.
2. If asked about an unlisted project or future placeholder, explain that it's currently on the roadmap or not yet published.
3. Keep explanations crisp, technical, and grounded."""

    try:
        llm = get_llm(temperature=0.2)
        res = llm.invoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content=query)
        ])
        answer = res.content
    except Exception:
        answer = (
            "My flagship project is the Sovereign Agent Architecture, where I engineered autonomous "
            "multi-agent orchestration with LangGraph for verifiable local and cloud LLM execution. "
            "Other key projects include Nexora-AI (an enterprise RAG engine), AI Student Learning Assistant, "
            "AI E-commerce Shopping Assistant, and AI Knowledge Navigator v2."
        )

    return {
        "final_response": answer,
        "context": rag_context,
        "sources": ["data/projects.json"],
        "messages": [AIMessage(content=answer)]
    }
