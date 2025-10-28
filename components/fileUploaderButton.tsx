import { on } from "events";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploaderButton = ({ onFileSelect }: FileUploaderProps) => {
  const [file, setFile] = useState(false);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setFile(!!file);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "application/pdf": [".pdf"],
        "text/plain": [".txt"],
        "application/msword": [".doc", ".docx"],
      },
      maxSize: 20 * 1024 * 1024, // 20 MB
    });

  return (
    
      <div className="min-h-[5rem] w-full cursor-pointer rounded-2xl bg-gray-200 border border-gray-400 shadow-sm px-4 py-3 text-gray-800 text-center"
       {...getRootProps()}>
        <input {...getInputProps()} />
        {file ? (
          <>
            <div
              className="flex flex-col items-center bg-white border border-gray-300 rounded-2xl p-4 shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/images/pdf.png" alt="pdf" className="w-12 h-12 mb-2" />
              <p className="text-gray-800 font-medium text-center truncate">
                {acceptedFiles[0].name}
              </p>
              <button
                className="mt-4 text-red-500 hover:text-red-700 font-semibold transition"
                onClick={() => {
                  setFile(false);
                  onFileSelect?.(null);
                }}
              >
                Remove
              </button>
            </div>
          </>
        ) : isDragActive ? (
          <p className="text-gray-500">Drop the files here ...</p>
        ) : (
          <p className="text-gray-500">
            Drag and drop some files here, or click to select files
          </p>
        )}
      </div>
    
  );
};

export default FileUploaderButton;
