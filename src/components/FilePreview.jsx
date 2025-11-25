import React from 'react';
import { formatFileSize } from '../utils/parser';

const FilePreview = ({ file, data, onClear }) => {
  const renderPreview = () => {
    switch (data.type) {
      case 'csv':
      case 'excel':
        return renderTablePreview();
      case 'json':
        return renderJSONPreview();
      case 'txt':
      case 'pdf':
      case 'docx':
        return renderTextPreview();
      default:
        return <p className="text-gray-600">Preview not available</p>;
    }
  };

  const renderTablePreview = () => {
    if (!data.preview || data.preview.length === 0) {
      return <p className="text-gray-600">No data to preview</p>;
    }

    const columns = data.columns || Object.keys(data.preview[0]);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-pink-200">
          <thead className="bg-pink-100">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-bold text-pink-800 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-pink-100">
            {data.preview.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-pink-50">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {row[column] !== undefined ? String(row[column]) : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.data.length > 10 && (
          <p className="text-sm text-gray-500 mt-4 text-center">
            Showing 10 of {data.data.length} rows
          </p>
        )}
      </div>
    );
  };

  const renderJSONPreview = () => {
    return (
      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
        <code className="text-gray-800">
          {JSON.stringify(data.preview, null, 2)}
        </code>
      </pre>
    );
  };

  const renderTextPreview = () => {
    const lines = data.preview || [];
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        {lines.map((line, index) => (
          <p key={index} className="text-sm text-gray-700 mb-1">
            {line}
          </p>
        ))}
        {data.data && data.data.length > 20 && (
          <p className="text-sm text-gray-500 mt-4">
            Showing 20 of {data.data.length} lines
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      {/* File Info Header */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-pink-100">
        <div className="flex items-center space-x-4">
          <div className="bg-pink-100 p-4 rounded-lg">
            <svg
              className="h-8 w-8 text-pink-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{file.name}</h3>
            <p className="text-sm text-gray-500">
              {formatFileSize(file.size)} • {data.type.toUpperCase()}
              {data.data && ` • ${data.data.length} ${data.type === 'txt' ? 'lines' : 'rows'}`}
            </p>
          </div>
        </div>
        <button
          onClick={onClear}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105"
        >
          Clear File
        </button>
      </div>

      {/* Preview Section */}
      <div>
        <h4 className="text-lg font-bold text-pink-800 mb-4">File Preview</h4>
        {renderPreview()}
      </div>
    </div>
  );
};

export default FilePreview;
