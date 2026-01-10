import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import { createMockPDFFile, createMockDOCXFile } from '../../test/utils/fileMocks';

// Mock pdfjs-dist worker URL import so the module-level worker import in ResumeProcessor won't try to load a real asset
vi.mock('pdfjs-dist/build/pdf.worker.min.mjs?url', () => ({ default: 'mock://pdf.worker' }));

// Mock pdfjs-dist before importing the component so GlobalWorkerOptions is available
vi.mock('pdfjs-dist', () => {
  const GlobalWorkerOptions = { workerSrc: '' };

  return {
    GlobalWorkerOptions,
    getDocument: vi.fn(({ data }) => {
      // Small async delay to simulate work but keep test fast
      return {
        promise: new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              numPages: 1,
              getPage: (n) =>
                Promise.resolve({
                  getTextContent: () =>
                    Promise.resolve({ items: [{ str: 'Hello Resume AI Test' }] })
                })
            });
          }, 10);
        })
      };
    })
  };
});

// Mock mammoth (exported as default)
vi.mock('mammoth', () => ({
  default: {
    extractRawText: vi.fn(async ({ arrayBuffer }) => {
      // tiny delay
      await new Promise((r) => setTimeout(r, 5));
      return { value: 'Hello Resume AI Test' };
    })
  }
}));

import ResumeProcessor, { extractResumeText } from './ResumeProcessor';
import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';

function renderWithFile(file) {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/resume-processor', state: { file } }]}>
      <Routes>
        <Route path="/resume-processor" element={<ResumeProcessor />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ResumeProcessor extraction tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('PDF upload -> extraction succeeds and contains known text, no console errors, no fake worker, <2s', async () => {
    const mockFile = createMockPDFFile();

    // First, test the extraction function directly (unit test)
    const start = performance.now();
    const text = await extractResumeText(mockFile);
    const duration = performance.now() - start;

    if (console.error.mock.calls.length) {
      const calls = console.error.mock.calls;
      const first = calls[0];
      const errObj = first && first[1];
      const name = errObj && errObj.constructor ? errObj.constructor.name : String(errObj);
      const msg = (errObj && errObj.message) || JSON.stringify(errObj);
      throw new Error(`console.error called during extraction: ${name} - ${msg}`);
    }

    expect(text).not.toBeNull();
    expect(typeof text).toBe('string');
    expect(text).toContain('Hello Resume AI Test');
    expect(text.length).toBeGreaterThan(0);
    expect(duration).toBeLessThan(2000);

    // Ensure the pdfjs getDocument flow was invoked
    expect(pdfjs.getDocument).toHaveBeenCalled();

    // Render component to ensure it mounts without console errors
    renderWithFile(mockFile);
    expect(console.error).not.toHaveBeenCalled();

    // If any warning containing 'fake worker' occurred, fail
    const warns = console.warn.mock.calls.flat().join(' ');
    expect(warns).not.toMatch(/fake worker/i);
  });

  test('DOCX upload -> extraction succeeds and contains known text, no console errors, no fake worker, <2s', async () => {
    const mockFile = createMockDOCXFile();

    // Unit test the DOCX extraction function directly
    const start = performance.now();
    const text = await extractResumeText(mockFile);
    const duration = performance.now() - start;

    if (console.error.mock.calls.length) {
      const calls = console.error.mock.calls;
      const first = calls[0];
      const errObj = first && first[1];
      const name = errObj && errObj.constructor ? errObj.constructor.name : String(errObj);
      const msg = (errObj && errObj.message) || JSON.stringify(errObj);
      throw new Error(`console.error called during extraction: ${name} - ${msg}`);
    }

    expect(text).not.toBeNull();
    expect(typeof text).toBe('string');
    expect(text).toContain('Hello Resume AI Test');
    expect(text.length).toBeGreaterThan(0);
    expect(duration).toBeLessThan(2000);

    // Ensure mammoth.extractRawText was invoked
    expect(mammoth.extractRawText).toHaveBeenCalled();

    // Render component to ensure it mounts without console errors
    renderWithFile(mockFile);
    expect(console.error).not.toHaveBeenCalled();

    const warns = console.warn.mock.calls.flat().join(' ');
    expect(warns).not.toMatch(/fake worker/i);
  });
});
