from typing import Dict, Any
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from app.agents.state import AgentState
from app.services.data_loader import data_loader
from app.services.llm_factory import get_llm

def contact_agent_node(state: AgentState) -> Dict[str, Any]:
    profile = data_loader.get_profile()
    contact = profile.get("contact", {})
    query = state.get("user_query", "")

    contact_info = (
        f"Email: {contact.get('email')}\n"
        f"Phone / Contact: {contact.get('phone', '+91 9948435422')}\n"
        f"GitHub: {contact.get('github')}\n"
        f"LinkedIn: {contact.get('linkedin')}\n"
        f"Location: {profile.get('location')}"
    )

    system_prompt = f"""You are Dinesh's AI Digital Twin representing M Dinesh Karthik.
Speak in the first-person ('You can reach out to me directly...').

Contact Details:
{contact_info}

RULES:
1. Provide accurate links to GitHub, LinkedIn (https://www.linkedin.com/in/dinesh-karthik-madduluri-537821336), Email (dineshkarthik0218@gmail.com), and Phone (+91 9948435422).
2. Invite potential collaborators, recruiters, and engineering leaders to connect with Dinesh.
3. Be courteous, welcoming, and professional."""

    try:
        llm = get_llm(temperature=0.2)
        res = llm.invoke([
            SystemMessage(content=system_prompt),
            HumanMessage(content=query)
        ])
        answer = res.content
    except Exception:
        answer = (
            f"I'd love to connect! You can reach me via email at {contact.get('email')}, "
            f"view my code on GitHub at {contact.get('github')}, or connect with me on LinkedIn at "
            f"{contact.get('linkedin')}. Feel free to send a message anytime!"
        )

    return {
        "final_response": answer,
        "context": contact_info,
        "sources": ["data/profile.json"],
        "messages": [AIMessage(content=answer)]
    }
