import logging
from langgraph.graph import StateGraph, END
from app.agents.state import AgentState
from app.agents.supervisor import supervisor_node
from app.agents.profile_agent import profile_agent_node
from app.agents.project_agent import project_agent_node
from app.agents.skills_agent import skills_agent_node
from app.agents.resume_agent import resume_agent_node
from app.agents.github_agent import github_agent_node
from app.agents.contact_agent import contact_agent_node

logger = logging.getLogger(__name__)

def route_next_agent(state: AgentState) -> str:
    agent = state.get("next_agent", "profile_agent")
    valid_destinations = {
        "profile_agent",
        "project_agent",
        "skills_agent",
        "resume_agent",
        "github_agent",
        "contact_agent"
    }
    if agent in valid_destinations:
        return agent
    return "profile_agent"

def build_portfolio_graph():
    """
    Constructs the LangGraph hierarchical supervisor graph.
    """
    workflow = StateGraph(AgentState)

    # Add Supervisor node
    workflow.add_node("supervisor", supervisor_node)

    # Add Specialist Agent nodes
    workflow.add_node("profile_agent", profile_agent_node)
    workflow.add_node("project_agent", project_agent_node)
    workflow.add_node("skills_agent", skills_agent_node)
    workflow.add_node("resume_agent", resume_agent_node)
    workflow.add_node("github_agent", github_agent_node)
    workflow.add_node("contact_agent", contact_agent_node)

    # Set Entry Point to Supervisor
    workflow.set_entry_point("supervisor")

    # Conditional Routing from Supervisor to Specialist Agents
    workflow.add_conditional_edges(
        "supervisor",
        route_next_agent,
        {
            "profile_agent": "profile_agent",
            "project_agent": "project_agent",
            "skills_agent": "skills_agent",
            "resume_agent": "resume_agent",
            "github_agent": "github_agent",
            "contact_agent": "contact_agent",
        }
    )

    # Connect each specialist agent directly to END
    workflow.add_edge("profile_agent", END)
    workflow.add_edge("project_agent", END)
    workflow.add_edge("skills_agent", END)
    workflow.add_edge("resume_agent", END)
    workflow.add_edge("github_agent", END)
    workflow.add_edge("contact_agent", END)

    return workflow.compile()

# Singleton compiled graph
portfolio_graph = build_portfolio_graph()
