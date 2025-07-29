#!/bin/bash

echo "🚀 Starting Playwright MCP Server..."

# Check if port 3000 is available
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 3000 is already in use. Stopping existing process..."
    lsof -ti:3000 | xargs kill -9
fi

# Start the Playwright MCP server
echo "📱 Starting Playwright MCP server on port 3000..."
npx @playwright/mcp \
    --port 3000 \
    --headless \
    --viewport-size 1280,720 \
    --browser chromium \
    --output-dir ./playwright-output \
    --save-session \
    --save-trace

echo "✅ Playwright MCP server is running!"
echo "🌐 Server URL: http://localhost:3000"
echo "📁 Output directory: ./playwright-output"
echo ""
echo "To use with MCP clients, connect to:"
echo "  - Host: localhost"
echo "  - Port: 3000"
echo "  - Protocol: SSE (Server-Sent Events)" 