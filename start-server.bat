@echo off
echo ========================================
echo   PayEquity AI - Local Server Starter
echo ========================================
echo.
echo Starting local web server...
echo.
echo Once started, open your browser and go to:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

REM Try Python 3 first
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python 3...
    python -m http.server 8000
    goto :end
)

REM Try Python 2
python2 --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python 2...
    python2 -m SimpleHTTPServer 8000
    goto :end
)

REM Try Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Node.js...
    echo Please install http-server: npm install -g http-server
    echo Then run: http-server -p 8000
    goto :end
)

echo ERROR: No suitable server found!
echo.
echo Please install one of the following:
echo   - Python 3: https://www.python.org/downloads/
echo   - Node.js: https://nodejs.org/
echo.
echo Or simply open index.html directly in your browser.
echo.
pause

:end
