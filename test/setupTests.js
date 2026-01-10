import React from 'react';
import { vi, beforeEach, afterEach, expect } from 'vitest';
import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Provide a deterministic createObjectURL
globalThis.URL = globalThis.URL || {};
globalThis.URL.createObjectURL = globalThis.URL.createObjectURL || ((blob) => `blob:${Math.random().toString(36).slice(2)}`);

// Minimal Worker mock (prevents real worker creation/network)
class MockWorker {
  constructor() {}
  postMessage() {}
  terminate() {}
}
globalThis.Worker = globalThis.Worker || MockWorker;

// DOMMatrix polyfill for pdfjs usage in jsdom
if (typeof globalThis.DOMMatrix === 'undefined') {
  // Minimal stub sufficient for pdfjs usage in tests
  globalThis.DOMMatrix = function DOMMatrix() {};
}

// Mock Chart.js to prevent DOM access issues in tests
vi.mock('chart.js', () => ({
  Chart: {
    register: vi.fn(),
  },
  ArcElement: vi.fn(),
  Tooltip: vi.fn(),
  Legend: vi.fn(),
}));

// Mock react-chartjs-2
vi.mock('react-chartjs-2', () => ({
  Pie: ({ data, options }) => {
    // Return a simple div with data-testid for testing
    return React.createElement('div', {
      'data-testid': 'pie-chart',
      'data-chart-data': JSON.stringify(data),
      'data-chart-options': JSON.stringify(options)
    });
  },
  Doughnut: ({ data, options }) => {
    // Return a simple div with data-testid for testing
    return React.createElement('div', {
      'data-testid': 'doughnut-chart',
      'data-chart-data': JSON.stringify(data),
      'data-chart-options': JSON.stringify(options)
    });
  },
}));

// Helpers to track console usage per test
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});
