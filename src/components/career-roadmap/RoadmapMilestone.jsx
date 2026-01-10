import React from "react";

// Providing multiple presentational exports to avoid props/logic while keeping reuse
export function CompletedMilestone() {
  return (
    <div className="relative z-10 flex gap-4">
      <div className="mt-1 size-10 rounded-full bg-success-green flex items-center justify-center text-white ring-8 ring-success-green/10">
        <span className="material-symbols-outlined text-xl">check</span>
      </div>
      <div>
        <h5 className="font-bold text-slate-900 dark:text-white">Resume Optimization</h5>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Completed AI scan &amp; tailoring.</p>
        <span className="text-[10px] font-black text-success-green uppercase tracking-tighter mt-1 block">Completed</span>
      </div>
    </div>
  );
}

export function InProgressMilestone() {
  return (
    <div className="relative z-10 flex gap-4">
      <div className="mt-1 size-10 rounded-full bg-primary flex items-center justify-center text-white ring-8 ring-primary/10">
        <span className="material-symbols-outlined text-xl">school</span>
      </div>
      <div>
        <h5 className="font-bold text-slate-900 dark:text-white">React Certification</h5>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Advanced patterns and state management.</p>
        <span className="text-[10px] font-black text-primary uppercase tracking-tighter mt-1 block">In Progress • 40%</span>
        <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2">
          <div className="h-full bg-primary rounded-full w-2/5"></div>
        </div>
      </div>
    </div>
  );
}

export function UpcomingMilestone() {
  return (
    <div className="relative z-10 flex gap-4 opacity-60">
      <div className="mt-1 size-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500">
        <span className="material-symbols-outlined text-xl">work</span>
      </div>
      <div>
        <h5 className="font-bold text-slate-900 dark:text-white">Portfolio Projects</h5>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Build 2 real-world applications for your GitHub.</p>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1 block">Upcoming • Est. 3 weeks</span>
      </div>
    </div>
  );
}

export function TargetMilestone() {
  return (
    <div className="relative z-10 flex gap-4 opacity-60">
      <div className="mt-1 size-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500">
        <span className="material-symbols-outlined text-xl">verified</span>
      </div>
      <div>
        <h5 className="font-bold text-slate-900 dark:text-white">Job Placement</h5>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Applying to curated role recommendations.</p>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1 block">Target • 2 Months</span>
      </div>
    </div>
  );
}
