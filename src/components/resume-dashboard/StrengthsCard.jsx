import React from "react";

export default function StrengthsCard({ analysis }) {
  const strengths = analysis?.strengths || [];

  return (
    <div className="md:col-span-6 bg-success/5 dark:bg-success/10 border border-success/20 p-6 rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-success">check_circle</span>
        <h3 className="text-success text-lg font-bold">Key Strengths</h3>
        {strengths.length > 0 && (
          <span className="text-xs text-success/70 font-medium">({strengths.length})</span>
        )}
      </div>
      {strengths.length === 0 ? (
        <p className="text-sm text-[#656d86] dark:text-gray-400 italic">No strengths identified yet.</p>
      ) : (
        <div className="space-y-3">
          {strengths.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-green-400 dark:border-green-500/50 p-4 rounded-lg flex items-start gap-3 transition-all hover:shadow-md"
            >
              <span className="text-green-500 text-lg mt-0.5">✅</span>
              <p className="text-sm font-medium text-[#121317] dark:text-white flex-1">
                {item}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
