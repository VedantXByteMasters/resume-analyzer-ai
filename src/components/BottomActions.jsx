import React from "react";

export default function BottomActions() {
  return (
    <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-6">
        <a className="text-xs font-bold text-slate-400 hover:text-primary transition-colors" href="#">Privacy Policy</a>
        <a className="text-xs font-bold text-slate-400 hover:text-primary transition-colors" href="#">Terms of Service</a>
        <a className="text-xs font-bold text-slate-400 hover:text-primary transition-colors" href="#">Help Center</a>
      </div>
      <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
        <span className="material-symbols-outlined !text-sm">verified_user</span>
        Secure AES-256 Encryption Active
      </div>
    </footer>
  );
}
