import React from "react";

export default function AnalysisHub() {
  return (
    <div className="md:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col">
      <div className="p-8 md:p-12 flex-grow flex flex-col items-center justify-center text-center">
        {/* Loading Visualization */}
        <div className="relative size-32 mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-primary/10 border-t-primary animate-[spin_2s_linear_infinite]"></div>
          <div className="absolute inset-4 rounded-full border-4 border-slate-200 dark:border-slate-800 border-b-slate-400 animate-[spin_3s_linear_infinite_reverse]"></div>
          <div className="absolute inset-0 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined !text-4xl">neurology</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Step 2: AI Deep Scan</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">Our neural networks are extracting skills, quantifying experience, and validating against global labor standards.</p>

        {/* Progress Bar Container */}
        <div className="w-full max-w-md space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-xs font-black text-primary uppercase tracking-tighter">Analysis Progress</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">65%</span>
          </div>
          <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1">
            <div className="h-full bg-primary rounded-full relative" style={{ width: '65%' }}>
              <div className="absolute top-0 right-0 h-full w-8 bg-white/20 blur-md"></div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="size-1.5 bg-primary rounded-full animate-pulse"></span>
            <p className="text-xs font-medium text-slate-400">Analyzing skills, experience, and ATS compatibility...</p>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 px-8 py-4 flex flex-wrap gap-6 justify-center text-[11px] font-bold uppercase tracking-widest text-slate-400">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined !text-sm text-emerald-500">check_circle</span>
          Skills Extraction
        </div>
        <div className="flex items-center gap-2 text-primary">
          <span className="size-2 bg-primary rounded-full animate-pulse"></span>
          Industry Mapping
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 border border-slate-300 rounded-full"></span>
          ATS Scoring
        </div>
      </div>
    </div>
  );
}
