import React from "react";

export default function OverallScoreCard({ analysis }) {
  const rawScore = analysis?.resumeScore || 0;
  const score = Math.max(0, Math.min(100, rawScore));
  
  // Calculate percentile text
  const percentileText = score >= 90 ? "Top 10%" : score >= 80 ? "Top 20%" : score >= 70 ? "Top 30%" : score >= 60 ? "Top 40%" : "Top 50%";

  // Dynamic circular progress - percentage of 360 degrees
  const progressPercentage = score;

  return (
    <div className="md:col-span-4 bg-white dark:bg-gray-800 p-6 rounded-xl border border-[#dcdee5] dark:border-gray-700 flex flex-col items-center justify-center text-center">
      <h3 className="text-[#121317] dark:text-white text-lg font-bold mb-6 self-start">Overall Strength</h3>
      <div className="relative size-40 mb-6">
        {/* Circular Progress Background */}
        <svg className="size-40 -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#dcdee5"
            strokeWidth="8"
            className="dark:stroke-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#1e3fae"
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        {/* Score Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-4xl font-black text-[#121317] dark:text-white">{score}</span>
            <span className="text-lg text-[#656d86] dark:text-gray-400 font-medium">/100</span>
          </div>
        </div>
      </div>
      <p className="text-success font-semibold text-sm mb-1 flex items-center justify-center gap-1">
        <span className="material-symbols-outlined text-sm">trending_up</span>
        {percentileText} of candidates
      </p>
      <p className="text-[#656d86] dark:text-gray-400 text-xs px-4">
        Resume Strength Score based on ATS compatibility, keyword matching, and industry standards.
      </p>
    </div>
  );
}
