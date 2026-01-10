import React from "react";

export default function SkillsToLearnSection({ analysis }) {
  const skillsToLearn = analysis?.skillsToLearn || [];
  const certifications = analysis?.certifications || [];

  return (
    <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold mb-1">🧠 Skills to Learn</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Bridging the gap to your target roles</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-warning-amber">
          <span className="material-symbols-outlined">lightbulb</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Skills to Learn */}
        {skillsToLearn.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm italic">No skills recommendations available yet.</p>
        ) : (
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Recommended Skills</p>
            <div className="flex flex-wrap gap-2">
              {skillsToLearn.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium hover:bg-primary hover:text-white cursor-pointer transition-all border border-slate-200 dark:border-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">🧾 Certifications</p>
            <ul className="space-y-2">
              {certifications.map((cert, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="text-primary mt-0.5">✓</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
