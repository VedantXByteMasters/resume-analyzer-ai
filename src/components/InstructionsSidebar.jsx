import React from "react";
import { useNavigate } from "react-router-dom";

export default function InstructionsSidebar() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8fafc] dark:bg-white/5 p-8 md:w-80 border-t md:border-t-0 md:border-l border-[#dcdee5] dark:border-white/10">
      <div className="flex h-full flex-col justify-between gap-8">
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#656d86] dark:text-white/40">Instructions</h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[12px] font-bold text-primary">1</span>
              <p className="text-sm leading-tight text-[#656d86] dark:text-white/70">Ensure file is under 5MB</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[12px] font-bold text-primary">2</span>
              <p className="text-sm leading-tight text-[#656d86] dark:text-white/70">Remove sensitive personal info</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[12px] font-bold text-primary">3</span>
              <p className="text-sm leading-tight text-[#656d86] dark:text-white/70">Wait for AI processing (5-10s)</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/resume-processor")}
          className="w-full rounded-lg bg-primary py-4 text-base font-black text-white shadow-xl shadow-primary/30 transition-all hover:translate-y-[-2px] hover:bg-primary/90 active:translate-y-0"
        >
          Analyze My Resume
        </button>
      </div>
    </div>
  );
}
