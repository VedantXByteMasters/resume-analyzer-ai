import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import CareerPageHeader from "./CareerPageHeader";
import BestRolesSection from "./BestRolesSection";
import SkillsToLearnSection from "./SkillsToLearnSection";
import CareerRoadmapTimeline from "./CareerRoadmapTimeline";

export default function CareerRoadmapPage() {
  const location = useLocation();
  const analysis = location.state?.analysis || null;

  // Default/fallback data structure
  const defaultAnalysis = {
    recommendedRoles: [],
    skillsToLearn: [],
    certifications: [],
    roadmap: []
  };

  const analysisData = analysis || defaultAnalysis;

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      {/* Preserve the roadmap-line style block exactly as provided */}
      <style>{`
        .roadmap-line::before {
            content: '';\n            position: absolute;\n            left: 20px;\n            top: 0;\n            bottom: 0;\n            width: 2px;\n            background: #e5e7eb;\n            z-index: 0;\n        }
        .dark .roadmap-line::before {
            background: #374151;\n        }
      `}</style>

      <div className="relative flex min-h-screen w-screen flex-col overflow-x-hidden">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-10">
          <CareerPageHeader />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <BestRolesSection analysis={analysisData} />
              <SkillsToLearnSection analysis={analysisData} />
            </div>

            <div className="lg:col-span-4">
              <CareerRoadmapTimeline analysis={analysisData} />
            </div>
          </div>

          {/* SDG 8 Context Footer (page content) — the shared Footer component will still be rendered below; keep this contextual banner */}
          <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 text-center pb-20">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg text-primary text-sm font-bold">
                <span className="material-symbols-outlined text-lg">public</span>
                Supporting UN Sustainable Development Goal 8
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-lg mx-auto italic">"Promoting sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all."</p>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
