@echo off
REM Quick Start Script for Darsan Portfolio (Windows)

echo.
echo ========================================
echo   Darsan Portfolio - Quick Start
echo ========================================
echo.

REM Check Prerequisites
echo Checking prerequisites...

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed. Please install Node.js 16+
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION%

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION%

REM Check .NET
where dotnet >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: .NET SDK is not installed. Please install .NET 8 SDK
    exit /b 1
)
for /f "tokens=*" %%i in ('dotnet --version') do set DOTNET_VERSION=%%i
echo [OK] .NET %DOTNET_VERSION%

echo.
echo Cleaning up old database...
cd backend
if exist DarsanPortfolio.db (
    del DarsanPortfolio.db
    echo [OK] Database cleaned
)
cd ..

echo.
echo Starting services...
echo.

REM Start Backend
echo Starting Backend on http://localhost:5000
cd backend
echo Installing dependencies...
call npm install >nul 2>&1
echo Running backend...
start cmd /k "dotnet run --urls http://localhost:5000"
cd ..

REM Small delay for backend to start
timeout /t 3 /nobreak >nul

REM Start Frontend
echo Starting Frontend on http://localhost:3000
cd frontend
echo Installing dependencies...
call npm install >nul 2>&1
echo Running frontend...
start cmd /k "npm run dev"
cd ..

echo.
echo ========================================
echo   Application Started!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo Swagger:  http://localhost:5000/swagger
echo.
echo Admin Credentials:
echo   Email:    admin@darsan.dev
echo   Password: admin123
echo.
echo Close the command windows to stop
echo.
