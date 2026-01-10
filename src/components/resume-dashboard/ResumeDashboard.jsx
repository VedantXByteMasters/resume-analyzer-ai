import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import DashboardHeader from "./DashboardHeader";
import OverallScoreCard from "./OverallScoreCard";
import ATSCompatibilityCard from "./ATSCompatibilityCard";
import MarketMatchCard from "./MarketMatchCard";
import StrengthsCard from "./StrengthsCard";
import WeaknessesCard from "./WeaknessesCard";
import SkillsVisualization from "./SkillsVisualization";
import ActionableSuggestions from "./ActionableSuggestions";

export default function ResumeDashboard() {
  const location = useLocation();
  const analysis = location.state?.analysis || null;
  const resumeText = location.state?.resumeText || "";

  // Default/fallback data structure
  const defaultAnalysis = {
    resumeScore: 0,
    atsStatus: "Needs Improvement",
    strengths: [],
    weaknesses: [],
    technicalSkills: [],
    softSkills: [],
    improvements: [],
    recommendedRoles: [],
    skillsToLearn: [],
    certifications: [],
    roadmap: []
  };

  const analysisData = analysis || defaultAnalysis;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#121317] dark:text-white transition-colors duration-200">
      {/* Inline styles for circular-progress preserved exactly as provided */}
      <style>{`        
        .circular-progress {
            background: radial-gradient(closest-side, white 79%, transparent 80% 100%),
                        conic-gradient(#1e3fae 82%, #dcdee5 0);
        }
        .dark .circular-progress {
            background: radial-gradient(closest-side, #1b1c1d 79%, transparent 80% 100%),
                        conic-gradient(#1e3fae 82%, #374151 0);
        }
      `}</style>

      <div className="relative flex min-h-screen w-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1">
          <main className="max-w-[1200px] mx-auto p-4 md:p-8">
            <DashboardHeader analysis={analysisData} resumeText={resumeText} />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <OverallScoreCard analysis={analysisData} />

              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ATSCompatibilityCard analysis={analysisData} />
                <MarketMatchCard analysis={analysisData} />
              </div>

              <StrengthsCard analysis={analysisData} />
              <WeaknessesCard analysis={analysisData} />

              <SkillsVisualization analysis={analysisData} />

              <ActionableSuggestions analysis={analysisData} />
            </div>

            {/* SDG 8 Footer Banner (keep as part of page content, not footer) */}
            <div className="mt-12 p-8 rounded-2xl bg-[#121317] text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-2">Sustainable Development Goal 8</h4>
                <p className="text-gray-400 text-sm max-w-xl">We are committed to promoting sustained, inclusive, and sustainable economic growth, full and productive employment, and decent work for all. Our AI helps you get there faster.</p>
              </div>
              <button className="relative z-10 px-6 py-3 bg-white text-[#121317] font-bold rounded-lg whitespace-nowrap hover:bg-gray-200 transition-colors">
                Explore Career Paths
              </button>
              <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-gradient-to-l from-primary to-transparent"></div>
            </div>

          </main>
        </main>
        <Footer />
      </div>
    </div>
  );
}
