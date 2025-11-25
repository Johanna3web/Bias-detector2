@echo off
color 0D
title React Bias Detection Analyzer - Setup

echo ========================================
echo   React Bias Detection Analyzer
echo ========================================
echo.
echo Checking Node.js installation...
echo.

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js found!
node --version
echo.

echo Checking if dependencies are installed...
if not exist "node_modules" (
    echo.
    echo Installing dependencies...
    echo This may take a few minutes...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed!
)

echo.
echo ========================================
echo   Starting Development Server...
echo ========================================
echo.
echo The app will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
