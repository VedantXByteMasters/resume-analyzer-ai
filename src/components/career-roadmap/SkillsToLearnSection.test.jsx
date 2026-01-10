import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillsToLearnSection from './SkillsToLearnSection';

describe('SkillsToLearnSection', () => {
  it('should render all skills to learn as tags', () => {
    const analysis = {
      skillsToLearn: [
        "TypeScript",
        "Next.js",
        "System Design",
        "PostgreSQL"
      ],
      certifications: []
    };

    render(<SkillsToLearnSection analysis={analysis} />);

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("System Design")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
  });

  it('should render all certifications as list items', () => {
    const analysis = {
      skillsToLearn: [],
      certifications: [
        "AWS Certified Solutions Architect",
        "React Advanced Patterns",
        "Kubernetes Administrator"
      ]
    };

    render(<SkillsToLearnSection analysis={analysis} />);

    expect(screen.getByText("AWS Certified Solutions Architect")).toBeInTheDocument();
    expect(screen.getByText("React Advanced Patterns")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes Administrator")).toBeInTheDocument();
  });

  it('should display empty state when no skills', () => {
    const analysis = {
      skillsToLearn: [],
      certifications: []
    };

    render(<SkillsToLearnSection analysis={analysis} />);

    expect(screen.getByText("No skills recommendations available yet.")).toBeInTheDocument();
  });

  it('should not show certifications section when empty', () => {
    const analysis = {
      skillsToLearn: ["TypeScript"],
      certifications: []
    };

    render(<SkillsToLearnSection analysis={analysis} />);

    expect(screen.queryByText("🧾 Certifications")).not.toBeInTheDocument();
  });

  it('should show certifications section when present', () => {
    const analysis = {
      skillsToLearn: [],
      certifications: ["AWS Certified"]
    };

    render(<SkillsToLearnSection analysis={analysis} />);

    expect(screen.getByText("🧾 Certifications")).toBeInTheDocument();
  });

  it('should handle null analysis', () => {
    render(<SkillsToLearnSection analysis={null} />);

    expect(screen.getByText("No skills recommendations available yet.")).toBeInTheDocument();
  });
});
