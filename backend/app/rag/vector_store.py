from typing import List, Dict, Any, Tuple
import math
from app.rag.embeddings import embeddings_service

class Document:
    def __init__(self, page_content: str, metadata: Dict[str, Any] = None):
        self.page_content = page_content
        self.metadata = metadata or {}

class PortfolioVectorStore:
    """
    In-memory vector store with cosine similarity ranking.
    Interfaces match standard vector store contracts (pgvector / Qdrant ready).
    """
    def __init__(self):
        self.documents: List[Document] = []
        self.vectors: List[List[float]] = []

    def add_documents(self, docs: List[Document]):
        for doc in docs:
            vec = embeddings_service.embed_query(doc.page_content)
            self.documents.append(doc)
            self.vectors.append(vec)

    def similarity_search_with_score(self, query: str, k: int = 4) -> List[Tuple[Document, float]]:
        if not self.documents:
            return []
        q_vec = embeddings_service.embed_query(query)
        scored = []
        for i, doc in enumerate(self.documents):
            d_vec = self.vectors[i]
            # Cosine similarity
            dot = sum(a * b for a, b in zip(q_vec, d_vec))
            scored.append((doc, dot))
        scored.sort(key=lambda x: x[1], reverse=True)
        return scored[:k]

    def similarity_search(self, query: str, k: int = 4) -> List[Document]:
        return [doc for doc, _ in self.similarity_search_with_score(query, k=k)]

vector_store = PortfolioVectorStore()
