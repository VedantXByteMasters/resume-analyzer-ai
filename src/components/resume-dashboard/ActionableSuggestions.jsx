import React from "react";

export default function ActionableSuggestions() {
  return (
    <div className="md:col-span-5 bg-white dark:bg-gray-800 p-6 rounded-xl border border-[#dcdee5] dark:border-gray-700">
      <h3 className="text-[#121317] dark:text-white text-lg font-bold mb-6">Actionable Suggestions</h3>
      <div className="space-y-4">
        <label className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
          <input className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" type="checkbox" />
          <span className="text-sm text-[#121317] dark:text-gray-300">Move contact details to the top header section.</span>
        </label>
        <label className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
          <input className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" type="checkbox" />
          <span className="text-sm text-[#121317] dark:text-gray-300">Add 3 more keywords related to "System Design".</span>
        </label>
        <label className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
          <input className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" type="checkbox" />
          <span className="text-sm text-[#121317] dark:text-gray-300">Standardize date formats to MM/YYYY.</span>
        </label>
        <label className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
          <input className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" type="checkbox" />
          <span className="text-sm text-[#121317] dark:text-gray-300">Include a link to your GitHub or Portfolio.</span>
        </label>
      </div>
      <button className="w-full mt-6 py-3 bg-primary/10 text-primary font-bold rounded-lg text-sm hover:bg-primary/20 transition-colors">
        Mark All as Completed
      </button>
    </div>
  );
}
