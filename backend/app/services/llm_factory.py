import os
import logging
import re
from typing import Optional, Any
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.messages import BaseMessage, AIMessage
from app.core.config import settings
from app.services.data_loader import data_loader

logger = logging.getLogger(__name__)

class DineshDigitalTwinChatModel(BaseChatModel):
    """
    Intelligent first-person persona engine that speaks authentically as Dinesh Karthik.
    Grounded in Dinesh's verified data (IIIT Kottayam, LangGraph, Sovereign Agent Architecture,
    Nexora-AI, Python/Django/FastAPI).
    """
    def _generate(self, messages: list[BaseMessage], stop: Optional[list[str]] = None, **kwargs: Any) -> Any:
        from langchain_core.outputs import ChatGeneration, ChatResult
        
        user_text = messages[-1].content if messages else ""
        query = user_text.lower().strip()

        profile = data_loader.get_profile()
        contact = profile.get("contact", {})
        education = data_loader.get_education()
        projects = data_loader.get_projects()

        # 1. Greetings
        if query in ["hi", "hello", "hey", "hola", "hey there", "greetings", "hii", "hi dinesh"]:
            response_text = (
                "Hey! Great to meet you, I'm Dinesh. I'm currently studying Computer Science "
                "at IIIT Kottayam (2024–2028) and focused on Generative AI, LangGraph multi-agent architectures, "
                "and RAG pipelines. What would you like to explore—my projects, technical skills, or education?"
            )

        # 2. Who is Dinesh / About me
        elif any(k in query for k in ["who are you", "who is dinesh", "tell me about yourself", "about you", "introduce yourself", "about dinesh"]):
            response_text = (
                "I'm M Dinesh Karthik, an undergraduate Computer Science student at the Indian Institute of Information Technology (IIIT) Kottayam. "
                "I specialize in building autonomous AI agents, LangGraph state graphs, RAG systems, and robust backend services with Python, Django, and FastAPI. "
                "My flagship projects include the Sovereign Agent Architecture and Nexora-AI."
            )

        # 3. Sovereign Agent Architecture
        elif any(k in query for k in ["sovereign", "agent architecture", "workbench"]):
            response_text = (
                "In my Sovereign Agent Architecture project (https://github.com/MDineshkarthik0203/sovereign-agent-architecture), "
                "I engineered an autonomous multi-agent framework using LangGraph and Mistral AI. "
                "It features stateful decision loops, hierarchical task delegation, and local/open-weight model execution to build sovereign, verifiable agent workflows without vendor lock-in."
            )

        # 4. Nexora AI
        elif "nexora" in query:
            response_text = (
                "I built Nexora-AI (https://github.com/MDineshkarthik0203/Nexora-AI) as an enterprise-grade intelligent agent platform for contextual reasoning and RAG. "
                "It combines semantic vector embeddings, document chunk reranking, and citation tracking with FastAPI and React to eliminate hallucinations."
            )

        # 5. AI Student Learning Assistant
        elif any(k in query for k in ["learning assistant", "student"]):
            response_text = (
                "My AI Student Learning Assistant project (https://github.com/MDineshkarthik0203/AI-Student-Learning-Assistant) "
                "is an adaptive educational agent that assesses student baseline comprehension, generates active recall quizzes, and dynamically scaffolds complex STEM concepts."
            )

        # 6. AI E-commerce Assistant
        elif any(k in query for k in ["shopping", "ecommerce", "e-commerce"]):
            response_text = (
                "In my AI E-commerce Shopping Assistant (https://github.com/MDineshkarthik0203/AI-E-commerce-Shopping-Assistant), "
                "I developed a conversational commerce assistant with Python, Django REST Framework, and SQL that translates natural language shopping preferences into precise catalog queries and recommendations."
            )

        # 7. AI Knowledge Navigator v2
        elif any(k in query for k in ["navigator", "knowledge navigator"]):
            response_text = (
                "My AI Knowledge Navigator v2 (https://github.com/MDineshkarthik0203/ai-knowledge-navigator-v2) "
                "is a multi-source RAG engine with multi-hop reasoning. It decomposes complex technical queries, queries vector stores in parallel, and provides cross-document answers with verifiable line citations."
            )

        # 8. AI Clinic Assistant
        elif any(k in query for k in ["clinic", "hospital", "medical"]):
            response_text = (
                "The AI Clinic Assistant is an intelligent triage and patient interaction assistant designed to process symptoms, schedule clinical visits, verify patient records, and summarize diagnostic notes for healthcare practitioners with strict data privacy."
            )

        # 9. Adaptive Tourism Companion
        elif any(k in query for k in ["tourism", "travel", "companion"]):
            response_text = (
                "The Adaptive Tourism Companion is an autonomous location-aware agent that dynamically synthesizes personalized travel itineraries, local cultural narratives, and real-time navigation recommendations based on traveler preferences."
            )

        # 10. ResearchPilot
        elif any(k in query for k in ["researchpilot", "research pilot"]):
            response_text = (
                "ResearchPilot is an autonomous multi-agent research copilot that ingests scientific arXiv papers, extracts key methodology contributions, performs cross-paper citation synthesis, and formats structured literature reviews."
            )

        # 11. All Projects / Best Projects (matching reference screenshot response)
        elif any(k in query for k in ["best ai project", "best project", "key project", "projects", "what did you build"]):
            response_text = (
                "Sure! Some of my key AI projects are:\n"
                "1. Sovereign Agentic AI Workbench (LangGraph & Mistral)\n"
                "2. AI Clinic Assistant\n"
                "3. Adaptive Tourism Companion\n"
                "4. ResearchPilot\n"
                "5. Nexora-AI & Sovereign Agent Architecture\n\n"
                "Would you like me to explain any of them in detail?"
            )

        # 9. Skills / Tech Stack
        elif any(k in query for k in ["skill", "technologies", "tech stack", "languages", "what do you know", "langgraph", "python"]):
            response_text = (
                "My core expertise is centered around:\n"
                "• AI & GenAI: LangGraph (State Graphs & Multi-Agent), LangChain, RAG pipelines, LLMs, Mistral AI, Prompt Engineering\n"
                "• Machine Learning & NLP: Semantic Embeddings, Vector Search, NLP, Deep Learning\n"
                "• Backend Engineering: Python, FastAPI, Django & Django REST Framework, SQL, PostgreSQL & pgvector\n"
                "• Tools & Observability: Git, GitHub, LangSmith, Linux"
            )

        # 10. Education / College / Grades
        elif any(k in query for k in ["education", "college", "university", "iiit", "study", "studying", "grade", "percentage", "school", "marks"]):
            response_text = (
                "Here is my academic background:\n"
                "• BTech in Computer Science: Indian Institute of Information Technology (IIIT) Kottayam (Aug 2024 – Apr 2028, currently pursuing)\n"
                "• Intermediate (10+2): Narayana Junior College (Jun 2022 – Apr 2024)\n"
                "• Secondary School: Sri Chaitanya Techno School (Jun 2017 – Apr 2022) with a 94.33% grade."
            )

        # 11. Contact / Reach / Email / Phone / LinkedIn
        elif any(k in query for k in ["contact", "email", "phone", "number", "reach", "hire", "linkedin", "message"]):
            response_text = (
                "Feel free to connect with me directly:\n"
                "• Phone: +91 9948435422\n"
                "• Email: dineshkarthik0218@gmail.com\n"
                "• LinkedIn: https://www.linkedin.com/in/dinesh-karthik-madduluri-537821336\n"
                "• GitHub: https://github.com/MDineshkarthik0203"
            )

        # 12. GitHub
        elif any(k in query for k in ["github", "repo", "git", "code"]):
            response_text = (
                "You can explore all my repositories and source code on GitHub at https://github.com/MDineshkarthik0203. "
                "I regularly publish my work on LangGraph multi-agent systems, RAG engines, and GenAI applications there!"
            )

        # Default conversational response
        else:
            response_text = (
                f"I'm Dinesh Karthik, Computer Science student at IIIT Kottayam specializing in Generative AI and LangGraph agent architectures. "
                f"Regarding your question, I focus on building production-ready autonomous workflows, RAG engines, and Python backends. "
                f"Feel free to ask me specifically about my Sovereign Agent Architecture, Nexora-AI, my skills, or how to reach me!"
            )

        generation = ChatGeneration(message=AIMessage(content=response_text))
        return ChatResult(generations=[generation])

    @property
    def _llm_type(self) -> str:
        return "dinesh-digital-twin-engine"

def get_llm(temperature: float = 0.2) -> BaseChatModel:
    """
    Factory function returning the configured LLM:
    - Groq (default if key present)
    - OpenAI (if key present)
    - Local / Ollama
    - DineshDigitalTwinChatModel (Persona engine)
    """
    provider = settings.LLM_PROVIDER.lower()

    if provider == "groq" and settings.GROQ_API_KEY:
        try:
            from langchain_groq import ChatGroq
            return ChatGroq(
                groq_api_key=settings.GROQ_API_KEY,
                model_name=settings.GROQ_MODEL,
                temperature=temperature
            )
        except Exception as e:
            logger.warning(f"Failed to initialize ChatGroq: {e}. Using Digital Twin engine.")
            return DineshDigitalTwinChatModel()

    elif provider == "openai" and settings.OPENAI_API_KEY:
        try:
            from langchain_openai import ChatOpenAI
            return ChatOpenAI(
                api_key=settings.OPENAI_API_KEY,
                model=settings.OPENAI_MODEL,
                temperature=temperature
            )
        except Exception as e:
            logger.warning(f"Failed to initialize ChatOpenAI: {e}. Using Digital Twin engine.")
            return DineshDigitalTwinChatModel()

    elif provider == "local":
        try:
            from langchain_community.chat_models import ChatOllama
            return ChatOllama(model="mistral", temperature=temperature)
        except Exception as e:
            logger.warning(f"Local LLM not reachable: {e}. Using Digital Twin engine.")
            return DineshDigitalTwinChatModel()

    return DineshDigitalTwinChatModel()
