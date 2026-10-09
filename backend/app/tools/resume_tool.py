from typing import Dict, Any
from app.services.data_loader import data_loader

class ResumeTool:
    """
    Summarizes credentials, degrees, and academic milestones for Dinesh.
    """
    def get_resume_summary(self) -> Dict[str, Any]:
        profile = data_loader.get_profile()
        education = data_loader.get_education()
        skills = data_loader.get_skills()
        experience = data_loader.get_experience()
        achievements = data_loader.get_achievements()

        return {
            "name": profile.get("name"),
            "title": profile.get("title"),
            "contact": profile.get("contact"),
            "education": education,
            "skills": skills,
            "experience": experience,
            "achievements": achievements,
            "resume_download_url": "/api/resume/download"
        }

resume_tool = ResumeTool()
