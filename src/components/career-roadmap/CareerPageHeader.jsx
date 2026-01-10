import React from "react";

export default function CareerPageHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success-green/10 text-success-green text-xs font-bold uppercase tracking-wider mb-4">
          <span className="material-symbols-outlined text-sm">auto_awesome</span> AI Analysis Complete
        </div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight mb-3">Your Career Path to Growth</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">We've analyzed your background against 5,000+ job market trends. Here is your personalized roadmap to decent work and economic success.</p>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all">
          <span className="material-symbols-outlined text-lg">refresh</span>
          <span>Re-analyze Resume</span>
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
          <span className="material-symbols-outlined text-lg">share</span>
          <span>Export Plan</span>
        </button>
      </div>
    </div>
  );
}
