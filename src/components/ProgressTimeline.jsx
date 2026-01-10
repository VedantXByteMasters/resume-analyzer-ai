import React from "react";

export default function ProgressTimeline({ status } = {}) {
  // status: { uploaded, extracting, analyzing, generating, completed, error }
  const s = status || {
    uploaded: false,
    extracting: 'idle',
    analyzing: 'idle',
    generating: 'idle',
    completed: false,
    error: null
  };

  const statusClass = (stage) => {
    if (s.error) return 'text-red-500';
    if (stage === 'uploaded') return s.uploaded ? 'text-emerald-600' : 'text-slate-400';
    const val = s[stage];
    if (val === 'active') return 'text-primary';
    if (val === 'done') return 'text-emerald-600';
    return 'text-slate-400';
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-2xl mx-auto relative px-4">
        {/* Line background */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0"></div>
        <div className="absolute top-1/2 left-0 w-1/2 h-[2px] bg-primary -translate-y-1/2 z-0"></div>

        {/* Step 1 */}
        <div className="relative z-10 flex flex-col items-center gap-3" data-testid="timeline-uploaded" data-status={s.uploaded ? 'done' : 'idle'}>
          <div className={`size-10 rounded-full ${s.uploaded ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white text-slate-400 border-2 border-slate-200 dark:border-slate-700'}`}>
            <span className="material-symbols-outlined">{s.uploaded ? 'check' : 'description'}</span>
          </div>
          <span className={`text-xs font-bold uppercase tracking-wider ${statusClass('uploaded')}`}>Upload</span>
        </div>

        {/* Step 2 */}
        <div className="relative z-10 flex flex-col items-center gap-3" data-testid="timeline-extracting" data-status={s.extracting}>
          <div className={`size-12 rounded-full ${s.extracting === 'active' ? 'bg-primary text-white shadow-xl shadow-primary/30 ring-4 ring-white' : s.extracting === 'done' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
            <span className="material-symbols-outlined !text-3xl">{s.extracting === 'active' ? 'psychology' : s.extracting === 'done' ? 'check' : 'article'}</span>
          </div>
          <span className={`text-xs font-black uppercase tracking-wider ${statusClass('extracting')}`}>Extracting</span>
        </div>

        {/* Step 3 */}
        <div className="relative z-10 flex flex-col items-center gap-3" data-testid="timeline-analyzing" data-status={s.analyzing}>
          <div className={`size-10 rounded-full ${s.analyzing === 'active' ? 'bg-primary text-white' : s.analyzing === 'done' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 border-2 border-slate-200 dark:border-slate-700'}`}>
            <span className="material-symbols-outlined">{s.analyzing === 'active' ? 'psychology' : s.analyzing === 'done' ? 'check' : 'insights'}</span>
          </div>
          <span className={`text-xs font-bold uppercase tracking-wider ${statusClass('analyzing')}`}>Analyzing</span>
        </div>

        {/* Step 4 */}
        <div className="relative z-10 flex flex-col items-center gap-3" data-testid="timeline-generating" data-status={s.generating}>
          <div className={`size-10 rounded-full ${s.generating === 'active' ? 'bg-primary text-white' : s.generating === 'done' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 border-2 border-slate-200 dark:border-slate-700'}`}>
            <span className="material-symbols-outlined">{s.generating === 'active' ? 'auto_fix_high' : s.generating === 'done' ? 'check' : 'lightbulb'}</span>
          </div>
          <span className={`text-xs font-bold uppercase tracking-wider ${statusClass('generating')}`}>Generating</span>
        </div>

        {/* Step 5 */}
        <div className="relative z-10 flex flex-col items-center gap-3" data-testid="timeline-completed" data-status={s.completed ? 'done' : 'idle'}>
          <div className={`size-10 rounded-full ${s.completed ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 border-2 border-slate-200 dark:border-slate-700'}`}>
            <span className="material-symbols-outlined">{s.completed ? 'check' : 'done'}</span>
          </div>
          <span className={`text-xs font-bold uppercase tracking-wider ${s.completed ? 'text-emerald-600' : 'text-slate-400'}`}>Completed</span>
        </div>
      </div>
      {s.error ? <div className="text-red-500 text-sm mt-2 text-center" data-testid="timeline-error">{s.error}</div> : null}
    </div>
  );
}
