import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ResumeProcessor, { extractResumeText } from './ResumeProcessor';
import { createMockPDFFile } from '../../test/utils/fileMocks';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Use real timers but mock delays inside processResume (mockAnalyze/mockGenerate are short)
vi.useRealTimers();

// Mock pdf.worker URL import
vi.mock('pdfjs-dist/build/pdf.worker.min.mjs?url', () => ({ default: 'mock://pdf.worker' }));

// Mock pdfjs-dist synchronously to avoid top-level execution
vi.mock('pdfjs-dist', () => {
  const GlobalWorkerOptions = { workerSrc: '' };
  return {
    GlobalWorkerOptions,
    getDocument: vi.fn(({ data }) => ({
      // Delay resolution slightly so tests can observe the 'active' state
      promise: new Promise((resolve) => setTimeout(() => resolve({ numPages: 1, getPage: () => Promise.resolve({ getTextContent: () => Promise.resolve({ items: [{ str: 'Hello Resume AI Test' }] }) }) }), 40))
    }))
  };
});

vi.mock('mammoth', () => ({ default: { extractRawText: vi.fn(async () => ({ value: 'Hello Resume AI Test' })) } }));

function renderWithFile(file) {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/resume-processor', state: { file } }]}>
      <Routes>
        <Route path="/resume-processor" element={<ResumeProcessor />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Resume processing timeline', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('timeline updates step-by-step on success', async () => {
    const file = createMockPDFFile();

    renderWithFile(file);

    // Immediately uploaded should be 'done'
    const uploaded = await screen.findByTestId('timeline-uploaded');
    expect(uploaded.getAttribute('data-status')).toBe('done');

    // Observe completion timestamps for each stage to assert ordering
    const extracting = await screen.findByTestId('timeline-extracting');
    const analyzing = await screen.findByTestId('timeline-analyzing');
    const generating = await screen.findByTestId('timeline-generating');
    const completed = await screen.findByTestId('timeline-completed');

    const t = {};
    await waitFor(async () => {
      if (extracting.getAttribute('data-status') === 'done' && !t.extractDone) t.extractDone = performance.now();
      if (analyzing.getAttribute('data-status') === 'done' && !t.analyDone) t.analyDone = performance.now();
      if (generating.getAttribute('data-status') === 'done' && !t.genDone) t.genDone = performance.now();
      if (completed.getAttribute('data-status') === 'done' && !t.compDone) t.compDone = performance.now();

      // all must be done
      if (!t.extractDone || !t.analyDone || !t.genDone || !t.compDone) throw new Error('not finished yet');
    }, { timeout: 2000 });

    // Ensure ordering
    expect(t.extractDone).toBeLessThan(t.analyDone);
    expect(t.analyDone).toBeLessThan(t.genDone);
    expect(t.genDone).toBeLessThan(t.compDone);

    // Ensure no console errors were logged
    expect(console.error).not.toHaveBeenCalled();
  });

  test('timeline shows error when extraction fails', async () => {
    // Make extractResumeText fail
    const bad = {
      name: 'bad.pdf',
      type: 'application/pdf',
      async arrayBuffer() { throw new Error('broken file'); }
    };

    renderWithFile(bad);

    const errorEl = await screen.findByTestId('timeline-error');
    expect(errorEl.textContent).toMatch(/broken file/i);

    // Ensure completed is not set
    const completed = await screen.findByTestId('timeline-completed');
    expect(completed.getAttribute('data-status')).not.toBe('done');
  });
});