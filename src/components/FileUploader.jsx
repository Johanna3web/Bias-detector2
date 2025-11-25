import React, { useState, useRef } from 'react';
import { parseFile, formatFileSize } from '../utils/parser';

const FileUploader = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFile = async (file) => {
    setError(null);
    setSuccess(null);
    setIsUploading(true);

    try {
      const parsedData = await parseFile(file);
      setSuccess(`Successfully uploaded ${file.name} (${formatFileSize(file.size)})`);
      onFileUpload(file, parsedData);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-pink-800 mb-6">Upload Your Data</h2>
      
      {/* Upload Box */}
      <div
        className={`border-4 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-pink-500 bg-pink-50 scale-105'
            : 'border-pink-300 hover:border-pink-400 hover:bg-pink-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept=".csv,.xlsx,.xls,.json,.txt,.pdf,.docx"
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mb-4"></div>
            <p className="text-pink-600 font-semibold">Processing file...</p>
          </div>
        ) : (
          <>
            <svg
              className="mx-auto h-16 w-16 text-pink-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-xl font-semibold text-gray-700 mb-2">
              Drag & drop your file here
            </p>
            <p className="text-gray-500 mb-4">or click to browse</p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105">
              Choose File
            </button>
          </>
        )}
      </div>

      {/* Supported Formats */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-2">Supported file types:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['CSV', 'XLSX', 'JSON', 'TXT', 'PDF', 'DOCX'].map((format) => (
            <span
              key={format}
              className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold"
            >
              {format}
            </span>
          ))}
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-green-500 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-green-700 font-semibold">{success}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-red-500 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
