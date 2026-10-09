from pydantic import BaseModel
from typing import Optional

class TranscribeRequest(BaseModel):
    audio_base64: str
    language: Optional[str] = "en"

class TranscribeResponse(BaseModel):
    text: str
    confidence: Optional[float] = 1.0

class SynthesizeRequest(BaseModel):
    text: str
    voice_id: Optional[str] = "default"

class SynthesizeResponse(BaseModel):
    audio_base64: str
    format: str = "audio/mp3"
