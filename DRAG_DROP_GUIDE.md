# Drag & Drop File Upload Guide

## 🎯 New Feature: Drag & Drop

You can now easily upload files by dragging and dropping them directly onto the upload area!

---

## 🖱️ How to Use Drag & Drop

### Method 1: Drag & Drop (New!)
1. **Find your file** in File Explorer or on your desktop
2. **Click and hold** the file
3. **Drag** it over the upload box in the browser
4. **Watch** the upload box highlight and change color
5. **Drop** the file when you see "📁 Drop file here"
6. **Done!** The file will be processed automatically

### Method 2: Click to Browse (Traditional)
1. **Click** anywhere on the upload box
2. **Select** your file from the file picker
3. **Click** Open
4. **Done!** The file will be processed

### Method 3: Button Click
1. **Click** the "Choose File" button
2. **Select** your file
3. **Click** Open
4. **Done!**

---

## ✨ Visual Feedback

### When You Hover
- Upload box changes to light nude color
- Border changes to primary color
- Box lifts slightly (subtle animation)

### When You Drag Over
- Border becomes solid (instead of dashed)
- Background changes to nude light
- Shadow appears around the box
- Text appears: "📁 Drop file here"
- Box scales up slightly

### When Processing
- Shows file name: "📄 filename.csv - Processing..."
- Text turns to primary color
- After processing: Shows success message
- "✅ Successfully loaded X entries from filename"

---

## 📁 Supported File Types

All file types are accepted! The app will automatically detect and parse:

### Fully Supported ✅
- **CSV** (.csv) - Comma-separated values
- **JSON** (.json) - JavaScript Object Notation
- **TXT** (.txt) - Tab or comma-separated text

### Partially Supported ⚠️
- **Excel** (.xlsx, .xls) - Recommended to save as CSV first
- **Word** (.doc, .docx) - Text extraction attempted
- **PDF** (.pdf) - Manual conversion recommended

### Any Other Format
- The app will attempt to parse as text
- You'll get helpful guidance if parsing fails

---

## 🎨 Visual Design

The drag & drop area features the warm nude color scheme:
- **Default**: White background with dashed gray border
- **Hover**: Nude light background with primary border
- **Drag Over**: Solid primary border with shadow effect
- **Processing**: Primary colored text with file name
- **Success**: Green text with checkmark

---

## 💡 Tips for Best Results

### File Preparation
1. **CSV is best**: Save Excel files as CSV for fastest processing
2. **Check headers**: Ensure your file has column headers
3. **Clean data**: Remove empty rows and columns
4. **One file at a time**: Drop one file, wait for processing, then add more if needed

### Required Columns
Your file should include:
```
country, sector, jobTitle, experience, gender, ethnicity, 
age, education, salary, currency, department
```

### Drag & Drop Tips
- **Single file**: Drop one file at a time
- **Wait for processing**: Let the first file finish before dropping another
- **Check preview**: Review the data preview before running analysis
- **Success message**: Wait for the green checkmark confirmation

---

## 🔧 Troubleshooting

### File Not Uploading?
- **Check file size**: Very large files may take time
- **Try clicking**: Use the "Choose File" button instead
- **Check format**: Ensure file is not corrupted
- **Browser support**: Use Chrome, Edge, Firefox, or Safari

### Drag & Drop Not Working?
- **Browser compatibility**: Update to latest browser version
- **Try clicking**: Use the click method instead
- **Check JavaScript**: Ensure JavaScript is enabled
- **Refresh page**: Reload and try again

### File Parsed Incorrectly?
- **Convert to CSV**: Save your file as CSV format
- **Check delimiters**: Ensure proper comma or tab separation
- **Review headers**: Make sure column names match expected format
- **Manual entry**: Use the form to add data manually

---

## 🎯 Quick Start

### Fastest Way to Test:
1. **Open** `index.html`
2. **Click** "📊 Load Sample Data" (no file needed!)
3. **Or** drag any CSV/JSON file onto the upload box
4. **Watch** the visual feedback
5. **Review** data preview
6. **Click** "Run Bias Analysis"

---

## 📊 What Happens After Upload?

1. **File is read** - Content extracted from file
2. **Format detected** - CSV, JSON, TXT, etc.
3. **Data parsed** - Converted to usable format
4. **Currency normalized** - Auto-detected from country
5. **Preview shown** - Table displays first 10 entries
6. **Ready to analyze** - "Run Bias Analysis" button appears

---

## 🌟 Advanced Features

### Multiple Files
- Drop one file, wait for processing
- Drop another to add more data
- All data combines in the preview

### File Validation
- Automatic format detection
- Error messages if parsing fails
- Helpful suggestions for fixing issues

### Visual Feedback
- Real-time drag over effects
- Processing indicators
- Success/error messages
- Smooth animations

---

## 📱 Browser Support

Drag & Drop works on:
- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

---

## 🎨 Customization

The drag & drop area uses CSS variables:
- `--primary`: Border and text color when active
- `--nude-light`: Background when hovering/dragging
- `--gray`: Default border color
- `--success`: Success message color

---

## 🚀 Example Workflow

```
1. Open PayEquity AI in browser
   ↓
2. Drag your salary data file (CSV, Excel, etc.)
   ↓
3. Drop it on the upload box
   ↓
4. Watch it highlight and process
   ↓
5. See success message with entry count
   ↓
6. Review data preview table
   ↓
7. Click "Run Bias Analysis"
   ↓
8. View results and download PDF report
```

---

## ✅ Benefits of Drag & Drop

- **Faster**: No need to click through file dialogs
- **Easier**: Just drag from desktop or folder
- **Visual**: Clear feedback shows what's happening
- **Intuitive**: Natural interaction pattern
- **Flexible**: Still works with traditional click method

---

## 🎉 Try It Now!

1. Open `index.html`
2. Find any CSV or JSON file on your computer
3. Drag it over the upload box
4. Watch the magic happen!

**No files ready?** Click "📊 Load Sample Data" to see the app in action instantly!

---

**Enjoy the seamless drag & drop experience!** 🎨📊
