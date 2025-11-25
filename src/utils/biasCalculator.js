export const calculateBias = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const results = {
    summary: calculateSummaryStats(data),
    genderBias: analyzeGenderBias(data),
    raceBias: analyzeRaceBias(data),
    countryBias: analyzeCountryBias(data),
    overallScore: 0
  };

  // Calculate overall bias score (0-100, lower is better)
  results.overallScore = calculateOverallScore(results);

  return results;
};

const calculateSummaryStats = (data) => {
  const numericColumns = findNumericColumns(data);
  const stats = {};

  numericColumns.forEach(column => {
    const values = data
      .map(row => parseFloat(row[column]))
      .filter(val => !isNaN(val));

    if (values.length > 0) {
      stats[column] = {
        min: Math.min(...values),
        max: Math.max(...values),
        mean: values.reduce((a, b) => a + b, 0) / values.length,
        median: calculateMedian(values),
        count: values.length
      };
    }
  });

  return stats;
};

const analyzeGenderBias = (data) => {
  const genderColumn = findColumn(data, ['gender', 'sex']);
  if (!genderColumn) return null;

  const numericColumns = findNumericColumns(data);
  if (numericColumns.length === 0) return null;

  const groups = groupBy(data, genderColumn);
  const analysis = {};

  numericColumns.forEach(column => {
    const groupStats = {};
    let maxAvg = 0;
    let minAvg = Infinity;

    Object.keys(groups).forEach(gender => {
      const values = groups[gender]
        .map(row => parseFloat(row[column]))
        .filter(val => !isNaN(val));

      if (values.length > 0) {
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        groupStats[gender] = {
          average: avg,
          count: values.length,
          min: Math.min(...values),
          max: Math.max(...values)
        };
        maxAvg = Math.max(maxAvg, avg);
        minAvg = Math.min(minAvg, avg);
      }
    });

    const disparity = maxAvg > 0 ? ((maxAvg - minAvg) / maxAvg * 100) : 0;

    analysis[column] = {
      groups: groupStats,
      disparity: disparity.toFixed(2),
      hasBias: disparity > 10
    };
  });

  return analysis;
};

const analyzeRaceBias = (data) => {
  const raceColumn = findColumn(data, ['race', 'ethnicity', 'ethnic']);
  if (!raceColumn) return null;

  const numericColumns = findNumericColumns(data);
  if (numericColumns.length === 0) return null;

  const groups = groupBy(data, raceColumn);
  const analysis = {};

  numericColumns.forEach(column => {
    const groupStats = {};
    let maxAvg = 0;
    let minAvg = Infinity;

    Object.keys(groups).forEach(race => {
      const values = groups[race]
        .map(row => parseFloat(row[column]))
        .filter(val => !isNaN(val));

      if (values.length > 0) {
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        groupStats[race] = {
          average: avg,
          count: values.length
        };
        maxAvg = Math.max(maxAvg, avg);
        minAvg = Math.min(minAvg, avg);
      }
    });

    const disparity = maxAvg > 0 ? ((maxAvg - minAvg) / maxAvg * 100) : 0;

    analysis[column] = {
      groups: groupStats,
      disparity: disparity.toFixed(2),
      hasBias: disparity > 15
    };
  });

  return analysis;
};

const analyzeCountryBias = (data) => {
  const countryColumn = findColumn(data, ['country', 'location', 'region']);
  if (!countryColumn) return null;

  const numericColumns = findNumericColumns(data);
  if (numericColumns.length === 0) return null;

  const groups = groupBy(data, countryColumn);
  const analysis = {};

  numericColumns.forEach(column => {
    const groupStats = {};

    Object.keys(groups).forEach(country => {
      const values = groups[country]
        .map(row => parseFloat(row[column]))
        .filter(val => !isNaN(val));

      if (values.length > 0) {
        groupStats[country] = {
          average: values.reduce((a, b) => a + b, 0) / values.length,
          count: values.length
        };
      }
    });

    analysis[column] = {
      groups: groupStats
    };
  });

  return analysis;
};

const calculateOverallScore = (results) => {
  let score = 0;
  let factors = 0;

  // Gender bias impact
  if (results.genderBias) {
    Object.values(results.genderBias).forEach(analysis => {
      if (analysis.hasBias) {
        score += parseFloat(analysis.disparity);
        factors++;
      }
    });
  }

  // Race bias impact
  if (results.raceBias) {
    Object.values(results.raceBias).forEach(analysis => {
      if (analysis.hasBias) {
        score += parseFloat(analysis.disparity);
        factors++;
      }
    });
  }

  return factors > 0 ? Math.min(100, Math.round(score / factors)) : 0;
};

// Helper functions
const findNumericColumns = (data) => {
  if (data.length === 0) return [];
  
  const firstRow = data[0];
  return Object.keys(firstRow).filter(key => {
    const value = firstRow[key];
    return !isNaN(parseFloat(value)) && isFinite(value);
  });
};

const findColumn = (data, possibleNames) => {
  if (data.length === 0) return null;
  
  const columns = Object.keys(data[0]).map(k => k.toLowerCase());
  
  for (const name of possibleNames) {
    const found = columns.find(col => col.includes(name));
    if (found) {
      return Object.keys(data[0])[columns.indexOf(found)];
    }
  }
  
  return null;
};

const groupBy = (data, column) => {
  return data.reduce((groups, item) => {
    const key = item[column];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
};

const calculateMedian = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};
