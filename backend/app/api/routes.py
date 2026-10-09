import logging
from fastapi import APIRouter, HTTPException, Depends
from langchain_core.messages import HumanMessage, AIMessage

from app.schemas.chat import ChatRequest, ChatResponse, ChatMessage
from app.schemas.profile import ProfileSchema, SkillsSchema, EducationItem, ProjectItem
from app.schemas.voice import TranscribeRequest, TranscribeResponse, SynthesizeRequest, SynthesizeResponse
from app.services.data_loader import data_loader
from app.services.voice_service import voice_service
from app.tools.github_tool import github_tool
from app.agents.graph import portfolio_graph

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "ok", "service": "AI Digital Twin Portfolio API"}

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Primary endpoint for text and voice conversation with Dinesh's AI Digital Twin.
    Routes queries through the LangGraph Portfolio Supervisor.
    """
    try:
        # Reconstruct chat history messages
        messages = []
        if request.history:
            for h in request.history[-6:]:
                if h.role == "user":
                    messages.append(HumanMessage(content=h.content))
                elif h.role == "assistant":
                    messages.append(AIMessage(content=h.content))
        messages.append(HumanMessage(content=request.message))

        initial_state = {
            "messages": messages,
            "user_query": request.message,
            "next_agent": None,
            "context": None,
            "final_response": None,
            "routed_agent": None,
            "sources": []
        }

        # Invoke LangGraph
        result_state = portfolio_graph.invoke(initial_state)

        final_response = result_state.get("final_response") or "Thank you for asking. I am here to discuss Dinesh's AI and engineering journey."
        routed_agent = result_state.get("routed_agent") or "Portfolio Supervisor"
        sources = result_state.get("sources") or []

        # Suggest contextual followup questions
        suggestions = [
            "Tell me about Dinesh's Sovereign Agent Architecture",
            "What technologies does Dinesh specialize in?",
            "Can you show me his GitHub repositories?",
            "What is his educational background at IIIT Kottayam?"
        ]

        return ChatResponse(
            response=final_response,
            routed_agent=routed_agent,
            audio_base64=None,
            suggested_actions=suggestions[:3],
            sources=sources
        )
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to process chat: {str(e)}")

@router.get("/profile")
async def get_profile():
    return data_loader.get_profile()

@router.get("/projects")
async def get_projects():
    return data_loader.get_projects()

@router.get("/projects/{project_id}")
async def get_project(project_id: str):
    project = data_loader.get_project_by_id(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/skills")
async def get_skills():
    return data_loader.get_skills()

@router.get("/education")
async def get_education():
    return data_loader.get_education()

@router.get("/github")
async def get_github_repos():
    repos = await github_tool.get_repositories()
    return {"username": github_tool.username, "repositories": repos}

@router.get("/resume")
async def get_resume():
    return {
        "profile": data_loader.get_profile(),
        "education": data_loader.get_education(),
        "skills": data_loader.get_skills(),
        "experience": data_loader.get_experience(),
        "achievements": data_loader.get_achievements()
    }

@router.post("/voice/transcribe", response_model=TranscribeResponse)
async def transcribe_audio(request: TranscribeRequest):
    return await voice_service.transcribe_audio(request.audio_base64, request.language or "en")

@router.post("/voice/synthesize", response_model=SynthesizeResponse)
async def synthesize_speech(request: SynthesizeRequest):
    return await voice_service.synthesize_speech(request.text, request.voice_id or "default")
