import React from "react";

export default function GrowthInsightCard() {
  return (
    <div className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/10">
      <div className="flex items-start gap-4">
        <span className="material-symbols-outlined text-primary">psychology</span>
        <div>
          <p className="text-sm font-bold text-primary mb-1">Growth Insight</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">Your profile shows high adaptability. Prioritizing Next.js could increase your hireability by 24% in the current market.</p>
        </div>
      </div>
    </div>
  );
}
