@echo off
color 0A
title PayEquity AI - Diagnostic Tool
cls

echo ============================================
echo   PayEquity AI - Diagnostic Tool
echo ============================================
echo.

echo Checking your setup...
echo.

REM Check if files exist
echo [1/5] Checking files...
if exist "index.html" (
    echo    [OK] index.html found
) else (
    echo    [ERROR] index.html not found!
)

if exist "app.js" (
    echo    [OK] app.js found
) else (
    echo    [ERROR] app.js not found!
)

if exist "styles.css" (
    echo    [OK] styles.css found
) else (
    echo    [ERROR] styles.css not found!
)
echo.

REM Check for Python
echo [2/5] Checking for Python...
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo    [OK] Python is installed
    python --version
) else (
    echo    [INFO] Python not found (optional)
)
echo.

REM Check for Node.js
echo [3/5] Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo    [OK] Node.js is installed
    node --version
) else (
    echo    [INFO] Node.js not found (optional)
)
echo.

REM Check default browser
echo [4/5] Checking default browser...
reg query "HKEY_CURRENT_USER\Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http\UserChoice" /v ProgId >nul 2>&1
if %errorlevel% == 0 (
    echo    [OK] Default browser is set
) else (
    echo    [INFO] Could not detect default browser
)
echo.

REM Test opening HTML file
echo [5/5] Testing file access...
if exist "test-simple.html" (
    echo    [OK] Test file found
    echo.
    echo ============================================
    echo   Diagnostic Complete!
    echo ============================================
    echo.
    echo NEXT STEPS:
    echo.
    echo 1. Press any key to open the test page
    echo 2. Look for a GREEN or RED message
    echo 3. Follow the instructions shown
    echo.
    echo If you see GREEN: JavaScript is working!
    echo If you see RED: Follow the instructions to enable JavaScript
    echo.
    pause
    start test-simple.html
) else (
    echo    [ERROR] test-simple.html not found!
    echo.
    echo Please make sure all files are in the same folder.
    echo.
    pause
)

echo.
echo ============================================
echo.
echo Would you like to:
echo   1. Open the main application (index.html)
echo   2. Start a local web server
echo   3. Exit
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    start index.html
) else if "%choice%"=="2" (
    start start-server.bat
) else (
    exit
)
