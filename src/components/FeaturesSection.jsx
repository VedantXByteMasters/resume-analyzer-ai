import React from "react";

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white dark:bg-background-dark py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-40">
        <div className="mb-16">
          <h2 className="mb-4 text-4xl font-black tracking-tight">Powerful AI Insights</h2>
          <p className="max-w-xl text-lg text-[#656d86] dark:text-white/60 leading-normal">Our engine analyzes thousands of data points to ensure your profile matches industry standards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group rounded-2xl border border-[#dcdee5] dark:border-white/10 bg-background-light dark:bg-white/5 p-8 transition-all hover:bg-white dark:hover:bg-white/10 hover:shadow-xl">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white dark:bg-white/10 text-primary shadow-sm ring-1 ring-[#dcdee5] dark:ring-white/10 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h3 className="mb-3 text-xl font-bold">ATS Optimization</h3>
            <p className="text-sm leading-relaxed text-[#656d86] dark:text-white/60">Ensure your resume passes through Applicant Tracking Systems effortlessly with proper formatting and structure.</p>
          </div>

          <div className="group rounded-2xl border border-[#dcdee5] dark:border-white/10 bg-background-light dark:bg-white/5 p-8 transition-all hover:bg-white dark:hover:bg-white/10 hover:shadow-xl">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white dark:bg-white/10 text-primary shadow-sm ring-1 ring-[#dcdee5] dark:ring-white/10 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">target</span>
            </div>
            <h3 className="mb-3 text-xl font-bold">Keyword Matching</h3>
            <p className="text-sm leading-relaxed text-[#656d86] dark:text-white/60">Align your skills with job descriptions using deep-learning keyword analysis to stand out to recruiters.</p>
          </div>

          <div className="group rounded-2xl border border-[#dcdee5] dark:border-white/10 bg-background-light dark:bg-white/5 p-8 transition-all hover:bg-white dark:hover:bg-white/10 hover:shadow-xl">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white dark:bg-white/10 text-primary shadow-sm ring-1 ring-[#dcdee5] dark:ring-white/10 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">trending_up</span>
            </div>
            <h3 className="mb-3 text-xl font-bold">Skill Gaps</h3>
            <p className="text-sm leading-relaxed text-[#656d86] dark:text-white/60">Compare your profile against industry standards to identify and bridge critical skill gaps for career growth.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
