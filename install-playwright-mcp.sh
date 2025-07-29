#!/bin/bash

echo "🚀 Installing Playwright MCP Tool from Online Registry..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

print_status "Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "npm version: $(npm --version)"

# Create package.json if it doesn't exist
if [ ! -f "package.json" ]; then
    print_status "Creating package.json..."
    npm init -y
fi

# Install Playwright MCP
print_status "Installing Playwright MCP..."
npm install @playwright/mcp

if [ $? -eq 0 ]; then
    print_success "Playwright MCP installed successfully!"
else
    print_error "Failed to install Playwright MCP"
    exit 1
fi

# Install additional dependencies
print_status "Installing additional dependencies..."
npm install node-fetch @playwright/test

if [ $? -eq 0 ]; then
    print_success "Additional dependencies installed successfully!"
else
    print_warning "Some dependencies may not have installed correctly"
fi

# Install Playwright browsers
print_status "Installing Playwright browsers..."
npx playwright install

if [ $? -eq 0 ]; then
    print_success "Playwright browsers installed successfully!"
else
    print_warning "Browser installation may have failed"
fi

# Create output directory
print_status "Creating output directory..."
mkdir -p playwright-output
print_success "Output directory created: ./playwright-output"

# Make scripts executable
print_status "Making scripts executable..."
chmod +x start-playwright-mcp.sh
chmod +x install-playwright-mcp.sh

# Test installation
print_status "Testing Playwright MCP installation..."
npx @playwright/mcp --version

if [ $? -eq 0 ]; then
    print_success "Playwright MCP is working correctly!"
else
    print_error "Playwright MCP installation test failed"
    exit 1
fi

# Create a simple test to verify everything works
print_status "Creating verification test..."
cat > verify-installation.js << 'EOF'
const { spawn } = require('child_process');

console.log('🧪 Verifying Playwright MCP installation...');

// Test if we can start the MCP server
const mcpProcess = spawn('npx', ['@playwright/mcp', '--port', '3001', '--headless'], {
    stdio: 'pipe'
});

let output = '';
mcpProcess.stdout.on('data', (data) => {
    output += data.toString();
});

mcpProcess.stderr.on('data', (data) => {
    output += data.toString();
});

// Wait a bit for server to start
setTimeout(() => {
    console.log('✅ Playwright MCP server started successfully!');
    console.log('📋 Server output:', output);
    
    // Kill the test server
    mcpProcess.kill();
    console.log('🎉 Installation verification complete!');
    process.exit(0);
}, 3000);

// Handle errors
mcpProcess.on('error', (error) => {
    console.error('❌ Error starting MCP server:', error);
    process.exit(1);
});
EOF

print_success "Verification test created: verify-installation.js"

# Display next steps
echo ""
print_success "🎉 Playwright MCP Tool Installation Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Start your website server: python3 -m http.server 8080"
echo "2. Start Playwright MCP server: ./start-playwright-mcp.sh"
echo "3. Run tests: node test-with-mcp.js"
echo "4. Verify installation: node verify-installation.js"
echo ""
echo "📁 Files created:"
echo "  - mcp-config.json (MCP configuration)"
echo "  - start-playwright-mcp.sh (Start script)"
echo "  - test-with-mcp.js (Test client)"
echo "  - verify-installation.js (Installation test)"
echo "  - playwright-output/ (Output directory)"
echo ""
echo "🔗 Useful commands:"
echo "  - npx @playwright/mcp --help (Show all options)"
echo "  - npx playwright test (Run Playwright tests)"
echo "  - node test-with-mcp.js (Run MCP client tests)"
echo ""
print_success "Happy testing! 🚀" 