import React from "react";
import ATSCompatibilityChart from "./ATSCompatibilityChart";

export default function ATSCompatibilityCard({ analysis }) {
  const atsStatus = analysis?.atsStatus || "Needs Improvement";
  const resumeScore = analysis?.resumeScore || 0;
  const isATSFriendly = atsStatus === "ATS Friendly";

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-[#dcdee5] dark:border-gray-700 flex flex-col justify-between">
      <div>
        <h3 className="text-[#121317] dark:text-white text-lg font-bold mb-4">ATS Compatibility</h3>
        <p className="text-[#656d86] dark:text-gray-400 text-sm leading-relaxed mb-4">
          {isATSFriendly
            ? "Optimized for applicant tracking systems"
            : "Improve keywords and formatting"}
        </p>
      </div>
      <ATSCompatibilityChart resumeScore={resumeScore} atsStatus={atsStatus} />
    </div>
  );
}
