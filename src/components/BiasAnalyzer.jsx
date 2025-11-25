import React, { useState, useEffect } from 'react';
import { calculateBias } from '../utils/biasCalculator';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const BiasAnalyzer = ({ data, onAnalysisComplete, results }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(results);

  useEffect(() => {
    setAnalysisResults(results);
  }, [results]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay for better UX
    setTimeout(() => {
      const biasResults = calculateBias(data.data);
      setAnalysisResults(biasResults);
      onAnalysisComplete(biasResults);
      setIsAnalyzing(false);
    }, 1000);
  };

  const renderSummaryStats = () => {
    if (!analysisResults?.summary) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {Object.entries(analysisResults.summary).map(([column, stats]) => (
          <div key={column} className="bg-pink-50 rounded-lg p-4 border-2 border-pink-200">
            <h4 className="font-bold text-pink-800 mb-3">{column}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Min:</span>
                <span className="font-semibold">{stats.min.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max:</span>
                <span className="font-semibold">{stats.max.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mean:</span>
                <span className="font-semibold">{stats.mean.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Median:</span>
                <span className="font-semibold">{stats.median.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderGenderAnalysis = () => {
    if (!analysisResults?.genderBias) return null;

    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold text-pink-800 mb-4">Gender Bias Analysis</h3>
        {Object.entries(analysisResults.genderBias).map(([column, analysis]) => {
          const chartData = Object.entries(analysis.groups).map(([gender, stats]) => ({
            name: gender,
            average: stats.average,
            count: stats.count
          }));

          return (
            <div key={column} className="bg-white rounded-lg p-6 mb-4 border-2 border-pink-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-800">{column}</h4>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    analysis.hasBias
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {analysis.hasBias ? '⚠️ Bias Detected' : '✓ No Significant Bias'}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Disparity: <span className="font-bold">{analysis.disparity}%</span>
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffd4e8" />
                  <XAxis dataKey="name" stroke="#8b5a6f" />
                  <YAxis stroke="#8b5a6f" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #ffb3d9',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="average" fill="#ffb3d9" name="Average Value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>
    );
  };

  const renderRaceAnalysis = () => {
    if (!analysisResults?.raceBias) return null;

    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold text-pink-800 mb-4">Race/Ethnicity Bias Analysis</h3>
        {Object.entries(analysisResults.raceBias).map(([column, analysis]) => {
          const chartData = Object.entries(analysis.groups).map(([race, stats]) => ({
            name: race,
            average: stats.average,
            count: stats.count
          }));

          return (
            <div key={column} className="bg-white rounded-lg p-6 mb-4 border-2 border-pink-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-800">{column}</h4>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    analysis.hasBias
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {analysis.hasBias ? '⚠️ Bias Detected' : '✓ No Significant Bias'}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Disparity: <span className="font-bold">{analysis.disparity}%</span>
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffd4e8" />
                  <XAxis dataKey="name" stroke="#8b5a6f" />
                  <YAxis stroke="#8b5a6f" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #ffb3d9',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="average" fill="#ff99cc" name="Average Value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>
    );
  };

  const renderOverallScore = () => {
    if (!analysisResults) return null;

    const score = analysisResults.overallScore;
    let status, color, bgColor;

    if (score < 20) {
      status = 'Excellent';
      color = 'text-green-700';
      bgColor = 'bg-green-100';
    } else if (score < 50) {
      status = 'Moderate';
      color = 'text-yellow-700';
      bgColor = 'bg-yellow-100';
    } else {
      status = 'Critical';
      color = 'text-red-700';
      bgColor = 'bg-red-100';
    }

    return (
      <div className={`${bgColor} rounded-xl p-8 mb-8 text-center`}>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Overall Bias Score</h3>
        <div className="flex items-center justify-center space-x-4">
          <div className="text-6xl font-bold text-pink-600">{score}</div>
          <div className="text-left">
            <p className="text-gray-600">out of 100</p>
            <p className={`text-xl font-bold ${color}`}>{status}</p>
          </div>
        </div>
        <p className="text-gray-600 mt-4">
          {score < 20 && 'Minimal bias detected. Great job maintaining fairness!'}
          {score >= 20 && score < 50 && 'Some bias detected. Consider reviewing your data and processes.'}
          {score >= 50 && 'Significant bias detected. Immediate action recommended.'}
        </p>
      </div>
    );
  };

  if (!analysisResults) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-pink-800 mb-6">Bias Analysis</h2>
        <div className="text-center py-12">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <span className="flex items-center">
                <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Analyzing...
              </span>
            ) : (
              '🔍 Analyze for Bias'
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-pink-800">Bias Analysis Results</h2>
        <button
          onClick={handleAnalyze}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-lg transition-all"
        >
          Re-analyze
        </button>
      </div>

      {renderOverallScore()}
      
      <h3 className="text-xl font-bold text-pink-800 mb-4">Summary Statistics</h3>
      {renderSummaryStats()}
      
      {renderGenderAnalysis()}
      {renderRaceAnalysis()}
    </div>
  );
};

export default BiasAnalyzer;
