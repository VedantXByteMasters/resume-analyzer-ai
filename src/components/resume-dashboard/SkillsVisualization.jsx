import React, { useMemo, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SkillsVisualization({ analysis }) {
  const technicalSkills = analysis?.technicalSkills || [];
  const softSkills = analysis?.softSkills || [];
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);

  // Calculate average scores for summary
  const avgTechnicalScore = useMemo(() => {
    if (technicalSkills.length === 0) return 0;
    const sum = technicalSkills.reduce((acc, skill) => acc + (skill.level || 0), 0);
    return Math.round((sum / technicalSkills.length) * 10); // Convert 1-10 to 0-100
  }, [technicalSkills]);

  const avgSoftScore = useMemo(() => {
    if (softSkills.length === 0) return 0;
    const sum = softSkills.reduce((acc, skill) => acc + (skill.level || 0), 0);
    return Math.round((sum / softSkills.length) * 10); // Convert 1-10 to 0-100
  }, [softSkills]);

  // Prepare chart data for technical skills
  const technicalChartData = useMemo(() => {
    if (technicalSkills.length === 0) {
      return {
        labels: [],
        datasets: []
      };
    }

    return {
      labels: technicalSkills.map(s => s.name || "").filter(Boolean),
      datasets: [
        {
          label: "Technical Skills",
          data: technicalSkills.map(s => (s.level || 0) * 10), // Convert 1-10 to 0-100
          backgroundColor: "#1e3fae",
          borderColor: "#1e3fae",
          borderWidth: 0,
          borderRadius: 4,
        }
      ]
    };
  }, [technicalSkills]);

  // Prepare chart data for soft skills
  const softChartData = useMemo(() => {
    if (softSkills.length === 0) {
      return {
        labels: [],
        datasets: []
      };
    }

    return {
      labels: softSkills.map(s => s.name || "").filter(Boolean),
      datasets: [
        {
          label: "Soft Skills",
          data: softSkills.map(s => (s.level || 0) * 10), // Convert 1-10 to 0-100
          backgroundColor: "rgba(30, 63, 174, 0.4)",
          borderColor: "#1e3fae",
          borderWidth: 0,
          borderRadius: 4,
        }
      ]
    };
  }, [softSkills]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.8)",
        titleColor: isDarkMode ? "#121317" : "#ffffff",
        bodyColor: isDarkMode ? "#121317" : "#ffffff",
        padding: 12,
        titleFont: {
          size: 12,
          weight: "bold"
        },
        bodyFont: {
          size: 11
        },
        callbacks: {
          label: function(context) {
            return `${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
            weight: "600"
          },
          color: isDarkMode ? "#9ca3af" : "#656d86",
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: isDarkMode ? "#374151" : "#f0f1f4",
        },
        ticks: {
          font: {
            size: 10
          },
          color: isDarkMode ? "#9ca3af" : "#656d86",
          callback: function(value) {
            return value + "%";
          }
        }
      }
    }
  }), [isDarkMode]);

  return (
    <div className="md:col-span-7 bg-white dark:bg-gray-800 p-6 rounded-xl border border-[#dcdee5] dark:border-gray-700">
      <h3 className="text-[#121317] dark:text-white text-lg font-bold mb-6">Technical vs. Soft Skills</h3>
      <div className="space-y-6">
        {/* Technical Skills Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-[#121317] dark:text-white">Technical Depth (Hard Skills)</span>
            <span className="text-sm text-primary font-bold">{avgTechnicalScore}%</span>
          </div>
          {technicalSkills.length > 0 ? (
            <>
              <div className="h-48 mb-2">
                <Bar data={technicalChartData} options={chartOptions} />
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {technicalSkills.slice(0, 5).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="h-8 bg-[#f0f1f4] dark:bg-gray-700 rounded flex items-center justify-center">
              <p className="text-xs text-[#656d86] dark:text-gray-400">No technical skills data available</p>
            </div>
          )}
        </div>

        {/* Soft Skills Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-[#121317] dark:text-white">Leadership &amp; Soft Skills</span>
            <span className="text-sm text-[#656d86] dark:text-gray-400 font-bold">{avgSoftScore}%</span>
          </div>
          {softSkills.length > 0 ? (
            <>
              <div className="h-48 mb-2">
                <Bar data={softChartData} options={chartOptions} />
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {softSkills.slice(0, 5).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="h-8 bg-[#f0f1f4] dark:bg-gray-700 rounded flex items-center justify-center">
              <p className="text-xs text-[#656d86] dark:text-gray-400">No soft skills data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
