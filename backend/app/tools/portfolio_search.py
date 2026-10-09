from typing import Dict, Any, List
from app.services.data_loader import data_loader

class PortfolioSearchTool:
    """
    Search and retrieval tool for structured portfolio metadata.
    """
    def search_profile(self) -> Dict[str, Any]:
        return data_loader.get_profile()

    def search_projects(self, query: str = "") -> List[Dict[str, Any]]:
        projects = data_loader.get_projects()
        if not query:
            return projects
        q = query.lower()
        return [
            p for p in projects
            if q in p.get("name", "").lower()
            or q in p.get("description", "").lower()
            or any(q in t.lower() for t in p.get("technologies", []))
        ]

    def search_skills(self, category_or_name: str = "") -> List[Dict[str, Any]]:
        categories = data_loader.get_skills().get("categories", [])
        if not category_or_name:
            return categories
        q = category_or_name.lower()
        results = []
        for cat in categories:
            matched_skills = [
                s for s in cat.get("skills", [])
                if q in s.get("name", "").lower() or q in cat.get("name", "").lower()
            ]
            if matched_skills:
                results.append({"name": cat.get("name"), "skills": matched_skills})
        return results

    def search_education(self) -> List[Dict[str, Any]]:
        return data_loader.get_education()

portfolio_search_tool = PortfolioSearchTool()
