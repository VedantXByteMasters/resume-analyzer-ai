import React from "react";
import GrowthInsightCard from "./GrowthInsightCard";

// Timeline Item Component
function TimelineItem({ step, duration, index, total }) {
  const isCompleted = index === 0;
  const isInProgress = index === 1;
  const isUpcoming = index > 1;

  return (
    <div className={`relative z-10 flex gap-4 ${isUpcoming ? "opacity-60" : ""}`}>
      <div className={`mt-1 size-10 rounded-full flex items-center justify-center ${
        isCompleted 
          ? "bg-success-green text-white ring-8 ring-success-green/10" 
          : isInProgress
          ? "bg-primary text-white ring-8 ring-primary/10"
          : "bg-slate-200 dark:bg-slate-800 text-slate-500"
      }`}>
        <span className="material-symbols-outlined text-xl">
          {isCompleted ? "check" : isInProgress ? "school" : "work"}
        </span>
      </div>
      <div>
        <h5 className="font-bold text-slate-900 dark:text-white">{step}</h5>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{duration}</p>
        {isCompleted && (
          <span className="text-[10px] font-black text-success-green uppercase tracking-tighter mt-1 block">Completed</span>
        )}
        {isInProgress && (
          <>
            <span className="text-[10px] font-black text-primary uppercase tracking-tighter mt-1 block">In Progress</span>
            <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2">
              <div className="h-full bg-primary rounded-full w-2/5"></div>
            </div>
          </>
        )}
        {isUpcoming && (
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1 block">Upcoming</span>
        )}
      </div>
    </div>
  );
}

export default function CareerRoadmapTimeline({ analysis }) {
  const roadmap = analysis?.roadmap || [];

  return (
    <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 h-full sticky top-24">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🗺 Roadmap Timeline
        <span className="material-symbols-outlined text-slate-400">timeline</span>
      </h3>

      {roadmap.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400 text-sm">No roadmap available yet.</p>
        </div>
      ) : (
        <div className="relative roadmap-line space-y-10 pl-2">
          {roadmap.map((item, index) => (
            <TimelineItem
              key={index}
              step={item.step}
              duration={item.duration}
              index={index}
              total={roadmap.length}
            />
          ))}
        </div>
      )}

      <GrowthInsightCard />
    </section>
  );
}
