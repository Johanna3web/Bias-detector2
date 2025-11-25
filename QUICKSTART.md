# Quick Start Guide

## Getting Started in 3 Steps

### Step 1: Open the Application
Simply open `index.html` in your web browser (Chrome, Firefox, Safari, or Edge).

### Step 2: Load Data
You have three options:

**Option A: Use Sample Data (Easiest)**
1. Click the "📊 Load Sample Data" button
2. Click "Run Bias Analysis"
3. View results instantly!

**Option B: Upload a File**
1. Click "Choose File"
2. Select a CSV or JSON file with salary data
3. Click "Run Bias Analysis"

**Option C: Manual Entry**
1. Fill out the form with employee information
2. Click "Add Entry" (repeat for multiple employees)
3. Click "Run Bias Analysis" when you have at least 5 entries

### Step 3: Review Results
- View the overall bias score (0-100)
- Explore detailed breakdowns by gender, ethnicity, age, etc.
- Review AI-powered insights
- Get actionable recommendations
- Generate reports

## Data Format

### CSV Format
Your CSV file should have these columns:
```
country,sector,jobTitle,experience,gender,ethnicity,age,education,salary,department
```

Example:
```csv
country,sector,jobTitle,experience,gender,ethnicity,age,education,salary,department
united-states,technology,Software Engineer,5,male,white-caucasian,30,bachelors,100000,Engineering
united-states,technology,Software Engineer,5,female,white-caucasian,29,bachelors,85000,Engineering
```

### JSON Format
```json
[
  {
    "country": "united-states",
    "sector": "technology",
    "jobTitle": "Software Engineer",
    "experience": 5,
    "gender": "male",
    "ethnicity": "white-caucasian",
    "age": 30,
    "education": "bachelors",
    "salary": 100000,
    "department": "Engineering"
  }
]
```

## Troubleshooting

### "No valid data found"
- Check that your CSV has the correct column names
- Ensure salary values are numbers (no currency symbols)
- Make sure there are no empty rows

### Charts not displaying
- Ensure you have an internet connection (for Chart.js library)
- Try refreshing the page
- Check browser console for errors (F12)

### File upload not working
- Verify file format is .csv or .json
- Check file size (very large files may take time to process)
- Try using sample data first to verify the app works

## Tips for Best Results

1. **Minimum Data**: Use at least 5-10 entries for meaningful analysis
2. **Diverse Data**: Include various demographics for comprehensive insights
3. **Consistent Format**: Keep data formatting consistent (especially country/sector names)
4. **Regular Analysis**: Run quarterly audits to track progress

## Need Help?

- Check the main README.md for detailed documentation
- Open test.html for a quick functionality test
- Review the sample data structure in the app

## Privacy Note

All data processing happens locally in your browser. No data is sent to external servers.
