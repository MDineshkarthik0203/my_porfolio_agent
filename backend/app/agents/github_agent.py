import json
import asyncio
from typing import Dict, Any
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from app.agents.state import AgentState
from app.tools.github_tool import github_tool
from app.services.llm_factory import get_llm

def github_agent_node(state: AgentState) -> Dict[str, Any]:
    query = state.get("user_query", "")
    
    # Synchronously fetch repos (using cached or fallback)
    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            # In existing event loop
            repos = github_tool._cache.get("repos") or github_tool._fallback_repos()
        else:
            repos = loop.run_until_complete(github_tool.get_repositories())
    except Exception:
        repos = github_tool._fallback_repos()

    repo_text = "\n".join([
        f"- {r.get('name')} ({r.get('language')}): {r.get('description')} [URL: {r.get('html_url')}]"
        for r in repos[:6]
    ])

    system_prompt = f"""You are Dinesh's AI Digital Twin representing M Dinesh Karthik.
Speak in the first-person ('On my GitHub (MDineshkarthik0203), I maintain several open-source repositories...').

Public Repositories:
{repo_text}

GitHub Profile: https://github.com/MDineshkarthik0203

RULES:
1. Provide repository names, technical summaries, and URLs directly.
2. Highlight key projects: sovereign-agent-architecture, Nexora-AI, AI-Student-Learning-Assistant, AI-E-commerce-Shopping-Assistant, ai-knowledge-navigator-v2.
3. Keep the tone developer-focused and invite the user to star or explore the repos."""

    try:
        llm = get_llm(temperature=0.2)
        res = llm.invoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content=query)
        ])
        answer = res.content
    except Exception:
        answer = (
            "You can explore all my open-source repositories at https://github.com/MDineshkarthik0203. "
            "Key featured repositories include sovereign-agent-architecture (autonomous multi-agent system), "
            "Nexora-AI (enterprise RAG), AI-Student-Learning-Assistant, and AI-E-commerce-Shopping-Assistant."
        )

    return {
        "final_response": answer,
        "context": repo_text,
        "sources": ["GitHub API (MDineshkarthik0203)"],
        "messages": [AIMessage(content=answer)]
    }
