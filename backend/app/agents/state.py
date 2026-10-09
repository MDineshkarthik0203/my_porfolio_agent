from typing import TypedDict, Annotated, Sequence, List, Optional
import operator
from langchain_core.messages import BaseMessage

class AgentState(TypedDict):
    """
    Typed state object propagated across LangGraph supervisor and worker agent nodes.
    """
    messages: Annotated[Sequence[BaseMessage], operator.add]
    user_query: str
    next_agent: Optional[str]
    context: Optional[str]
    final_response: Optional[str]
    routed_agent: Optional[str]
    sources: Optional[List[str]]
