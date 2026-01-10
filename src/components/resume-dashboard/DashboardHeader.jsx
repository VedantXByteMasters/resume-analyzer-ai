import React from "react";

export default function DashboardHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4 text-[#656d86] text-sm font-medium">
        <a className="hover:text-primary transition-colors" href="#">Home</a>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-[#121317] dark:text-gray-400">Analysis Dashboard</span>
      </div>
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div className="max-w-2xl">
          <h1 className="text-[#121317] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Resume Analysis: Senior Software Engineer</h1>
          <p className="text-[#656d86] dark:text-gray-400 text-base mt-2"></p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-[#dcdee5] dark:border-gray-700 text-[#121317] dark:text-white text-sm font-bold">
            <span className="material-symbols-outlined text-lg">download</span>
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold">
            <span className="material-symbols-outlined text-lg">share</span>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
