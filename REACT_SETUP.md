# React Bias Detection Analyzer - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

3. **Open in Browser**
The app will automatically open at `http://localhost:3000`

---

## 📁 Project Structure

```
bias-detection-analyzer/
├── src/
│   ├── components/
│   │   ├── FileUploader.jsx      # Drag & drop file upload
│   │   ├── FilePreview.jsx       # File preview display
│   │   └── BiasAnalyzer.jsx      # Bias analysis & charts
│   ├── utils/
│   │   ├── parser.js             # File parsing logic
│   │   └── biasCalculator.js    # Bias calculation engine
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind styles
├── index-react.html              # HTML template
├── package.json                  # Dependencies
├── vite.config.js               # Vite configuration
└── tailwind.config.js           # Tailwind configuration
```

---

## 🎨 Features

### 1. File Upload
- **Drag & Drop**: Drag files directly onto the upload box
- **Click to Browse**: Traditional file selection
- **Supported Formats**: CSV, XLSX, JSON, TXT, PDF, DOCX
- **Real-time Feedback**: Loading states and error handling

### 2. File Preview
- **CSV/Excel**: Table view with first 10 rows
- **JSON**: Pretty-printed JSON tree
- **TXT/PDF/DOCX**: Text preview with first 20 lines
- **File Info**: Name, size, type, row count
- **Clear Button**: Remove uploaded file

### 3. Bias Analysis
- **Summary Statistics**: Min, max, mean, median for numeric columns
- **Gender Bias**: Detects disparities across gender groups
- **Race/Ethnicity Bias**: Identifies ethnic disparities
- **Country Bias**: Geographic comparison
- **Overall Score**: 0-100 bias score with interpretation
- **Visual Charts**: Bar charts comparing groups

---

## 🔧 Technology Stack

### Frontend Framework
- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework

### Libraries
- **papaparse**: CSV parsing
- **xlsx**: Excel file parsing
- **pdfjs-dist**: PDF text extraction
- **mammoth**: DOCX text extraction
- **recharts**: Chart visualization

---

## 📊 How It Works

### File Parsing
1. User uploads file via drag & drop or click
2. `parser.js` detects file type
3. Appropriate parser extracts data
4. Data is normalized and returned

### Bias Detection
1. `biasCalculator.js` analyzes data
2. Finds demographic columns (gender, race, country)
3. Calculates statistics for each group
4. Compares groups to detect disparities
5. Generates overall bias score

### Visualization
1. Results displayed in clean UI
2. Charts show group comparisons
3. Color-coded bias indicators
4. Summary statistics in cards

---

## 🎯 Usage Example

### 1. Upload CSV File
```csv
name,gender,race,salary,country
John,male,white,75000,USA
Jane,female,white,65000,USA
Mike,male,black,70000,USA
Sarah,female,asian,68000,USA
```

### 2. View Preview
- Table shows first 10 rows
- File info displays: "4 rows • CSV"

### 3. Analyze
- Click "Analyze for Bias"
- Wait for analysis (1 second)
- View results

### 4. Results
- **Overall Score**: 15 (Excellent)
- **Gender Bias**: 13.3% disparity detected
- **Race Bias**: No significant bias
- **Charts**: Visual comparison of groups

---

## 🎨 Color Scheme

### Light Pink Theme
- **Primary**: #ffb3d9
- **Secondary**: #ff99cc
- **Accent**: #ffaad4
- **Dark**: #8b5a6f
- **Background**: Gradient from pink-50 to pink-100

### Status Colors
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red
- **Info**: Pink

---

## 📝 Component Details

### FileUploader.jsx
**Props:**
- `onFileUpload(file, data)`: Callback when file is uploaded

**Features:**
- Drag & drop zone
- File type validation
- Loading state
- Success/error messages
- Supported format badges

### FilePreview.jsx
**Props:**
- `file`: File object
- `data`: Parsed data
- `onClear()`: Callback to clear file

**Features:**
- File info header
- Dynamic preview based on type
- Table view for CSV/Excel
- JSON pretty-print
- Text preview for documents
- Clear button

### BiasAnalyzer.jsx
**Props:**
- `data`: Parsed data
- `onAnalysisComplete(results)`: Callback with results
- `results`: Current analysis results

**Features:**
- Analyze button
- Overall bias score
- Summary statistics cards
- Gender bias analysis with charts
- Race bias analysis with charts
- Re-analyze functionality

---

## 🔍 Bias Detection Logic

### Gender Bias
1. Find gender column (gender, sex)
2. Group data by gender
3. Calculate average for numeric columns
4. Compare groups
5. Flag if disparity > 10%

### Race Bias
1. Find race column (race, ethnicity, ethnic)
2. Group data by race
3. Calculate averages
4. Compare groups
5. Flag if disparity > 15%

### Overall Score
- Average of all detected disparities
- Weighted by severity
- Capped at 100
- Interpretation:
  - 0-20: Excellent
  - 21-50: Moderate
  - 51-100: Critical

---

## 🚨 Error Handling

### File Upload Errors
- **Unsupported format**: Clear message
- **Corrupted file**: Graceful failure
- **Empty file**: Validation message
- **Parse error**: Detailed error info

### Analysis Errors
- **No numeric columns**: Skip analysis
- **No demographic columns**: Show message
- **Insufficient data**: Require minimum rows

---

## 🎯 Best Practices

### Data Format
- Include demographic columns (gender, race, country)
- Include numeric columns (salary, income, score)
- Use consistent naming
- Clean data (no empty values)

### File Size
- CSV: Up to 10MB recommended
- Excel: Up to 5MB recommended
- JSON: Up to 5MB recommended
- PDF/DOCX: Up to 2MB recommended

---

## 🔄 Build for Production

```bash
npm run build
```

Output in `dist/` folder ready for deployment.

---

## 📱 Responsive Design

- **Desktop**: Full layout with charts
- **Tablet**: Adjusted grid layout
- **Mobile**: Stacked layout, touch-optimized

---

## 🎉 Ready to Use!

1. Run `npm install`
2. Run `npm run dev`
3. Upload a file
4. Analyze for bias
5. View results!

**Enjoy the modern, clean bias detection experience!** 🌸✨
