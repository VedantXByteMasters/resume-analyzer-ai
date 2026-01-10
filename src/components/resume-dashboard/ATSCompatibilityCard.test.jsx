import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ATSCompatibilityCard from './ATSCompatibilityCard';

describe('ATSCompatibilityCard', () => {
  it('should display green badge for "ATS Friendly" status', () => {
    const analysis = {
      atsStatus: "ATS Friendly",
      resumeScore: 85
    };

    render(<ATSCompatibilityCard analysis={analysis} />);

    const badge = screen.getByText("ATS Friendly", { selector: 'span' });
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-green-500");
  });

  it('should display amber badge for "Needs Improvement" status', () => {
    const analysis = {
      atsStatus: "Needs Improvement",
      resumeScore: 50
    };

    render(<ATSCompatibilityCard analysis={analysis} />);

    const badge = screen.getByText("Needs Improvement", { selector: 'span' });
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-amber-500");
  });

  it('should display correct description text based on status', () => {
    const { rerender } = render(
      <ATSCompatibilityCard analysis={{ atsStatus: "ATS Friendly", resumeScore: 85 }} />
    );
    expect(screen.getByText("Optimized for applicant tracking systems")).toBeInTheDocument();

    rerender(
      <ATSCompatibilityCard analysis={{ atsStatus: "Needs Improvement", resumeScore: 50 }} />
    );
    expect(screen.getByText("Improve keywords and formatting")).toBeInTheDocument();
  });

  it('should default to "Needs Improvement" when atsStatus is missing', () => {
    render(<ATSCompatibilityCard analysis={{ resumeScore: 50 }} />);

    const badge = screen.getByText("Needs Improvement", { selector: 'span' });
    expect(badge).toHaveClass("bg-amber-500");
  });

  it('should render doughnut chart with correct data', () => {
    const analysis = {
      atsStatus: "ATS Friendly",
      resumeScore: 85
    };

    render(<ATSCompatibilityCard analysis={analysis} />);

    const doughnutChart = screen.getByTestId('doughnut-chart');
    expect(doughnutChart).toBeInTheDocument();

    // Check that the chart data contains the expected values
    const chartData = JSON.parse(doughnutChart.getAttribute('data-chart-data'));
    expect(chartData.datasets[0].data).toEqual([85, 15]);
  });

  it('should handle null analysis gracefully', () => {
    render(<ATSCompatibilityCard analysis={null} />);
    expect(screen.getByText("Needs Improvement", { selector: 'span' })).toBeInTheDocument();
  });
});
