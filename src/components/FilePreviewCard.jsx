import React from "react";

export default function FilePreviewCard() {
  return (
    <div className="md:col-span-4 flex flex-col gap-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Processing File</h3>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-500">
            <span className="material-symbols-outlined !text-3xl">picture_as_pdf</span>
          </div>
          <div className="overflow-hidden">
            <p className="font-bold text-slate-800 dark:text-slate-200 truncate">resume_john_doe_2023.pdf</p>
            <p className="text-xs text-slate-500 font-medium">1.2 MB • PDF Document</p>
          </div>
        </div>
      </div>
    </div>
  );
}
