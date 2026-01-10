import React from "react";
import RoleCard from "./RoleCard";

export default function BestRolesSection({ analysis }) {
  const recommendedRoles = analysis?.recommendedRoles || [];

  // Icon mapping for different role types
  const getRoleIcon = (roleTitle) => {
    const title = roleTitle.toLowerCase();
    if (title.includes("frontend") || title.includes("ui") || title.includes("react")) return "developer_mode";
    if (title.includes("backend") || title.includes("api") || title.includes("server")) return "storage";
    if (title.includes("fullstack") || title.includes("full-stack")) return "code";
    if (title.includes("data") || title.includes("analyst") || title.includes("analytics")) return "query_stats";
    if (title.includes("devops") || title.includes("sre")) return "settings";
    if (title.includes("mobile")) return "phone_android";
    if (title.includes("qa") || title.includes("test")) return "bug_report";
    return "work";
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          🎯 Recommended Roles
          <span className="material-symbols-outlined text-primary text-xl">info</span>
        </h3>
        {recommendedRoles.length > 0 && (
          <span className="text-sm text-slate-500 dark:text-slate-400">({recommendedRoles.length} roles)</span>
        )}
      </div>

      {recommendedRoles.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <p className="text-slate-500 dark:text-slate-400">No role recommendations available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedRoles.map((role, index) => (
            <RoleCard
              key={index}
              icon={getRoleIcon(role)}
              match={`${Math.max(75, 100 - index * 5)}% Match`}
              title={role}
              description={`Based on your skills and experience, this role aligns well with your background.`}
              salary="Market Rate"
            />
          ))}
        </div>
      )}
    </section>
  );
}
