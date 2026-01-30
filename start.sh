#!/bin/bash
# Quick Start Script for Darsan Portfolio

echo "🚀 Starting Darsan Portfolio Application..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0
    else
        return 1
    fi
}

# Check Prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js 16+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed. Please install npm${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v)${NC}"

# Check .NET
if ! command -v dotnet &> /dev/null; then
    echo -e "${RED}.NET SDK is not installed. Please install .NET 8 SDK${NC}"
    exit 1
fi
echo -e "${GREEN}✓ .NET $(dotnet --version)${NC}"

echo ""
echo -e "${YELLOW}Starting services...${NC}"

# Check if ports are available
if check_port 3000; then
    echo -e "${YELLOW}Port 3000 is already in use. Trying 3001...${NC}"
    FRONTEND_PORT=3001
else
    FRONTEND_PORT=3000
fi

if check_port 5000; then
    echo -e "${YELLOW}Port 5000 is already in use. Trying 5001...${NC}"
    BACKEND_PORT=5001
else
    BACKEND_PORT=5000
fi

# Start Frontend
echo -e "${YELLOW}Starting Frontend on port $FRONTEND_PORT...${NC}"
cd frontend
npm install > /dev/null 2>&1
npm run dev -- --port $FRONTEND_PORT &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
echo "  → http://localhost:$FRONTEND_PORT"

cd ..

# Start Backend
echo -e "${YELLOW}Starting Backend on port $BACKEND_PORT...${NC}"
cd backend
dotnet restore > /dev/null 2>&1
dotnet run --urls "https://localhost:$BACKEND_PORT;http://localhost:$BACKEND_PORT" &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
echo "  → http://localhost:$BACKEND_PORT"
echo "  → Swagger: http://localhost:$BACKEND_PORT/swagger"

cd ..

echo ""
echo -e "${GREEN}✓ Application is running!${NC}"
echo ""
echo "Frontend: http://localhost:$FRONTEND_PORT"
echo "Backend:  http://localhost:$BACKEND_PORT"
echo ""
echo "Admin Credentials:"
echo "  Email:    admin@darsan.dev"
echo "  Password: admin123"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop${NC}"

# Handle Ctrl+C
trap "
echo ''
echo -e '${YELLOW}Stopping services...${NC}'
kill $FRONTEND_PID 2>/dev/null
kill $BACKEND_PID 2>/dev/null
echo -e '${GREEN}✓ Stopped${NC}'
exit 0
" SIGINT

wait
