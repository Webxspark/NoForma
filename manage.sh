#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# PID file locations
PID_DIR=".pids"
LANDING_PID_FILE="$PID_DIR/landing.pid"
BACKEND_PID_FILE="$PID_DIR/backend.pid"
DASHBOARD_PID_FILE="$PID_DIR/dashboard.pid"

# Create PID directory if it doesn't exist
mkdir -p "$PID_DIR"

# Function to check if a process is running
is_running() {
    local pid_file=$1
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p "$pid" > /dev/null 2>&1; then
            return 0
        else
            rm -f "$pid_file"
            return 1
        fi
    fi
    return 1
}

# Function to kill a process by PID file
kill_process() {
    local pid_file=$1
    local service_name=$2
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p "$pid" > /dev/null 2>&1; then
            echo -e "${YELLOW}🛑 Stopping $service_name (PID: $pid)...${NC}"
            kill "$pid"
            sleep 2
            if ps -p "$pid" > /dev/null 2>&1; then
                echo -e "${RED}Force killing $service_name...${NC}"
                kill -9 "$pid"
            fi
        fi
        rm -f "$pid_file"
    fi
}

# Function to start React landing server
start_landing() {
    if is_running "$LANDING_PID_FILE"; then
        echo -e "${YELLOW}⚠️  React landing server is already running${NC}"
        return 1
    fi

    echo -e "${GREEN}⚛️  Starting React landing page server...${NC}"
    cd "landing"
    if [ ! -f "package.json" ]; then
        echo -e "${RED}❌ package.json not found in landing directory${NC}"
        cd ..
        return 1
    fi

    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📦 Installing npm dependencies...${NC}"
        npm install
    fi

    npm run dev > /dev/null 2>&1 &
    local pid=$!
    echo "$pid" > "../$LANDING_PID_FILE"
    cd ..
    echo -e "${GREEN}✅ React landing server started (PID: $pid)${NC}"
    sleep 2
}

# Function to start Flask backend
start_backend() {
    if is_running "$BACKEND_PID_FILE"; then
        echo -e "${YELLOW}⚠️  Flask backend server is already running${NC}"
        return 1
    fi

    echo -e "${GREEN}📡 Starting Flask backend server...${NC}"
    cd "backend"
    if [ ! -f "app.py" ]; then
        echo -e "${RED}❌ Flask app.py not found in backend directory${NC}"
        cd ..
        return 1
    fi

    if [ -f "requirements.txt" ]; then
        pip install -r requirements.txt > /dev/null 2>&1
    fi

    python app.py > /dev/null 2>&1 &
    local pid=$!
    echo "$pid" > "../$BACKEND_PID_FILE"
    cd ..
    echo -e "${GREEN}✅ Flask backend server started (PID: $pid)${NC}"
    sleep 2
}

# Function to start Laravel dashboard
start_dashboard() {
    if is_running "$DASHBOARD_PID_FILE"; then
        echo -e "${YELLOW}⚠️  Laravel dashboard server is already running${NC}"
        return 1
    fi

    echo -e "${GREEN}🖥️  Starting Laravel dashboard server...${NC}"
    cd "dashboard"
    if [ ! -f "composer.json" ]; then
        echo -e "${RED}❌ composer.json not found in dashboard directory${NC}"
        cd ..
        return 1
    fi

    if [ ! -d "vendor" ]; then
        echo -e "${YELLOW}📦 Installing Composer dependencies...${NC}"
        composer install > /dev/null 2>&1
    fi

    composer run dev > /dev/null 2>&1 &
    local pid=$!
    echo "$pid" > "../$DASHBOARD_PID_FILE"
    cd ..
    echo -e "${GREEN}✅ Laravel dashboard server started (PID: $pid)${NC}"
    sleep 2
}

# Function to stop servers
stop_landing() {
    kill_process "$LANDING_PID_FILE" "React landing server"
}

stop_backend() {
    kill_process "$BACKEND_PID_FILE" "Flask backend server"
}

stop_dashboard() {
    kill_process "$DASHBOARD_PID_FILE" "Laravel dashboard server"
}

# Function to restart servers
restart_landing() {
    stop_landing
    sleep 1
    start_landing
}

restart_backend() {
    stop_backend
    sleep 1
    start_backend
}

restart_dashboard() {
    stop_dashboard
    sleep 1
    start_dashboard
}

# Function to show server status
status() {
    echo -e "${BLUE}📊 Server Status:${NC}"
    echo -e "   • React Landing (port 5173): $(is_running "$LANDING_PID_FILE" && echo -e "${GREEN}RUNNING${NC}" || echo -e "${RED}STOPPED${NC}")"
    echo -e "   • Flask Backend (port 5000): $(is_running "$BACKEND_PID_FILE" && echo -e "${GREEN}RUNNING${NC}" || echo -e "${RED}STOPPED${NC}")"
    echo -e "   • Laravel Dashboard (port 8000): $(is_running "$DASHBOARD_PID_FILE" && echo -e "${GREEN}RUNNING${NC}" || echo -e "${RED}STOPPED${NC}")"

    echo -e "\n${BLUE}📍 Server URLs:${NC}"
    echo -e "   • Landing (React): ${YELLOW}http://localhost:5173${NC}"
    echo -e "   • Backend (Flask): ${YELLOW}http://localhost:5000${NC}"
    echo -e "   • Dashboard (Laravel): ${YELLOW}http://localhost:8000${NC}"
}

# Function to start all servers
start_all() {
    start_landing
    start_backend
    start_dashboard
    echo -e "${GREEN}✅ All servers started!${NC}"
}

# Function to stop all servers
stop_all() {
    stop_landing
    stop_backend
    stop_dashboard
    echo -e "${GREEN}✅ All servers stopped!${NC}"
}

# Function to restart all servers
restart_all() {
    stop_all
    sleep 2
    start_all
}

# Function to show help
show_help() {
    echo -e "${BLUE}🚀 Development Server Manager${NC}"
    echo -e "\nUsage: $0 [COMMAND] [SERVICE]"
    echo -e "\nCommands:"
    echo -e "  ${GREEN}start${NC}     Start server(s)"
    echo -e "  ${YELLOW}stop${NC}      Stop server(s)"
    echo -e "  ${BLUE}restart${NC}   Restart server(s)"
    echo -e "  ${BLUE}status${NC}    Show server status"
    echo -e "  ${BLUE}help${NC}      Show this help message"
    echo -e "\nServices:"
    echo -e "  ${GREEN}landing${NC}   React landing page server"
    echo -e "  ${GREEN}backend${NC}   Flask backend server"
    echo -e "  ${GREEN}dashboard${NC} Laravel dashboard server"
    echo -e "  ${GREEN}all${NC}       All servers (default)"
    echo -e "\nExamples:"
    echo -e "  $0 start landing          # Start only React server"
    echo -e "  $0 restart backend        # Restart only Flask server"
    echo -e "  $0 stop dashboard         # Stop only Laravel server"
    echo -e "  $0 status                 # Show status of all servers"
    echo -e "  $0 start all              # Start all servers"
}

# Main script logic
case "$1" in
    "start")
        case "$2" in
            "landing") start_landing ;;
            "backend") start_backend ;;
            "dashboard") start_dashboard ;;
            "all"|"") start_all ;;
            *) echo -e "${RED}❌ Unknown service: $2${NC}"; show_help; exit 1 ;;
        esac
        ;;
    "stop")
        case "$2" in
            "landing") stop_landing ;;
            "backend") stop_backend ;;
            "dashboard") stop_dashboard ;;
            "all"|"") stop_all ;;
            *) echo -e "${RED}❌ Unknown service: $2${NC}"; show_help; exit 1 ;;
        esac
        ;;
    "restart")
        case "$2" in
            "landing") restart_landing ;;
            "backend") restart_backend ;;
            "dashboard") restart_dashboard ;;
            "all"|"") restart_all ;;
            *) echo -e "${RED}❌ Unknown service: $2${NC}"; show_help; exit 1 ;;
        esac
        ;;
    "status"|"")
        status
        ;;
    "help"|"--help"|"-h")
        show_help
        ;;
    *)
        echo -e "${RED}❌ Unknown command: $1${NC}"
        show_help
        exit 1
        ;;
esac
