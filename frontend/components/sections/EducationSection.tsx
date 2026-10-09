"use client";

import React from "react";
import { GraduationCap, Award, Calendar, CheckCircle } from "lucide-react";

interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  period: string;
  grade?: string;
  status: string;
  description: string;
}

const EDUCATION: EducationItem[] = [
  {
    institution: "Indian Institute of Information Technology Kottayam",
    degree: "Bachelor of Technology - BTech",
    field: "Computer Science",
    period: "Aug 2024 – Apr 2028",
    status: "Currently Pursuing (Undergraduate)",
    description: "Rigorous computer science curriculum emphasizing AI systems, data structures & algorithms, computer architecture, and distributed systems engineering.",
  },
  {
    institution: "Narayana Junior College - India",
    degree: "Intermediate (10+2)",
    field: "Mathematics, Physics, Chemistry",
    period: "Jun 2022 – Apr 2024",
    status: "Completed",
    description: "Intensive preparation in advanced mathematics, analytical reasoning, and physics foundations.",
  },
  {
    institution: "Sri Chaitanya Techno School",
    degree: "Secondary Education",
    field: "School, Techno",
    period: "Jun 2017 – Apr 2022",
    grade: "94.33%",
    status: "Completed with Distinction",
    description: "Completed secondary education with top honors and an overall score of 94.33%.",
  },
];

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 border-t border-border/80 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-emerald-400">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Education & Academic Background
          </h2>
          <p className="text-sm sm:text-base text-muted max-w-2xl">
            Verified academic milestones from Indian Institute of Information Technology Kottayam
            and foundational STEM credentials.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="space-y-6">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
                  {edu.grade && (
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                      Grade: {edu.grade}
                    </span>
                  )}
                </div>

                <div className="text-sm font-medium text-accent">
                  {edu.degree} • <span className="text-slate-300">{edu.field}</span>
                </div>

                <p className="text-xs text-muted leading-relaxed pt-1">
                  {edu.description}
                </p>
              </div>

              <div className="flex md:flex-col md:items-end justify-between items-center gap-2 flex-shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-border/60">
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>{edu.period}</span>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-surface border border-border text-slate-300">
                  {edu.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
