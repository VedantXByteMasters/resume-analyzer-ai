import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StrengthsCard from './StrengthsCard';

describe('StrengthsCard', () => {
  it('should render all strengths from analysis', () => {
    const analysis = {
      strengths: [
        "Strong technical skills",
        "Excellent communication",
        "Leadership experience"
      ]
    };

    render(<StrengthsCard analysis={analysis} />);

    expect(screen.getByText("Strong technical skills")).toBeInTheDocument();
    expect(screen.getByText("Excellent communication")).toBeInTheDocument();
    expect(screen.getByText("Leadership experience")).toBeInTheDocument();
  });

  it('should display count badge in header', () => {
    const analysis = {
      strengths: ["Strength 1", "Strength 2", "Strength 3"]
    };

    render(<StrengthsCard analysis={analysis} />);

    expect(screen.getByText("(3)")).toBeInTheDocument();
  });

  it('should display empty state when no strengths', () => {
    const analysis = {
      strengths: []
    };

    render(<StrengthsCard analysis={analysis} />);

    expect(screen.getByText("No strengths identified yet.")).toBeInTheDocument();
  });

  it('should handle null analysis', () => {
    render(<StrengthsCard analysis={null} />);

    expect(screen.getByText("No strengths identified yet.")).toBeInTheDocument();
  });

  it('should render each strength in a card with green border', () => {
    const analysis = {
      strengths: ["Test strength"]
    };

    render(<StrengthsCard analysis={analysis} />);

    const strengthCard = screen.getByText("Test strength").closest('div');
    expect(strengthCard).toHaveClass("border-green-400");
  });

  it('should display checkmark emoji for each strength', () => {
    const analysis = {
      strengths: ["Strength 1", "Strength 2"]
    };

    const { container } = render(<StrengthsCard analysis={analysis} />);
    
    // Checkmarks should be present (rendered as text content)
    const checkmarks = container.querySelectorAll('span');
    const hasCheckmark = Array.from(checkmarks).some(el => el.textContent.includes('✅'));
    expect(hasCheckmark).toBe(true);
    expect(screen.getByText("Strength 1")).toBeInTheDocument();
  });
});
