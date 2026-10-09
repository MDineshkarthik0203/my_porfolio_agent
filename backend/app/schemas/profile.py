from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class ContactInfo(BaseModel):
    email: str
    phone: Optional[str] = None
    github: str
    linkedin: str
    portfolio: Optional[str] = None

class TwinPersona(BaseModel):
    role: str
    tone: str
    greeting: str

class ProfileSchema(BaseModel):
    name: str
    preferred_name: str
    title: str
    tagline: str
    avatar_url: str
    location: str
    bio: str
    about: str
    contact: ContactInfo
    interests: List[str]
    twin_persona: TwinPersona

class SkillItem(BaseModel):
    name: str
    level: str
    highlight: bool

class SkillCategory(BaseModel):
    name: str
    skills: List[SkillItem]

class SkillsSchema(BaseModel):
    categories: List[SkillCategory]

class EducationItem(BaseModel):
    institution: str
    short_name: str
    degree: str
    field_of_study: str
    period: str
    status: str
    grade: Optional[str] = None
    description: str

class ProjectItem(BaseModel):
    id: str
    name: str
    tagline: str
    description: str
    problem: str
    solution: str
    technologies: List[str]
    agent_workflow: Optional[str] = None
    highlights: List[str]
    github_url: str
    demo_url: Optional[str] = None
    status: str
    featured: bool
