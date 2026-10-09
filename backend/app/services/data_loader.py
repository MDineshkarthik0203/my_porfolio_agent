import json
from pathlib import Path
from typing import Dict, Any, List, Optional
from app.core.config import settings

class PortfolioDataLoader:
    _instance = None
    _data_cache: Dict[str, Any] = {}

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(PortfolioDataLoader, cls).__new__(cls)
            cls._instance._load_all()
        return cls._instance

    def _load_json_file(self, filename: str) -> Any:
        file_path = settings.DATA_DIR / filename
        if not file_path.exists():
            # Fallback relative to project root
            file_path = Path(__file__).resolve().parent.parent.parent.parent / "data" / filename
        if file_path.exists():
            with open(file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        return None

    def _load_all(self):
        files = [
            "profile.json",
            "education.json",
            "skills.json",
            "projects.json",
            "experience.json",
            "achievements.json",
        ]
        for f in files:
            key = f.replace(".json", "")
            data = self._load_json_file(f)
            if data is not None:
                self._data_cache[key] = data

    def get_profile(self) -> Dict[str, Any]:
        return self._data_cache.get("profile", {})

    def get_education(self) -> List[Dict[str, Any]]:
        return self._data_cache.get("education", [])

    def get_skills(self) -> Dict[str, Any]:
        return self._data_cache.get("skills", {"categories": []})

    def get_projects(self) -> List[Dict[str, Any]]:
        return self._data_cache.get("projects", [])

    def get_project_by_id(self, project_id: str) -> Optional[Dict[str, Any]]:
        for p in self.get_projects():
            if p.get("id") == project_id or p.get("name", "").lower() == project_id.lower():
                return p
        return None

    def get_experience(self) -> List[Dict[str, Any]]:
        return self._data_cache.get("experience", [])

    def get_achievements(self) -> List[Dict[str, Any]]:
        return self._data_cache.get("achievements", [])

    def reload(self):
        self._data_cache.clear()
        self._load_all()

data_loader = PortfolioDataLoader()
