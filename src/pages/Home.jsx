import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UploadCard from "../components/UploadCard";

export default function Home() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state && location.state.message;

  // Clear the redirect message from history after showing once
  useEffect(() => {
    if (message) {
      // replace state to avoid showing message again on refresh
      navigate(location.pathname, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onAnalyze() {
    if (!file) return;
    // Navigate to resume-processor and pass the File object via navigation state
    navigate("/resume-processor", { state: { file } });
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#121317] dark:text-white transition-colors duration-200">
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .hero-gradient {
          background: radial-gradient(circle at top right, rgba(30, 63, 174, 0.08) 0%, transparent 40%),
                      radial-gradient(circle at bottom left, rgba(30, 63, 174, 0.05) 0%, transparent 40%);
        }
      `}</style>

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <Header />

        <main className="flex-1">
          {/* Hero & Main Upload Section */}
          <section className="hero-gradient relative py-16 lg:py-24">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-40">

              {message && (
                <div className="mb-6 rounded-md bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700">
                  {message}
                </div>
              )}

              <div className="flex flex-col items-center text-center gap-8 mb-16">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  SDG 8 Certified: Decent Work &amp; Growth
                </div>
                <h1 className="max-w-4xl text-5xl font-[900] leading-[1.1] tracking-tight md:text-6xl dark:text-white">
                  Improve Your Resume. <br />
                  <span className="text-primary">Boost Your Career.</span>
                </h1>
                <p className="max-w-2xl text-lg text-[#656d86] dark:text-white/70 leading-relaxed">
                  Get instant, AI-powered feedback to optimize your resume for ATS and land your dream job. Supporting sustainable growth and decent work for everyone.
                </p>
              </div>

              {/* Upload Card (Bento Style Focus) */}
              <div className="mx-auto max-w-4xl">
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-white/5 p-2 shadow-2xl shadow-primary/10 ring-1 ring-[#dcdee5] dark:ring-white/10">
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Upload Area (component) */}
                    <UploadCard file={file} onFileChange={setFile} />

                    {/* Action Sidebar */}
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

                        {/* Selected file info */}
                        {file ? (
                          <div className="text-sm text-[#121317] dark:text-white">
                            <div className="font-bold mb-1 truncate">{file.name}</div>
                            <div className="text-xs text-[#656d86] dark:text-white/60">{file.type === 'application/pdf' ? 'PDF' : 'DOCX'}</div>
                          </div>
                        ) : null}

                        <button
                          onClick={onAnalyze}
                          disabled={!file}
                          className="w-full rounded-lg bg-primary py-4 text-base font-black text-white shadow-xl shadow-primary/30 transition-all hover:translate-y-[-2px] hover:bg-primary/90 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Analyze My Resume
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-white dark:bg-background-dark py-24">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-40">
              <div className="mb-16">
                <h2 className="mb-4 text-4xl font-black tracking-tight">Powerful AI Insights</h2>
                <p className="max-w-xl text-lg text-[#656d86] dark:text-white/60 leading-normal">Our engine analyzes thousands of data points to ensure your profile matches industry standards.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group rounded-2xl border border-[#dcdee5] dark:border-white/10 bg-background-light dark:bg-white/5 p-8 transition-all hover:bg-white dark:hover:bg-white/10 hover:shadow-xl">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white dark:bg-white/10 text-primary shadow-sm ring-1 ring-[#dcdee5] dark:ring-white/10 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold">ATS Optimization</h3>
                  <p className="text-sm leading-relaxed text-[#656d86] dark:text-white/60">Ensure your resume passes through Applicant Tracking Systems effortlessly with proper formatting and structure.</p>
                </div>
                <div className="group rounded-2xl border border-[#dcdee5] dark:border-white/10 bg-background-light dark:bg-white/5 p-8 transition-all hover:bg-white dark:hover:bg-white/10 hover:shadow-xl">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white dark:bg-white/10 text-primary shadow-sm ring-1 ring-[#dcdee5] dark:ring-white/10 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl">target</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Keyword Matching</h3>
                  <p className="text-sm leading-relaxed text-[#656d86] dark:text-white/60">Align your skills with job descriptions using deep-learning keyword analysis to stand out to recruiters.</p>
                </div>
                <div className="group rounded-2xl border border-[#dcdee5] dark:border-white/10 bg-background-light dark:bg-white/5 p-8 transition-all hover:bg-white dark:hover:bg-white/10 hover:shadow-xl">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white dark:bg-white/10 text-primary shadow-sm ring-1 ring-[#dcdee5] dark:ring-white/10 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl">trending_up</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Skill Gaps</h3>
                  <p className="text-sm leading-relaxed text-[#656d86] dark:text-white/60">Compare your profile against industry standards to identify and bridge critical skill gaps for career growth.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline Process Section */}
          <section className="bg-background-light dark:bg-white/5 py-24">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-40">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="mb-8 text-4xl font-black tracking-tight">How it works</h2>
                  <div className="space-y-0">
                    <div className="flex items-start gap-6 pb-12 border-l-2 border-primary/20 ml-3 pl-9 relative">
                      <div className="absolute -left-[13px] top-0 h-6 w-6 rounded-full bg-primary ring-4 ring-white dark:ring-background-dark"></div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">Upload Resume</h4>
                        <p className="text-[#656d86] dark:text-white/60">Securely upload your document in PDF or DOCX format for instant processing.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 pb-12 border-l-2 border-primary/20 ml-3 pl-9 relative">
                      <div className="absolute -left-[13px] top-0 h-6 w-6 rounded-full bg-primary/40 ring-4 ring-white dark:ring-background-dark"></div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">AI Analysis</h4>
                        <p className="text-[#656d86] dark:text-white/60">Our AI identifies key strengths, experiences, and structural improvements in seconds.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 ml-3 pl-9 relative">
                      <div className="absolute -left-[13px] top-0 h-6 w-6 rounded-full bg-primary/20 ring-4 ring-white dark:ring-background-dark"></div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">Get Feedback</h4>
                        <p className="text-[#656d86] dark:text-white/60">Download your comprehensive optimization report and start applying with confidence.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20"></div>
                  <div className="relative h-96 w-full rounded-2xl bg-white dark:bg-white/5 p-4 shadow-xl ring-1 ring-[#dcdee5] dark:ring-white/10 overflow-hidden">
                    <div className="flex flex-col gap-4">
                      <div className="h-6 w-3/4 bg-primary/10 rounded animate-pulse"></div>
                      <div className="h-40 w-full bg-background-light dark:bg-white/10 rounded"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-green-500/10 rounded flex flex-col items-center justify-center border border-green-500/20">
                          <span className="text-2xl font-black text-green-600">85%</span>
                          <span className="text-[10px] font-bold uppercase text-green-700">ATS Score</span>
                        </div>
                        <div className="h-24 bg-primary/10 rounded flex flex-col items-center justify-center border border-primary/20">
                          <span className="text-2xl font-black text-primary">12+</span>
                          <span className="text-[10px] font-bold uppercase text-primary/70">Keywords</span>
                        </div>
                      </div>
                      <div className="h-10 w-full bg-primary rounded"></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-background-dark/20 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
