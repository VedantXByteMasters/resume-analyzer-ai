import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ATSStatusPie = ({ resumeScore, atsStatus }) => {
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

    return {
      labels: ['ATS Friendly', 'Needs Improvement'],
      datasets: [
        {
          data: [atsFriendlyValue, needsImprovementValue],
          backgroundColor: ['#22c55e', '#f59e0b'],
          borderWidth: 0,
        },
      ],
    };
  }, [resumeScore, atsStatus]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false, // Hide legend as we'll show status text below
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            return `${context.label}: ${value}%`;
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const isATSFriendly = atsStatus === "ATS Friendly";

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[200px] h-[200px]">
        <Pie ref={chartRef} data={data} options={options} />
      </div>
      <p className={`mt-2 text-sm font-semibold ${
        isATSFriendly ? 'text-green-500' : 'text-amber-500'
      }`}>
        {atsStatus}
      </p>
    </div>
  );
};

export default ATSStatusPie;
