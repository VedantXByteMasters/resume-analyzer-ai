export function createMockPDFFile() {
  return {
    name: 'test-resume.pdf',
    type: 'application/pdf',
    async arrayBuffer() {
      const encoder = new TextEncoder();
      return encoder.encode('Hello Resume AI Test').buffer;
    }
  };
}

export function createMockDOCXFile() {
  return {
    name: 'test-resume.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    async arrayBuffer() {
      const encoder = new TextEncoder();
      // Content is arbitrary; mammoth is mocked
      return encoder.encode('dummy').buffer;
    }
  };
}
