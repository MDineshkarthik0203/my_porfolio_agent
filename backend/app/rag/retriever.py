from typing import List
from app.rag.vector_store import vector_store, Document
from app.services.data_loader import data_loader

class PortfolioRetriever:
    """
    RAG retriever that initializes the vector store from structured project documentation,
    readmes, and resume data.
    """
    def __init__(self):
        self._indexed = False

    def index_all(self):
        if self._indexed:
            return

        docs: List[Document] = []
        # Index projects
        for p in data_loader.get_projects():
            content = (
                f"Project: {p.get('name')}\n"
                f"Tagline: {p.get('tagline')}\n"
                f"Description: {p.get('description')}\n"
                f"Problem: {p.get('problem')}\n"
                f"Solution: {p.get('solution')}\n"
                f"Technologies: {', '.join(p.get('technologies', []))}\n"
                f"Agent Workflow: {p.get('agent_workflow')}\n"
                f"GitHub: {p.get('github_url')}"
            )
            docs.append(Document(page_content=content, metadata={"source": "projects", "id": p.get("id")}))

        # Index education
        for edu in data_loader.get_education():
            content = (
                f"Education: {edu.get('degree')} at {edu.get('institution')}\n"
                f"Field: {edu.get('field_of_study')}\n"
                f"Period: {edu.get('period')}\n"
                f"Grade / Status: {edu.get('grade', edu.get('status'))}\n"
                f"Details: {edu.get('description')}"
            )
            docs.append(Document(page_content=content, metadata={"source": "education"}))

        # Index skills
        for cat in data_loader.get_skills().get("categories", []):
            skill_names = [s.get("name") for s in cat.get("skills", [])]
            content = f"Skill Category: {cat.get('name')}\nSkills: {', '.join(skill_names)}"
            docs.append(Document(page_content=content, metadata={"source": "skills"}))

        vector_store.add_documents(docs)
        self._indexed = True

    def retrieve(self, query: str, k: int = 3) -> List[Document]:
        if not self._indexed:
            self.index_all()
        return vector_store.similarity_search(query, k=k)

portfolio_retriever = PortfolioRetriever()
