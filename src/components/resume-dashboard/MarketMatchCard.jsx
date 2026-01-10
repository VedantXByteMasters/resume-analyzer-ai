import React from "react";

export default function MarketMatchCard() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-[#dcdee5] dark:border-gray-700">
      <h3 className="text-[#121317] dark:text-white text-lg font-bold mb-4">Market Match</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">analytics</span>
            <span className="text-sm font-medium">Keyword Match</span>
          </div>
          <span className="text-sm font-bold">85%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">layers</span>
            <span className="text-sm font-medium">Role Relevance</span>
          </div>
          <span className="text-sm font-bold">High</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">timer</span>
            <span className="text-sm font-medium">Recruiter View Time</span>
          </div>
          <span className="text-sm font-bold">6.2s est.</span>
        </div>
      </div>
    </div>
  );
}
