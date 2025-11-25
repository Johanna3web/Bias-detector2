================================================================================
  REACT BIAS DETECTION ANALYZER - QUICK START
================================================================================

MODERN REACT + TAILWIND APPLICATION WITH ALL FEATURES!

================================================================================
QUICK START (3 STEPS):
================================================================================

1. INSTALL DEPENDENCIES
   Run: npm install
   (This installs React, Tailwind, and all libraries)

2. START DEV SERVER
   Run: npm run dev
   (Opens at http://localhost:3000)

3. USE THE APP
   - Upload a file (CSV, Excel, JSON, TXT, PDF, DOCX)
   - View instant preview
   - Click "Analyze for Bias"
   - See results with charts!

================================================================================
WINDOWS USERS - EASY START:
================================================================================

Double-click: START_REACT.bat
(Automatically installs and starts the app)

================================================================================
FEATURES:
================================================================================

✅ Modern React 18 + Vite
✅ Tailwind CSS (soft pink theme)
✅ Drag & drop file upload
✅ Instant file preview
✅ Bias analysis engine
✅ Beautiful charts (Recharts)
✅ Summary statistics
✅ Gender bias detection
✅ Race/ethnicity bias detection
✅ Country comparison
✅ Overall bias score (0-100)
✅ Error handling
✅ Responsive design

================================================================================
SUPPORTED FILE FORMATS:
================================================================================

✅ CSV - Comma-separated values
✅ XLSX/XLS - Excel spreadsheets
✅ JSON - JavaScript Object Notation
✅ TXT - Plain text files
✅ PDF - Portable Document Format
✅ DOCX - Microsoft Word documents

================================================================================
COMPONENTS:
================================================================================

📁 src/components/
   ├── FileUploader.jsx    - Drag & drop upload
   ├── FilePreview.jsx     - File preview display
   └── BiasAnalyzer.jsx    - Analysis & charts

📁 src/utils/
   ├── parser.js           - File parsing logic
   └── biasCalculator.js   - Bias calculation

================================================================================
HOW IT WORKS:
================================================================================

1. UPLOAD
   - Drag file or click to browse
   - Supports 6 file formats
   - Shows loading state
   - Success/error messages

2. PREVIEW
   - CSV/Excel: Table view (first 10 rows)
   - JSON: Pretty-printed tree
   - TXT/PDF/DOCX: Text preview (first 20 lines)
   - File info: name, size, type, rows

3. ANALYZE
   - Click "Analyze for Bias"
   - Detects gender disparities
   - Detects race disparities
   - Detects country differences
   - Calculates overall score

4. RESULTS
   - Overall bias score (0-100)
   - Summary statistics (min, max, mean, median)
   - Group-by analysis with charts
   - Color-coded bias indicators
   - Actionable insights

================================================================================
TECHNOLOGY STACK:
================================================================================

Frontend:
- React 18 (with hooks)
- Vite (fast build tool)
- Tailwind CSS (utility-first)

Libraries:
- papaparse (CSV parsing)
- xlsx (Excel parsing)
- pdfjs-dist (PDF extraction)
- mammoth (DOCX extraction)
- recharts (charts)

================================================================================
COLOR SCHEME:
================================================================================

Soft Pink Theme:
- Primary: #ffb3d9 (Light pink)
- Secondary: #ff99cc (Soft pink)
- Accent: #ffaad4 (Medium pink)
- Dark: #8b5a6f (Deep rose)
- Background: Pink gradient

================================================================================
EXAMPLE DATA FORMAT:
================================================================================

CSV Example:
name,gender,race,salary,country
John,male,white,75000,USA
Jane,female,white,65000,USA
Mike,male,black,70000,USA

JSON Example:
[
  {
    "name": "John",
    "gender": "male",
    "race": "white",
    "salary": 75000,
    "country": "USA"
  }
]

================================================================================
BIAS DETECTION:
================================================================================

Gender Bias:
- Finds gender column
- Groups by gender
- Compares averages
- Flags if disparity > 10%

Race Bias:
- Finds race/ethnicity column
- Groups by race
- Compares averages
- Flags if disparity > 15%

Overall Score:
- 0-20: Excellent (minimal bias)
- 21-50: Moderate (action recommended)
- 51-100: Critical (immediate action)

================================================================================
TROUBLESHOOTING:
================================================================================

"Node.js not found":
- Install from: https://nodejs.org/
- Restart terminal after install

"npm install fails":
- Delete node_modules folder
- Run: npm install again

"Port 3000 in use":
- Change port in vite.config.js
- Or stop other app using port 3000

"File won't upload":
- Check file format is supported
- Check file isn't corrupted
- Try smaller file size

================================================================================
PRODUCTION BUILD:
================================================================================

Build for production:
npm run build

Output folder: dist/
Ready to deploy to any static host!

================================================================================
DOCUMENTATION:
================================================================================

- REACT_SETUP.md - Detailed setup guide
- REACT_README.txt - This file
- START_REACT.bat - Auto-start script (Windows)

================================================================================
READY TO USE!
================================================================================

1. Run: npm install
2. Run: npm run dev
3. Open: http://localhost:3000
4. Upload file and analyze!

Enjoy the modern React bias detection analyzer! 🌸✨

================================================================================
