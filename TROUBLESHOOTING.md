# Troubleshooting Guide

## "Script is Disabled" Error

This error means JavaScript is either disabled in your browser or being blocked. Here's how to fix it:

### Quick Test
1. Open `test-simple.html` in your browser
2. If you see a red error box, JavaScript is disabled
3. If you see a green success box, JavaScript is working

---

## Solution 1: Enable JavaScript in Your Browser

### Google Chrome
1. Click the three dots (⋮) in the top right corner
2. Go to **Settings**
3. Click **Privacy and security** (left sidebar)
4. Click **Site settings**
5. Scroll down and click **JavaScript**
6. Select **"Sites can use Javascript"**
7. Refresh the page

### Microsoft Edge
1. Click the three dots (...) in the top right corner
2. Go to **Settings**
3. Click **Cookies and site permissions** (left sidebar)
4. Click **JavaScript**
5. Turn on **"Allowed (recommended)"**
6. Refresh the page

### Mozilla Firefox
1. Type `about:config` in the address bar and press Enter
2. Click **"Accept the Risk and Continue"**
3. Search for `javascript.enabled`
4. If it's set to `false`, double-click to change it to `true`
5. Refresh the page

### Safari (Mac)
1. Click **Safari** in the menu bar
2. Select **Preferences**
3. Click the **Security** tab
4. Check the box for **"Enable JavaScript"**
5. Close preferences and refresh the page

---

## Solution 2: Check Browser Extensions

Some browser extensions block JavaScript:

1. Try opening the page in **Incognito/Private mode**:
   - Chrome: Ctrl+Shift+N (Windows) or Cmd+Shift+N (Mac)
   - Firefox: Ctrl+Shift+P (Windows) or Cmd+Shift+P (Mac)
   - Edge: Ctrl+Shift+N (Windows)

2. If it works in incognito mode, disable extensions one by one to find the culprit

Common blocking extensions:
- NoScript
- uBlock Origin (in strict mode)
- Privacy Badger
- Ad blockers

---

## Solution 3: Use a Local Web Server

If you're opening files directly (file:// protocol), some features might be restricted.

### Option A: Use the Batch File (Windows)
1. Double-click `start-server.bat`
2. Open your browser and go to `http://localhost:8000`

### Option B: Python (if installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open: `http://localhost:8000`

### Option C: Node.js (if installed)
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```
Then open: `http://localhost:8000`

### Option D: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## Solution 4: Check File Paths

Make sure all files are in the same folder:
```
your-folder/
  ├── index.html
  ├── app.js
  ├── styles.css
  ├── test-simple.html
  └── README.md
```

---

## Solution 5: Browser Console Check

1. Open the browser console:
   - Chrome/Edge: Press F12 or Ctrl+Shift+J
   - Firefox: Press F12 or Ctrl+Shift+K
   - Safari: Cmd+Option+C

2. Look for error messages in red

3. Common errors and fixes:

   **"Failed to load resource"**
   - Check that app.js and styles.css are in the same folder
   - Check file names match exactly (case-sensitive)

   **"CORS policy" error**
   - Use a local web server (see Solution 3)

   **"Uncaught ReferenceError"**
   - Make sure app.js is loading after the HTML elements
   - Check that script tag is at the bottom of body

---

## Solution 6: Try a Different Browser

If nothing works, try:
1. Google Chrome (recommended)
2. Microsoft Edge
3. Mozilla Firefox
4. Safari (Mac)

Download the latest version of any browser above.

---

## Still Not Working?

### Verify Basic Setup:

1. **Test JavaScript is enabled:**
   - Open `test-simple.html`
   - You should see a green success message

2. **Check file structure:**
   - All files in the same folder
   - No special characters in folder name
   - Not in a restricted location (like Program Files)

3. **Try the sample data:**
   - Open `index.html`
   - Click "📊 Load Sample Data"
   - Click "Run Bias Analysis"

4. **Check browser version:**
   - Use Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Alternative: Online Version

If local setup fails, you can:
1. Upload files to a web hosting service
2. Use GitHub Pages
3. Use CodePen or JSFiddle

---

## Error Messages Reference

| Error Message | Solution |
|--------------|----------|
| "Script is disabled" | Enable JavaScript (Solution 1) |
| "Failed to load resource" | Check file paths (Solution 4) |
| "CORS policy" | Use local server (Solution 3) |
| "Papa is not defined" | Check internet connection for CDN libraries |
| "Chart is not defined" | Check internet connection for CDN libraries |
| "Cannot read property" | Ensure data is loaded before analysis |

---

## Need More Help?

1. Check the browser console (F12) for specific error messages
2. Try `test-simple.html` to verify JavaScript works
3. Make sure you have an internet connection (for external libraries)
4. Try opening in a different browser
5. Restart your browser and try again

---

## Quick Checklist

- [ ] JavaScript is enabled in browser settings
- [ ] No blocking browser extensions
- [ ] All files are in the same folder
- [ ] Using a modern browser (latest version)
- [ ] Internet connection available (for CDN libraries)
- [ ] `test-simple.html` shows green success message
- [ ] Browser console (F12) shows no errors

If all boxes are checked and it still doesn't work, try using a local web server (Solution 3).
