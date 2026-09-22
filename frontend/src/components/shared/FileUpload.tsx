import React, { useRef, useState } from "react";
import { Upload, FileText, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  accept?: string;
  maxSizeMb?: number;
  onFileSelect: (file: File) => void;
  className?: string;
}

export function FileUpload({
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSizeMb = 5,
  onFileSelect,
  className,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`File size exceeds maximum limit of ${maxSizeMb} MB`);
      return;
    }
    setError(null);
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center",
          dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-card/40"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
          <Upload className="w-5 h-5" />
        </div>
        <p className="text-sm font-semibold text-foreground">
          Click or drag & drop file to upload
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Supported: {accept} (Max: {maxSizeMb} MB)
        </p>
      </div>

      {error && <p className="text-xs text-destructive font-medium">{error}</p>}

      {selectedFile && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border text-sm">
          <div className="flex items-center gap-2 overflow-hidden">
            <FileText className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="truncate font-medium">{selectedFile.name}</span>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
