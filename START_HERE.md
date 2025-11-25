# 🚀 START HERE - PayEquity AI Setup Guide

## Getting the "Script is Disabled" Error? Follow These Steps:

---

## ⚡ FASTEST SOLUTION (30 seconds)

### Step 1: Run the Diagnostic Tool
**Windows Users:**
1. Double-click `diagnose.bat`
2. Follow the on-screen instructions
3. It will automatically test everything and open the test page

**All Users:**
1. Open `test-simple.html` in your browser
2. Look at the message:
   - **GREEN** = JavaScript works! Go to Step 2
   - **RED** = JavaScript is disabled, follow the instructions shown

### Step 2: Open the Application
1. Open `index.html` in your browser
2. Click "📊 Load Sample Data" button
3. Click "Run Bias Analysis"
4. Done! 🎉

---

## 🔧 If You See "Script is Disabled"

### Quick Fix (Works 90% of the time)

**Chrome / Edge:**
1. Click the lock icon (🔒) in the address bar
2. Click "Site settings"
3. Find "JavaScript" and set to "Allow"
4. Refresh the page (F5)

**Firefox:**
1. Type `about:config` in address bar
2. Search for `javascript.enabled`
3. Make sure it's `true`
4. Refresh the page

**Safari:**
1. Safari menu → Preferences → Security
2. Check "Enable JavaScript"
3. Refresh the page

---

## 📁 File Structure Check

Make sure all these files are in the SAME folder:

```
your-folder/
  ├── index.html          ← Main application
  ├── app.js              ← JavaScript code
  ├── styles.css          ← Styling
  ├── test-simple.html    ← Test page
  ├── diagnose.bat        ← Diagnostic tool (Windows)
  ├── start-server.bat    ← Server starter (Windows)
  ├── START_HERE.md       ← This file
  ├── SOLUTION.md         ← Detailed solutions
  └── TROUBLESHOOTING.md  ← Advanced troubleshooting
```

---

## 🌐 Alternative: Use a Web Server

If opening files directly doesn't work, use a local server:

### Option 1: Batch File (Windows - Easiest)
```
Double-click: start-server.bat
Then open: http://localhost:8000
```

### Option 2: Python (Any OS)
```bash
python -m http.server 8000
# Then open: http://localhost:8000
```

### Option 3: VS Code
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## ✅ Verify It's Working

### Test 1: Simple Test
```
Open: test-simple.html
Expected: Green box saying "JavaScript is Working!"
```

### Test 2: Console Test
```
1. Press F12
2. Click "Console" tab
3. Type: 2 + 2
4. Press Enter
5. Should show: 4
```

### Test 3: Sample Data
```
1. Open index.html
2. Click "📊 Load Sample Data"
3. Should see a table with employee data
```

---

## 🎯 Common Issues & Solutions

| Problem | Solution |
|---------|----------|
| **"Script is disabled"** | Enable JavaScript in browser settings |
| **Blank page** | Check browser console (F12) for errors |
| **Buttons don't work** | JavaScript is blocked - check extensions |
| **"Papa is not defined"** | No internet - use local server |
| **"Failed to load"** | Files not in same folder |

---

## 🆘 Still Not Working?

### Try These in Order:

1. **Run diagnostic tool**
   ```
   Double-click: diagnose.bat (Windows)
   Or open: test-simple.html (All OS)
   ```

2. **Try incognito mode**
   ```
   Chrome/Edge: Ctrl+Shift+N
   Firefox: Ctrl+Shift+P
   ```
   If it works here, an extension is blocking it.

3. **Try different browser**
   - Download Google Chrome (recommended)
   - Try Microsoft Edge
   - Try Firefox

4. **Use local server**
   ```
   Double-click: start-server.bat
   Open: http://localhost:8000
   ```

5. **Check detailed guides**
   - Read: SOLUTION.md (step-by-step fixes)
   - Read: TROUBLESHOOTING.md (advanced help)

---

## 📚 Documentation Files

- **START_HERE.md** ← You are here! Quick start guide
- **SOLUTION.md** - Detailed solutions for "script disabled" error
- **TROUBLESHOOTING.md** - Advanced troubleshooting
- **QUICKSTART.md** - How to use the application
- **README.md** - Full documentation

---

## 🎉 Success Checklist

Once everything works, you should be able to:

- [ ] Open `test-simple.html` and see GREEN message
- [ ] Open `index.html` without errors
- [ ] Click "📊 Load Sample Data" and see data
- [ ] Click "Run Bias Analysis" and see charts
- [ ] See the bias score and recommendations

---

## 💡 Pro Tips

1. **Always test first**: Open `test-simple.html` before the main app
2. **Use sample data**: Click "📊 Load Sample Data" to test quickly
3. **Check console**: Press F12 to see detailed error messages
4. **Use local server**: More reliable than opening files directly
5. **Keep files together**: Don't move files to different folders

---

## 🔗 Quick Links

- **Test JavaScript**: Open `test-simple.html`
- **Run Diagnostics**: Double-click `diagnose.bat` (Windows)
- **Start Server**: Double-click `start-server.bat` (Windows)
- **Main App**: Open `index.html`
- **Get Help**: Read `SOLUTION.md`

---

## 📞 Need Help?

1. Run `diagnose.bat` (Windows) or open `test-simple.html`
2. Check the browser console (F12) for error messages
3. Read `SOLUTION.md` for detailed fixes
4. Try a different browser
5. Use a local web server

---

## 🚀 Ready to Start?

### Quick Start (3 steps):
1. **Test**: Open `test-simple.html` (should see green)
2. **Load**: Open `index.html` and click "📊 Load Sample Data"
3. **Analyze**: Click "Run Bias Analysis" and view results!

### Having Issues?
1. **Windows**: Double-click `diagnose.bat`
2. **All OS**: Read `SOLUTION.md`

---

**Remember**: The most common issue is JavaScript being disabled in browser settings. The test page (`test-simple.html`) will tell you exactly what's wrong!

Good luck! 🎯
