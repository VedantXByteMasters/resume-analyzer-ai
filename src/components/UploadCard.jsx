import React, { useRef, useState } from "react";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function UploadCard({ file, onFileChange }) {
  const inputRef = useRef(null);
  const [isDragging, setDragging] = useState(false);
  const [error, setError] = useState(null);

  function validateAndSet(selectedFile) {
    if (!selectedFile) return;
    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      setError("Invalid file type. Please upload a PDF or DOCX file.");
      onFileChange(null);
      return;
    }
    setError(null);
    onFileChange(selectedFile);
  }

  function onInputChange(e) {
    const f = e.target.files && e.target.files[0];
    validateAndSet(f);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    validateAndSet(f);
  }

  function onDragOver(e) {
    e.preventDefault();
    setDragging(true);
  }

  function onDragLeave(e) {
    e.preventDefault();
    setDragging(false);
  }

  function triggerInput() {
    if (inputRef.current) inputRef.current.click();
  }

  function fileTypeLabel(f) {
    if (!f) return "";
    if (f.type === "application/pdf") return "PDF";
    if (f.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return "DOCX";
    return f.type;
  }

  return (
    <div className="flex-1 p-8">
      <div
        onClick={triggerInput}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`group relative flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#dcdee5] dark:border-white/20 bg-background-light dark:bg-transparent px-10 py-12 text-center transition-all hover:border-primary/50 hover:bg-primary/5 ${
          isDragging ? "ring-2 ring-primary/40" : ""
        }`}
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-white/10 shadow-sm ring-1 ring-[#dcdee5] dark:ring-white/10 transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined text-4xl text-primary">cloud_upload</span>
        </div>

        {!file && (
          <>
            <h3 className="mb-2 text-xl font-bold">Upload Your Resume</h3>
            <p className="mb-8 text-sm text-[#656d86] dark:text-white/60">
              Drag and drop your file here, or <span className="font-bold text-primary underline underline-offset-4">browse</span>
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 rounded-md bg-white dark:bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-[#dcdee5] dark:ring-white/10">
                <span className="material-symbols-outlined text-sm text-red-500">picture_as_pdf</span> PDF
              </div>
              <div className="flex items-center gap-1.5 rounded-md bg-white dark:bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-[#dcdee5] dark:ring-white/10">
                <span className="material-symbols-outlined text-sm text-blue-500">description</span> DOCX
              </div>
            </div>
          </>
        )}

        {file && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-success">check_circle</span>
              <strong className="text-sm">File selected</strong>
            </div>
            <div className="text-sm text-[#121317] dark:text-white font-medium">{file.name}</div>
            <div className="text-xs text-[#656d86] dark:text-white/60">{fileTypeLabel(file)}</div>
          </div>
        )}

        <input
          ref={inputRef}
          className="absolute inset-0 cursor-pointer opacity-0"
          type="file"
          accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={onInputChange}
          aria-label="Upload resume PDF or DOCX"
        />
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
    </div>
  );
}
