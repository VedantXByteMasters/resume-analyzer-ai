import React from "react";

export default function WeaknessesCard({ analysis }) {
  const weaknesses = analysis?.weaknesses || [];

  return (
    <div className="md:col-span-6 bg-warning/5 dark:bg-warning/10 border border-warning/20 p-6 rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-warning">warning</span>
        <h3 className="text-warning text-lg font-bold">Priority Weaknesses</h3>
        {weaknesses.length > 0 && (
          <span className="text-xs text-warning/70 font-medium">({weaknesses.length})</span>
        )}
      </div>
      {weaknesses.length === 0 ? (
        <p className="text-sm text-[#656d86] dark:text-gray-400 italic">No weaknesses identified. Great job!</p>
      ) : (
        <div className="space-y-3">
          {weaknesses.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-amber-400 dark:border-amber-500/50 p-4 rounded-lg flex items-start gap-3 transition-all hover:shadow-md"
            >
              <span className="text-amber-500 text-lg mt-0.5">⚠</span>
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
