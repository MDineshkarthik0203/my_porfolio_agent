import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import router as api_router
from app.rag.retriever import portfolio_retriever

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("twin_portfolio")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Index knowledge documents into RAG vector retriever
    logger.info("Initializing RAG vector knowledge base...")
    try:
        portfolio_retriever.index_all()
        logger.info("RAG vector store indexed successfully.")
    except Exception as e:
        logger.warning(f"RAG indexing warning: {e}")
    yield
    logger.info("Shutting down AI Digital Twin Portfolio backend.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend API and LangGraph Supervisor for Dinesh's AI Digital Twin Portfolio",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits localhost Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routes
app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {
        "message": "AI Digital Twin Portfolio API",
        "docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
