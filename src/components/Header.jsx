import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-solid border-[#dcdee5] dark:border-white/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-40 py-4">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-2xl">description</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">AI Resume <span className="text-primary">Analyzer</span></h2>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          <Link className="text-sm font-semibold hover:text-primary transition-colors" to="/home">Home</Link>
          <Link className="text-sm font-semibold hover:text-primary transition-colors" to="/features">Features</Link>
          <Link className="text-sm font-semibold hover:text-primary transition-colors" to="/about">About</Link>
          <button className="flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}
