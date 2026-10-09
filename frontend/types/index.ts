export interface Profile {
  name: string;
  preferred_name: string;
  title: string;
  tagline: string;
  avatar_url: string;
  location: string;
  bio: string;
  about: string;
  contact: {
    email: string;
    phone?: string;
    github: string;
    linkedin: string;
    portfolio?: string;
  };
  interests: string[];
  twin_persona: {
    role: string;
    tone: string;
    greeting: string;
  };
}

export interface SkillItem {
  name: string;
  level: string;
  highlight: boolean;
}

export interface SkillCategory {
  name: string;
  skills: SkillItem[];
}

export interface EducationItem {
  institution: string;
  short_name: string;
  degree: string;
  field_of_study: string;
  period: string;
  status: string;
  grade?: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  agent_workflow?: string;
  highlights: string[];
  github_url: string;
  demo_url?: string | null;
  status: string;
  featured: boolean;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  agent_used?: string;
  timestamp: string;
  sources?: string[];
}
