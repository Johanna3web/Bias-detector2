# Solution: "Script is Disabled" Error

## Immediate Solutions (Try These First)

### Solution 1: Open test-simple.html
1. Open the file `test-simple.html` in your browser
2. This will tell you if JavaScript is working or not
3. Follow the instructions shown on that page

### Solution 2: Enable JavaScript
The most common cause is JavaScript being disabled in your browser.

**Quick Fix for Chrome/Edge:**
1. Look at the address bar
2. Click the icon on the left (🔒 or ⓘ)
3. Look for "JavaScript" setting
4. Make sure it's set to "Allow"
5. Refresh the page

### Solution 3: Check Your Browser
Make sure you're using a modern browser:
- ✅ Chrome 90 or newer
- ✅ Edge 90 or newer  
- ✅ Firefox 88 or newer
- ✅ Safari 14 or newer

Update your browser if needed.

---

## Detailed Steps by Browser

### Google Chrome / Microsoft Edge

**Method 1: Site Settings (Fastest)**
1. Click the lock icon (🔒) or info icon (ⓘ) in the address bar
2. Click "Site settings"
3. Find "JavaScript" 
4. Select "Allow"
5. Refresh the page (F5)

**Method 2: Global Settings**
1. Click the three dots menu (⋮ or ...)
2. Go to Settings
3. Click "Privacy and security" (left sidebar)
4. Click "Site settings"
5. Scroll down and click "JavaScript"
6. Select "Sites can use Javascript"
7. Refresh the page

### Mozilla Firefox

**Method 1: about:config**
1. Type `about:config` in the address bar
2. Click "Accept the Risk and Continue"
3. Search for: `javascript.enabled`
4. Make sure it's set to `true`
5. If it's `false`, double-click to change it
6. Refresh the page

**Method 2: Check Add-ons**
1. Type `about:addons` in the address bar
2. Look for extensions like NoScript
3. Disable or configure them to allow JavaScript
4. Refresh the page

### Safari (Mac)

1. Click "Safari" in the menu bar (top left)
2. Select "Preferences" or "Settings"
3. Click the "Security" tab
4. Check the box: "Enable JavaScript"
5. Close the window
6. Refresh the page

---

## Still Getting the Error?

### Check for Blocking Extensions

Some extensions block JavaScript:
- NoScript
- uBlock Origin (strict mode)
- Privacy Badger
- ScriptSafe
- Ghostery

**Test in Incognito/Private Mode:**
- Chrome/Edge: Press `Ctrl+Shift+N` (Windows) or `Cmd+Shift+N` (Mac)
- Firefox: Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
- Safari: File → New Private Window

If it works in incognito mode, an extension is blocking it.

---

## Alternative: Use a Local Server

If you're opening files directly (file:///), some features might be restricted.

### Windows - Easy Method
1. Double-click `start-server.bat`
2. Wait for it to start
3. Open your browser
4. Go to: `http://localhost:8000`

### Manual Method (Any OS)

**If you have Python installed:**
```bash
# Open Command Prompt or Terminal in the project folder
# Then run:

python -m http.server 8000
```

**If you have Node.js installed:**
```bash
# Install http-server (one time only)
npm install -g http-server

# Run the server
http-server -p 8000
```

Then open your browser and go to: `http://localhost:8000`

---

## Verify It's Working

### Test 1: Simple Test Page
1. Open `test-simple.html`
2. You should see a GREEN box saying "JavaScript is Working!"
3. If you see a RED box, JavaScript is disabled

### Test 2: Browser Console
1. Press `F12` on your keyboard
2. Click the "Console" tab
3. Type: `alert('test')`
4. Press Enter
5. You should see a popup
6. If you see an error, JavaScript is disabled

### Test 3: Sample Data
1. Open `index.html`
2. Look for the "📊 Load Sample Data" button
3. Click it
4. If data appears, JavaScript is working!

---

## Common Error Messages

| What You See | What It Means | Solution |
|--------------|---------------|----------|
| "Script is disabled" | JavaScript is turned off | Enable JavaScript (see above) |
| Blank page | JavaScript might be blocked | Check browser console (F12) |
| "Failed to load resource" | Files not found | Make sure all files are in same folder |
| "Papa is not defined" | No internet connection | Connect to internet or use local server |
| Nothing happens when clicking buttons | JavaScript not loading | Check browser console for errors |

---

## Quick Checklist

Before asking for help, verify:

- [ ] I opened `test-simple.html` and saw what it says
- [ ] JavaScript is enabled in my browser settings
- [ ] I'm using a modern browser (Chrome, Edge, Firefox, Safari)
- [ ] I tried in incognito/private mode
- [ ] All files are in the same folder
- [ ] I have an internet connection
- [ ] I checked the browser console (F12) for errors
- [ ] I tried a different browser

---

## Last Resort

If nothing works:

1. **Try a different computer** - This will tell you if it's your system
2. **Try a different browser** - Download Chrome if you haven't
3. **Use online version** - Upload files to a web host
4. **Contact support** - Share the error from browser console (F12)

---

## Success!

Once JavaScript is working:
1. Open `index.html`
2. Click "📊 Load Sample Data"
3. Click "Run Bias Analysis"
4. You should see charts and results!

---

## Need More Help?

1. Open `test-simple.html` - tells you exactly what's wrong
2. Check `TROUBLESHOOTING.md` - detailed solutions
3. Press F12 and check Console tab - shows specific errors
4. Try `start-server.bat` - runs a local web server

**Most Common Fix:** Enable JavaScript in browser settings (see detailed steps above)
