import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-[#dcdee5] dark:border-white/10 py-12 px-6 lg:px-40 bg-white dark:bg-background-dark">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="material-symbols-outlined text-primary font-bold">description</span>
              <span className="text-lg font-black">AI Resume Analyzer</span>
            </div>
            <p className="text-sm text-[#656d86] dark:text-white/60 max-w-sm">
              Empowering job seekers with AI technology to foster decent work and economic growth (SDG 8) globally.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Product</span>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Analyzer</a>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Pricing</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Company</span>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Privacy</a>
              <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Terms</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#dcdee5] dark:border-white/10 text-center">
          <p className="text-xs text-[#a3aabf]">© 2026 AI Resume Analyzer. Built for a better workforce.</p>
        </div>
      </div>
    </footer>
  );
}

