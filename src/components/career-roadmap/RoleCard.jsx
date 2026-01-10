import React from "react";

// Presentational RoleCard — kept static and presentational (no props, no logic)
export default function RoleCard({ icon, match, title, description, salary }) {
  // The caller in BestRolesSection will pass literal values inline; using props here only for readability (presentational)
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <div className="px-3 py-1 bg-success-green/10 text-success-green rounded-full text-xs font-bold">
          {match}
        </div>
      </div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">{description}</p>
      <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg. Salary</span>
        <span className="text-sm font-bold text-slate-900 dark:text-white">{salary}</span>
      </div>
    </div>
  );
}
