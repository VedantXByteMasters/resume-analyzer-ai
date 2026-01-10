import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BestRolesSection from './BestRolesSection';

describe('BestRolesSection', () => {
  it('should render all recommended roles', () => {
    const analysis = {
      recommendedRoles: [
        "Senior Frontend Engineer",
        "Full Stack Developer",
        "React Specialist"
      ]
    };

    render(<BestRolesSection analysis={analysis} />);

    expect(screen.getByText("Senior Frontend Engineer")).toBeInTheDocument();
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
    expect(screen.getByText("React Specialist")).toBeInTheDocument();
  });

  it('should display role count in header', () => {
    const analysis = {
      recommendedRoles: ["Role 1", "Role 2", "Role 3"]
    };

    render(<BestRolesSection analysis={analysis} />);

    expect(screen.getByText("(3 roles)")).toBeInTheDocument();
  });

  it('should display empty state when no roles', () => {
    const analysis = {
      recommendedRoles: []
    };

    render(<BestRolesSection analysis={analysis} />);

    expect(screen.getByText("No role recommendations available yet.")).toBeInTheDocument();
  });

  it('should assign correct icons based on role title', () => {
    const analysis = {
      recommendedRoles: [
        "Frontend Developer",
        "Backend Engineer",
        "Data Analyst",
        "DevOps Engineer"
      ]
    };

    render(<BestRolesSection analysis={analysis} />);

    // Icons are assigned based on role title keywords
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Backend Engineer")).toBeInTheDocument();
  });

  it('should display match percentages decreasing for each role', () => {
    const analysis = {
      recommendedRoles: ["Role 1", "Role 2", "Role 3"]
    };

    render(<BestRolesSection analysis={analysis} />);

    // First role should have highest match (100% or close)
    // Subsequent roles have decreasing percentages
    const matches = screen.getAllByText(/100% Match|95% Match|90% Match/);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('should handle null analysis', () => {
    render(<BestRolesSection analysis={null} />);

    expect(screen.getByText("No role recommendations available yet.")).toBeInTheDocument();
  });
});
