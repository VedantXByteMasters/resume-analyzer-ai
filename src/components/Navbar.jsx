export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#dcdee5] dark:border-white/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-40 py-4">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-2xl">description</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">
            AI Resume <span className="text-primary">Analyzer</span>
          </h2>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Home</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Features</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">About</a>
          <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95">
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}
