import httpx
import logging
import time
from typing import List, Dict, Any, Optional
from app.core.config import settings

logger = logging.getLogger(__name__)

class GitHubTool:
    """
    Retrieves public repositories for Dinesh (MDineshkarthik0203) with caching
    and error handling. Keeps credentials secret on backend.
    """
    def __init__(self):
        self.username = settings.GITHUB_USERNAME
        self.token = settings.GITHUB_ACCESS_TOKEN
        self._cache: Dict[str, Any] = {}
        self._cache_time: float = 0
        self._ttl_seconds: int = 1800  # 30 minutes cache

    async def get_repositories(self) -> List[Dict[str, Any]]:
        current_time = time.time()
        if self._cache.get("repos") and (current_time - self._cache_time < self._ttl_seconds):
            return self._cache["repos"]

        url = f"https://api.github.com/users/{self.username}/repos?sort=updated&per_page=30"
        headers = {"Accept": "application/vnd.github.v3+json"}
        if self.token:
            headers["Authorization"] = f"token {self.token}"

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.get(url, headers=headers)
                if res.status_code == 200:
                    repos_raw = res.json()
                    formatted_repos = []
                    for r in repos_raw:
                        formatted_repos.append({
                            "id": r.get("id"),
                            "name": r.get("name"),
                            "full_name": r.get("full_name"),
                            "description": r.get("description") or "Open-source AI project",
                            "html_url": r.get("html_url"),
                            "language": r.get("language") or "Python",
                            "stargazers_count": r.get("stargazers_count", 0),
                            "forks_count": r.get("forks_count", 0),
                            "updated_at": r.get("updated_at"),
                            "topics": r.get("topics", [])
                        })
                    self._cache["repos"] = formatted_repos
                    self._cache_time = current_time
                    return formatted_repos
                else:
                    logger.warning(f"GitHub API returned status {res.status_code}: {res.text}")
                    return self._fallback_repos()
        except Exception as e:
            logger.error(f"Error fetching from GitHub API: {e}")
            return self._fallback_repos()

    def _fallback_repos(self) -> List[Dict[str, Any]]:
        """Fallback list of verified GitHub repositories provided by user."""
        return [
            {
                "id": 1,
                "name": "sovereign-agent-architecture",
                "full_name": f"{self.username}/sovereign-agent-architecture",
                "description": "Autonomous multi-agent architecture built for sovereign LLMs and verifiable workflows",
                "html_url": f"https://github.com/{self.username}/sovereign-agent-architecture",
                "language": "Python",
                "stargazers_count": 0,
                "forks_count": 0,
                "topics": ["langgraph", "multi-agent", "agentic-ai", "mistral-ai"]
            },
            {
                "id": 2,
                "name": "Nexora-AI",
                "full_name": f"{self.username}/Nexora-AI",
                "description": "Next-generation intelligent agent platform for contextual reasoning and automation",
                "html_url": f"https://github.com/{self.username}/Nexora-AI",
                "language": "Python",
                "stargazers_count": 0,
                "forks_count": 0,
                "topics": ["generative-ai", "rag", "fastapi", "react"]
            },
            {
                "id": 3,
                "name": "AI-Student-Learning-Assistant",
                "full_name": f"{self.username}/AI-Student-Learning-Assistant",
                "description": "Personalized adaptive learning companion powered by generative AI",
                "html_url": f"https://github.com/{self.username}/AI-Student-Learning-Assistant",
                "language": "Python",
                "stargazers_count": 0,
                "forks_count": 0,
                "topics": ["ai-tutor", "generative-ai", "nlp", "llm"]
            },
            {
                "id": 4,
                "name": "AI-E-commerce-Shopping-Assistant",
                "full_name": f"{self.username}/AI-E-commerce-Shopping-Assistant",
                "description": "Conversational commerce agent for product recommendation and preference discovery",
                "html_url": f"https://github.com/{self.username}/AI-E-commerce-Shopping-Assistant",
                "language": "Python",
                "stargazers_count": 0,
                "forks_count": 0,
                "topics": ["django", "conversational-ai", "recommendation-system"]
            },
            {
                "id": 5,
                "name": "ai-knowledge-navigator-v2",
                "full_name": f"{self.username}/ai-knowledge-navigator-v2",
                "description": "Scalable multi-source RAG engine and knowledge exploration interface",
                "html_url": f"https://github.com/{self.username}/ai-knowledge-navigator-v2",
                "language": "Python",
                "stargazers_count": 0,
                "forks_count": 0,
                "topics": ["rag", "langchain", "vector-database", "deep-search"]
            }
        ]

github_tool = GitHubTool()
