import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import OverallScoreCard from './OverallScoreCard';

describe('OverallScoreCard', () => {
  it('should display resume score correctly', () => {
    const analysis = {
      resumeScore: 85
    };

    render(<OverallScoreCard analysis={analysis} />);

    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('/100')).toBeInTheDocument();
  });

  it('should display 0 when resumeScore is missing', () => {
    const analysis = {};

    render(<OverallScoreCard analysis={analysis} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should clamp score to 0-100 range', () => {
    const { rerender } = render(<OverallScoreCard analysis={{ resumeScore: -10 }} />);
    expect(screen.getByText('0')).toBeInTheDocument();

    rerender(<OverallScoreCard analysis={{ resumeScore: 150 }} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('should display correct percentile text based on score', () => {
    const { rerender } = render(<OverallScoreCard analysis={{ resumeScore: 95 }} />);
    expect(screen.getByText(/Top 10%/)).toBeInTheDocument();

    rerender(<OverallScoreCard analysis={{ resumeScore: 85 }} />);
    expect(screen.getByText(/Top 20%/)).toBeInTheDocument();

    rerender(<OverallScoreCard analysis={{ resumeScore: 75 }} />);
    expect(screen.getByText(/Top 30%/)).toBeInTheDocument();

    rerender(<OverallScoreCard analysis={{ resumeScore: 65 }} />);
    expect(screen.getByText(/Top 40%/)).toBeInTheDocument();

    rerender(<OverallScoreCard analysis={{ resumeScore: 50 }} />);
    expect(screen.getByText(/Top 50%/)).toBeInTheDocument();
  });

  it('should render without errors when analysis is null', () => {
    render(<OverallScoreCard analysis={null} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
