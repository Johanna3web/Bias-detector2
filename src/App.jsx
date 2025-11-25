import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import FilePreview from './components/FilePreview';
import BiasAnalyzer from './components/BiasAnalyzer';

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [biasResults, setBiasResults] = useState(null);

  const handleFileUpload = (file, data) => {
    setUploadedFile(file);
    setParsedData(data);
    setBiasResults(null); // Reset analysis when new file uploaded
  };

  const handleClearFile = () => {
    setUploadedFile(null);
    setParsedData(null);
    setBiasResults(null);
  };

  const handleAnalysisComplete = (results) => {
    setBiasResults(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-16 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Bias Detection Analyzer</h1>
          <p className="text-xl opacity-90">
            Upload your data and instantly detect potential biases across demographics
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* File Uploader */}
        <FileUploader onFileUpload={handleFileUpload} />

        {/* File Preview */}
        {uploadedFile && parsedData && (
          <FilePreview
            file={uploadedFile}
            data={parsedData}
            onClear={handleClearFile}
          />
        )}

        {/* Bias Analyzer */}
        {parsedData && (
          <BiasAnalyzer
            data={parsedData}
            onAnalysisComplete={handleAnalysisComplete}
            results={biasResults}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-pink-800 text-white py-6 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2025 Bias Detection Analyzer. Fighting discrimination through data.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
