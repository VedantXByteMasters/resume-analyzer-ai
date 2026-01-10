import React from "react";

export default function TimelineProcessSection() {
  return (
    <section className="bg-background-light dark:bg-white/5 py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="mb-8 text-4xl font-black tracking-tight">How it works</h2>
            <div className="space-y-0">
              <div className="flex items-start gap-6 pb-12 border-l-2 border-primary/20 ml-3 pl-9 relative">
                <div className="absolute -left-[13px] top-0 h-6 w-6 rounded-full bg-primary ring-4 ring-white dark:ring-background-dark"></div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Upload Resume</h4>
                  <p className="text-[#656d86] dark:text-white/60">Securely upload your document in PDF or DOCX format for instant processing.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 pb-12 border-l-2 border-primary/20 ml-3 pl-9 relative">
                <div className="absolute -left-[13px] top-0 h-6 w-6 rounded-full bg-primary/40 ring-4 ring-white dark:ring-background-dark"></div>
                <div>
                  <h4 className="text-lg font-bold mb-1">AI Analysis</h4>
                  <p className="text-[#656d86] dark:text-white/60">Our AI identifies key strengths, experiences, and structural improvements in seconds.</p>
                </div>
              </div>
              <div className="flex items-start gap-6 ml-3 pl-9 relative">
                <div className="absolute -left-[13px] top-0 h-6 w-6 rounded-full bg-primary/20 ring-4 ring-white dark:ring-background-dark"></div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Get Feedback</h4>
                  <p className="text-[#656d86] dark:text-white/60">Download your comprehensive optimization report and start applying with confidence.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden">
            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20"></div>
            <div className="relative h-96 w-full rounded-2xl bg-white dark:bg-white/5 p-4 shadow-xl ring-1 ring-[#dcdee5] dark:ring-white/10 overflow-hidden">
              <div className="flex flex-col gap-4">
                <div className="h-6 w-3/4 bg-primary/10 rounded animate-pulse"></div>
                <div className="h-40 w-full bg-background-light dark:bg-white/10 rounded"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-green-500/10 rounded flex flex-col items-center justify-center border border-green-500/20">
                    <span className="text-2xl font-black text-green-600">85%</span>
                    <span className="text-[10px] font-bold uppercase text-green-700">ATS Score</span>
                  </div>
                  <div className="h-24 bg-primary/10 rounded flex flex-col items-center justify-center border border-primary/20">
                    <span className="text-2xl font-black text-primary">12+</span>
                    <span className="text-[10px] font-bold uppercase text-primary/70">Keywords</span>
                  </div>
                </div>
                <div className="h-10 w-full bg-primary rounded"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-background-dark/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
