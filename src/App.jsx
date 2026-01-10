import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ResumeProcessor from "./pages/ResumeProcessor";
import ResumeDashboard from "./components/resume-dashboard/ResumeDashboard";
import CareerRoadmapPage from "./components/career-roadmap/CareerRoadmapPage";

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/features" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/resume-processor" element={<ResumeProcessor />} />
        <Route path="/resume-analysis" element={<ResumeDashboard />} />
        <Route path="/resume-dashboard" element={<ResumeDashboard />} />
        <Route path="/career-roadmap" element={<CareerRoadmapPage />} />
      </Routes>
    </BrowserRouter>
  );
}
