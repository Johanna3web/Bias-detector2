# PayEquity AI - Workplace Bias Detector

A comprehensive web application for detecting and analyzing pay bias across different sectors, countries, and demographics using advanced analytics and AI-powered insights.

## Features

### Core Functionality
- **Multi-dimensional Bias Detection**: Analyzes pay disparities across gender, ethnicity, age, geography, and sectors
- **Data Import**: Support for CSV, Excel, and JSON file uploads
- **Manual Entry**: Form-based data entry for individual records
- **Real-time Analysis**: Instant bias detection and scoring

### Advanced Analytics
- **Overall Bias Score**: 0-100 scoring system with severity classification
- **Gender Pay Gap Analysis**: Detailed breakdown of pay differences by gender
- **Ethnicity-Based Analysis**: Identifies pay disparities across ethnic groups
- **Age Discrimination Detection**: Analyzes age-related pay patterns
- **Geographic Comparison**: Cross-country salary analysis
- **Sector Analysis**: Industry-specific pay equity insights
- **Experience-Based Analysis**: Correlates experience with compensation

### AI-Powered Features
- **Pattern Recognition**: ML algorithms detect hidden bias patterns
- **Confidence Scoring**: Each insight includes confidence levels
- **Predictive Insights**: Identifies potential future bias risks
- **Automated Recommendations**: Actionable steps to address detected biases

### Visualization
- **Interactive Charts**: Gender, sector, experience, and country comparisons
- **Real-time Dashboards**: Dynamic data visualization
- **Score Animations**: Engaging visual feedback
- **Color-coded Alerts**: Quick identification of critical issues

### Reporting
- **PDF Export**: Generate comprehensive reports
- **Data Export**: Download analysis data in CSV format
- **Shareable Reports**: Create links to share findings

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js for data visualization
- **Data Processing**: PapaParse for CSV handling
- **PDF Generation**: jsPDF for report creation
- **Styling**: Custom CSS with modern design patterns

## Getting Started

### Installation

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. No build process or dependencies required!

### Usage

#### Option 1: Upload Data File
1. Click "Choose File" in the upload section
2. Select a CSV, Excel, or JSON file with salary data
3. Required fields: country, sector, jobTitle, experience, gender, ethnicity, age, education, salary, department

#### Option 2: Manual Entry
1. Fill out the form with employee information
2. Click "Add Entry" to add to dataset
3. Repeat for multiple entries
4. Click "Run Bias Analysis" when ready

### Data Format

CSV/Excel columns should include:
```
country, sector, jobTitle, experience, gender, ethnicity, age, education, salary, department
```

JSON format:
```json
[
  {
    "country": "united-states",
    "sector": "technology",
    "jobTitle": "Software Engineer",
    "experience": 5,
    "gender": "female",
    "ethnicity": "asian",
    "age": 28,
    "education": "bachelors",
    "salary": 95000,
    "department": "Engineering"
  }
]
```

## Supported Countries

United States, United Kingdom, Canada, Australia, Germany, France, Japan, China, India, Brazil, Mexico, Spain, Italy, Netherlands, Sweden, Norway, Denmark, Singapore, South Korea, Switzerland, Belgium, Austria, Poland, Ireland

## Supported Sectors

Technology, Finance, Healthcare, Education, Manufacturing, Retail, Hospitality, Construction, Transportation, Energy, Telecommunications, Media, Legal, Consulting, Real Estate, Agriculture, Pharmaceutical, Automotive, Aerospace, Government

## Analysis Metrics

### Bias Score Interpretation
- **0-20**: Excellent - Minimal bias detected
- **21-50**: Moderate - Action recommended
- **51-100**: Critical - Immediate action required

### Key Indicators
- Gender pay gap percentage
- Ethnicity-based disparity percentage
- Age-related variance
- Geographic pay differences
- Sector-specific patterns

## Advanced Features

### Machine Learning Insights
- Automatic pattern detection in salary data
- Confidence scoring for each finding
- Multi-factor bias correlation analysis
- Predictive risk assessment

### Recommendations Engine
- Priority-based action items
- Impact assessment for each recommendation
- Industry best practices
- Compliance guidance

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Privacy & Security

- All data processing happens locally in your browser
- No data is sent to external servers
- No user tracking or analytics
- Complete data privacy

## Future Enhancements

- Integration with HR systems (ADP, Workday, BambooHR)
- Historical trend analysis
- Benchmarking against industry standards
- Advanced ML models for deeper insights
- Multi-language support
- Mobile app version
- API for programmatic access

## Contributing

This is an open-source project. Contributions are welcome!

## License

MIT License - Free to use and modify

## Support

For issues or questions, please open an issue in the repository.

---

**Built to fight workplace discrimination through data-driven insights.**
