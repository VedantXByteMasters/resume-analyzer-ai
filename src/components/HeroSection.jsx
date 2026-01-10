import React from "react";
import UploadCard from "./UploadCard";
import InstructionsSidebar from "./InstructionsSidebar";

export default function HeroSection() {
  return (
    <section className="hero-gradient relative py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-40">
        <div className="flex flex-col items-center text-center gap-8 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            SDG 8 Certified: Decent Work &amp; Growth
          </div>
          <h1 className="max-w-4xl text-5xl font-[900] leading-[1.1] tracking-tight md:text-6xl dark:text-white">
            Improve Your Resume. <br />
            <span className="text-primary">Boost Your Career.</span>
          </h1>
          <p className="max-w-2xl text-lg text-[#656d86] dark:text-white/70 leading-relaxed">
            Get instant, AI-powered feedback to optimize your resume for ATS and land your dream job. Supporting sustainable growth and decent work for everyone.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-white/5 p-2 shadow-2xl shadow-primary/10 ring-1 ring-[#dcdee5] dark:ring-white/10">
            <div className="flex flex-col md:flex-row h-full">
              <UploadCard />
              <InstructionsSidebar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
