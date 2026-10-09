from pydantic import BaseModel, Field
from typing import List, Optional, Literal

class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str
    agent_used: Optional[str] = None
    timestamp: Optional[str] = None

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000, description="The user query or voice prompt")
    history: Optional[List[ChatMessage]] = Field(default_factory=list, description="Recent conversation turns")
    conversation_id: Optional[str] = None
    mode: Literal["text", "voice"] = "text"

class ChatResponse(BaseModel):
    response: str
    routed_agent: str
    audio_base64: Optional[str] = None
    suggested_actions: Optional[List[str]] = Field(default_factory=list)
    sources: Optional[List[str]] = Field(default_factory=list)
