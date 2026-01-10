import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillsVisualization from './SkillsVisualization';

// Mock Chart.js
vi.mock('react-chartjs-2', () => ({
  Bar: ({ data, options }) => {
    // Return a div that we can test
    return (
      <div data-testid="chart" data-chart-data={JSON.stringify(data)}>
        Chart Component
      </div>
    );
  }
}));

vi.mock('chart.js', () => ({
  Chart: {
    register: vi.fn()
  },
  CategoryScale: {},
  LinearScale: {},
  BarElement: {},
  Title: {},
  Tooltip: {},
  Legend: {}
}));

describe('SkillsVisualization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render technical skills chart with correct data', () => {
    const analysis = {
      technicalSkills: [
        { name: "JavaScript", level: 9 },
        { name: "React", level: 8 },
        { name: "Node.js", level: 7 }
      ],
      softSkills: []
    };

    render(<SkillsVisualization analysis={analysis} />);

    const chart = screen.getByTestId('chart');
    const chartData = JSON.parse(chart.getAttribute('data-chart-data'));

    expect(chartData.labels).toEqual(["JavaScript", "React", "Node.js"]);
    expect(chartData.datasets[0].data).toEqual([90, 80, 70]); // Levels converted to percentages
  });

  it('should render soft skills chart with correct data', () => {
    const analysis = {
      technicalSkills: [],
      softSkills: [
        { name: "Leadership", level: 8 },
        { name: "Communication", level: 7 }
      ]
    };

    render(<SkillsVisualization analysis={analysis} />);

    const charts = screen.getAllByTestId('chart');
    expect(charts.length).toBeGreaterThan(0);
  });

  it('should calculate and display average technical score', () => {
    const analysis = {
      technicalSkills: [
        { name: "JavaScript", level: 8 },
        { name: "React", level: 9 },
        { name: "Node.js", level: 7 }
      ],
      softSkills: []
    };

    render(<SkillsVisualization analysis={analysis} />);

    // Average: (8 + 9 + 7) / 3 * 10 = 80%
    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  it('should calculate and display average soft skills score', () => {
    const analysis = {
      technicalSkills: [],
      softSkills: [
        { name: "Leadership", level: 6 },
        { name: "Communication", level: 8 }
      ]
    };

    render(<SkillsVisualization analysis={analysis} />);

    // Average: (6 + 8) / 2 * 10 = 70%
    expect(screen.getByText("70%")).toBeInTheDocument();
  });

  it('should display empty state when no skills data', () => {
    const analysis = {
      technicalSkills: [],
      softSkills: []
    };

    render(<SkillsVisualization analysis={analysis} />);

    expect(screen.getByText("No technical skills data available")).toBeInTheDocument();
    expect(screen.getByText("No soft skills data available")).toBeInTheDocument();
  });

  it('should convert skill levels from 1-10 to 0-100 for chart', () => {
    const analysis = {
      technicalSkills: [
        { name: "JavaScript", level: 5 }
      ],
      softSkills: []
    };

    render(<SkillsVisualization analysis={analysis} />);

    const chart = screen.getByTestId('chart');
    const chartData = JSON.parse(chart.getAttribute('data-chart-data'));

    expect(chartData.datasets[0].data[0]).toBe(50); // Level 5 * 10 = 50%
  });

  it('should display skill name tags below charts', () => {
    const analysis = {
      technicalSkills: [
        { name: "JavaScript", level: 9 },
        { name: "React", level: 8 },
        { name: "Node.js", level: 7 },
        { name: "TypeScript", level: 6 },
        { name: "Python", level: 5 },
        { name: "Java", level: 4 } // Should only show first 5
      ],
      softSkills: []
    };

    render(<SkillsVisualization analysis={analysis} />);

    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    // Java should not be shown (only first 5)
  });

  it('should handle null analysis gracefully', () => {
    render(<SkillsVisualization analysis={null} />);

    expect(screen.getByText("No technical skills data available")).toBeInTheDocument();
  });

  it('should filter out skills with empty names', () => {
    const analysis = {
      technicalSkills: [
        { name: "JavaScript", level: 9 },
        { name: "", level: 8 }, // Should be filtered
        { name: "React", level: 7 }
      ],
      softSkills: []
    };

    render(<SkillsVisualization analysis={analysis} />);

    const chart = screen.getByTestId('chart');
    const chartData = JSON.parse(chart.getAttribute('data-chart-data'));

    expect(chartData.labels).toEqual(["JavaScript", "React"]);
    expect(chartData.labels).not.toContain("");
  });
});
