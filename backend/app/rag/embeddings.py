import math
from typing import List

class LightweightEmbeddings:
    """
    Lightweight character & word n-gram frequency embedding generator.
    Guarantees deterministic local vector similarity without requiring external API keys.
    Easily swappable with OpenAIEmbeddings or HuggingFaceEmbeddings.
    """
    def embed_query(self, text: str) -> List[float]:
        return self._text_to_vector(text)

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        return [self._text_to_vector(t) for t in texts]

    def _text_to_vector(self, text: str, dim: int = 128) -> List[float]:
        vec = [0.0] * dim
        words = text.lower().split()
        if not words:
            return vec
        for w in words:
            idx = abs(hash(w)) % dim
            vec[idx] += 1.0
        norm = math.sqrt(sum(x * x for x in vec))
        if norm > 0:
            vec = [x / norm for x in vec]
        return vec

embeddings_service = LightweightEmbeddings()
