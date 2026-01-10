import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CareerRoadmapTimeline from './CareerRoadmapTimeline';

describe('CareerRoadmapTimeline', () => {
  it('should render all roadmap steps', () => {
    const analysis = {
      roadmap: [
        { step: "Learn TypeScript", duration: "2 weeks" },
        { step: "Build Portfolio Project", duration: "1 month" },
        { step: "Apply to Jobs", duration: "Ongoing" }
      ]
    };

    render(<CareerRoadmapTimeline analysis={analysis} />);

    expect(screen.getByText("Learn TypeScript")).toBeInTheDocument();
    expect(screen.getByText("2 weeks")).toBeInTheDocument();
    expect(screen.getByText("Build Portfolio Project")).toBeInTheDocument();
    expect(screen.getByText("1 month")).toBeInTheDocument();
    expect(screen.getByText("Apply to Jobs")).toBeInTheDocument();
  });

  it('should mark first step as completed', () => {
    const analysis = {
      roadmap: [
        { step: "Step 1", duration: "1 week" },
        { step: "Step 2", duration: "2 weeks" }
      ]
    };

    render(<CareerRoadmapTimeline analysis={analysis} />);

    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it('should mark second step as in progress', () => {
    const analysis = {
      roadmap: [
        { step: "Step 1", duration: "1 week" },
        { step: "Step 2", duration: "2 weeks" }
      ]
    };

    render(<CareerRoadmapTimeline analysis={analysis} />);

    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it('should mark subsequent steps as upcoming', () => {
    const analysis = {
      roadmap: [
        { step: "Step 1", duration: "1 week" },
        { step: "Step 2", duration: "2 weeks" },
        { step: "Step 3", duration: "3 weeks" }
      ]
    };

    render(<CareerRoadmapTimeline analysis={analysis} />);

    const upcomingTexts = screen.getAllByText("Upcoming");
    expect(upcomingTexts.length).toBeGreaterThan(0);
  });

  it('should display empty state when no roadmap', () => {
    const analysis = {
      roadmap: []
    };

    render(<CareerRoadmapTimeline analysis={analysis} />);

    expect(screen.getByText("No roadmap available yet.")).toBeInTheDocument();
  });

  it('should handle null analysis', () => {
    render(<CareerRoadmapTimeline analysis={null} />);

    expect(screen.getByText("No roadmap available yet.")).toBeInTheDocument();
  });

  it('should render roadmap items with correct structure', () => {
    const analysis = {
      roadmap: [
        { step: "Learn React", duration: "3 weeks" }
      ]
    };

    render(<CareerRoadmapTimeline analysis={analysis} />);

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("3 weeks")).toBeInTheDocument();
  });
});
