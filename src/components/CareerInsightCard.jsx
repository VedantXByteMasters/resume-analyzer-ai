import React from "react";

export default function CareerInsightCard() {
  return (
    <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-xl border border-primary/10 dark:border-primary/20">
      <div className="flex items-start gap-3 text-primary">
        <span className="material-symbols-outlined !text-xl mt-1">lightbulb</span>
        <div>
          <p className="text-sm font-bold mb-1">Career Insight</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Optimizing for ATS compatibility increases your visibility to recruiters by up to 40% in competitive markets.
          </p>
        </div>
      </div>
    </div>
  );
}
