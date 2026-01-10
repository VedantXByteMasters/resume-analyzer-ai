import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Custom plugin for center text
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart) => {
    const { ctx, chartArea: { left, right, top, bottom } } = chart;
    ctx.save();

    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;

    // Get the data from the chart
    const data = chart.data.datasets[0].data;
    const score = data[0]; // ATS Friendly percentage

    // Main percentage text
    ctx.font = 'bold 24px Inter, system-ui, sans-serif';
    ctx.fillStyle = chart.options.plugins.centerText.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${score}%`, centerX, centerY - 8);

    // Subtitle text
    ctx.font = '14px Inter, system-ui, sans-serif';
    ctx.fillStyle = chart.options.plugins.centerText.subTextColor;
    ctx.fillText('ATS Compatibility', centerX, centerY + 12);

    ctx.restore();
  }
};

const ATSCompatibilityChart = ({ resumeScore, atsStatus }) => {
  const chartRef = useRef(null);

  // Calculate data based on atsStatus
  const data = React.useMemo(() => {
    const score = Math.max(0, Math.min(100, resumeScore || 0));
    let atsFriendlyValue, needsImprovementValue;

    if (atsStatus === "ATS Friendly") {
      atsFriendlyValue = score;
      needsImprovementValue = 100 - score;
    } else {
      needsImprovementValue = 100 - score;
      atsFriendlyValue = score;
    }

    const isATSFriendly = atsStatus === "ATS Friendly";

    return {
      datasets: [
        {
          data: [atsFriendlyValue, needsImprovementValue],
          backgroundColor: [
            isATSFriendly ? '#22c55e' : '#f59e0b',
            isATSFriendly ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)'
          ],
          borderWidth: 0,
          borderRadius: 4,
          spacing: 4,
          hoverBorderWidth: 2,
          hoverBorderColor: isATSFriendly ? '#22c55e' : '#f59e0b',
          hoverBackgroundColor: [
            isATSFriendly ? '#16a34a' : '#d97706',
            isATSFriendly ? 'rgba(34, 197, 94, 0.25)' : 'rgba(245, 158, 11, 0.25)'
          ],
        },
      ],
    };
  }, [resumeScore, atsStatus]);

  const isATSFriendly = atsStatus === "ATS Friendly";
  const isDarkMode = document.documentElement.classList.contains('dark');

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
        titleColor: isDarkMode ? '#f9fafb' : '#111827',
        bodyColor: isDarkMode ? '#f9fafb' : '#111827',
        borderColor: isDarkMode ? '#4b5563' : '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => {
            return `${context.parsed}%`;
          },
        },
      },
      centerText: {
        status: atsStatus,
        textColor: isDarkMode ? '#f9fafb' : '#111827',
        subTextColor: isDarkMode ? '#9ca3af' : '#6b7280',
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      easing: 'easeOutQuart',
      duration: 1000,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[220px] h-[220px] relative">
        <Doughnut
          ref={chartRef}
          data={data}
          options={options}
          plugins={[centerTextPlugin]}
        />
      </div>
      <div className={`mt-4 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
        isATSFriendly
          ? 'bg-green-500 text-white'
          : 'bg-amber-500 text-white'
      }`}>
        {atsStatus}
      </div>
    </div>
  );
};

export default ATSCompatibilityChart;
