#!/bin/bash

echo "🔧 Adding Playwright MCP Tool to MCP Clients..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Function to add MCP tool to Cursor
add_to_cursor() {
    print_status "Adding Playwright MCP tool to Cursor..."
    
    # Check if Cursor config directory exists
    CURSOR_CONFIG_DIR="$HOME/.cursor"
    if [ ! -d "$CURSOR_CONFIG_DIR" ]; then
        print_warning "Cursor config directory not found. Creating it..."
        mkdir -p "$CURSOR_CONFIG_DIR"
    fi
    
    # Create or update Cursor MCP config
    CURSOR_MCP_CONFIG="$CURSOR_CONFIG_DIR/mcp.json"
    
    cat > "$CURSOR_MCP_CONFIG" << 'EOF'
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp",
        "--port",
        "3000",
        "--headless",
        "--viewport-size",
        "1280,720",
        "--browser",
        "chromium",
        "--output-dir",
        "./playwright-output",
        "--save-session",
        "--save-trace"
      ],
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
EOF
    
    if [ $? -eq 0 ]; then
        print_success "Playwright MCP tool added to Cursor!"
        print_status "Config file: $CURSOR_MCP_CONFIG"
    else
        print_error "Failed to add Playwright MCP tool to Cursor"
    fi
}

# Function to add MCP tool to VS Code
add_to_vscode() {
    print_status "Adding Playwright MCP tool to VS Code..."
    
    # Check if VS Code config directory exists
    VSCODE_CONFIG_DIR="$HOME/.vscode"
    if [ ! -d "$VSCODE_CONFIG_DIR" ]; then
        print_warning "VS Code config directory not found. Creating it..."
        mkdir -p "$VSCODE_CONFIG_DIR"
    fi
    
    # Create or update VS Code MCP config
    VSCODE_MCP_CONFIG="$VSCODE_CONFIG_DIR/mcp.json"
    
    cat > "$VSCODE_MCP_CONFIG" << 'EOF'
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp",
        "--port",
        "3000",
        "--headless",
        "--viewport-size",
        "1280,720",
        "--browser",
        "chromium",
        "--output-dir",
        "./playwright-output",
        "--save-session",
        "--save-trace"
      ],
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
EOF
    
    if [ $? -eq 0 ]; then
        print_success "Playwright MCP tool added to VS Code!"
        print_status "Config file: $VSCODE_MCP_CONFIG"
    else
        print_error "Failed to add Playwright MCP tool to VS Code"
    fi
}

# Function to add MCP tool to Claude
add_to_claude() {
    print_status "Adding Playwright MCP tool to Claude..."
    
    # Create Claude MCP config in current directory
    CLAUDE_MCP_CONFIG="./claude-mcp.json"
    
    cat > "$CLAUDE_MCP_CONFIG" << 'EOF'
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp",
        "--port",
        "3000",
        "--headless",
        "--viewport-size",
        "1280,720",
        "--browser",
        "chromium",
        "--output-dir",
        "./playwright-output",
        "--save-session",
        "--save-trace"
      ],
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
EOF
    
    if [ $? -eq 0 ]; then
        print_success "Playwright MCP tool config created for Claude!"
        print_status "Config file: $CLAUDE_MCP_CONFIG"
        print_warning "You'll need to manually add this to your Claude MCP configuration"
    else
        print_error "Failed to create Claude MCP config"
    fi
}

# Function to create a universal MCP config
create_universal_config() {
    print_status "Creating universal MCP configuration..."
    
    UNIVERSAL_CONFIG="./universal-mcp-config.json"
    
    cat > "$UNIVERSAL_CONFIG" << 'EOF'
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp",
        "--port",
        "3000",
        "--headless",
        "--viewport-size",
        "1280,720",
        "--browser",
        "chromium",
        "--output-dir",
        "./playwright-output",
        "--save-session",
        "--save-trace"
      ],
      "env": {
        "NODE_ENV": "development"
      }
    }
  },
  "tools": {
    "playwright": {
      "name": "playwright",
      "description": "Playwright MCP server for browser automation and testing",
      "version": "1.0.0",
      "capabilities": [
        "browser_automation",
        "screenshot_capture",
        "page_interaction",
        "mobile_testing",
        "cross_browser_testing"
      ]
    }
  }
}
EOF
    
    if [ $? -eq 0 ]; then
        print_success "Universal MCP configuration created!"
        print_status "Config file: $UNIVERSAL_CONFIG"
    else
        print_error "Failed to create universal MCP config"
    fi
}

# Function to create installation instructions
create_instructions() {
    print_status "Creating installation instructions..."
    
    INSTRUCTIONS_FILE="./MCP_INSTALLATION_INSTRUCTIONS.md"
    
    cat > "$INSTRUCTIONS_FILE" << 'EOF'
# Playwright MCP Tool Installation Instructions

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
./install-playwright-mcp.sh
```

### 2. Add to MCP Clients
```bash
./add-mcp-tool.sh
```

## 📋 Client-Specific Instructions

### Cursor
1. The script automatically creates `~/.cursor/mcp.json`
2. Restart Cursor to load the new MCP tool
3. The Playwright MCP tool will be available in your AI assistant

### VS Code
1. The script creates `~/.vscode/mcp.json`
2. Install the MCP extension for VS Code
3. Restart VS Code to load the new MCP tool

### Claude
1. The script creates `./claude-mcp.json`
2. Copy this configuration to your Claude MCP settings
3. Restart Claude to load the new MCP tool

### Universal Configuration
- Use `./universal-mcp-config.json` for any MCP client
- Copy the configuration to your client's MCP settings

## 🧪 Testing the Installation

### 1. Start Your Website
```bash
python3 -m http.server 8080
```

### 2. Start Playwright MCP Server
```bash
./start-playwright-mcp.sh
```

### 3. Run Tests
```bash
node test-with-mcp.js
```

## 🔧 Available Commands

Once connected to an MCP client, you can use these commands:

- `browser/create` - Create a new browser instance
- `page/create` - Create a new page
- `page/navigate` - Navigate to a URL
- `page/click` - Click on an element
- `page/type` - Type text into an element
- `page/screenshot` - Take a screenshot
- `page/getText` - Get text from an element
- `page/setViewportSize` - Set viewport size
- `page/isVisible` - Check if element is visible

## 🎯 Example Usage

### Test Mobile Menu
```
1. Set viewport to mobile size (375x667)
2. Navigate to http://localhost:8080/
3. Check if hamburger menu is visible
4. Click hamburger menu
5. Verify menu opens
6. Test theme toggle in menu
7. Take screenshot
```

### Cross-Page Testing
```
1. Navigate to homepage
2. Take screenshot
3. Navigate to about page
4. Take screenshot
5. Navigate to product page
6. Take screenshot
7. Navigate to contact page
8. Take screenshot
```

## 🐛 Troubleshooting

### MCP Server Not Starting
```bash
# Check if port is in use
lsof -i :3000

# Kill existing process
lsof -ti:3000 | xargs kill -9

# Start server manually
npx @playwright/mcp --port 3000 --headless
```

### Browser Not Working
```bash
# Install browsers
npx playwright install

# Test installation
npx playwright install --dry-run
```

### Configuration Issues
```bash
# Verify MCP config
cat ~/.cursor/mcp.json

# Test MCP server
curl http://localhost:3000/health
```

## 📞 Support

- [Playwright MCP Documentation](https://playwright.dev/docs/mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP Tools Registry](https://mcp.tools/)

Happy testing! 🚀
EOF
    
    if [ $? -eq 0 ]; then
        print_success "Installation instructions created!"
        print_status "Instructions file: $INSTRUCTIONS_FILE"
    else
        print_error "Failed to create installation instructions"
    fi
}

# Main execution
main() {
    print_status "Starting MCP tool installation..."
    
    # Check if Playwright MCP is installed
    if ! npx @playwright/mcp --version &> /dev/null; then
        print_error "Playwright MCP is not installed. Please run ./install-playwright-mcp.sh first."
        exit 1
    fi
    
    print_success "Playwright MCP is installed!"
    
    # Add to various clients
    add_to_cursor
    add_to_vscode
    add_to_claude
    create_universal_config
    create_instructions
    
    echo ""
    print_success "🎉 MCP Tool Installation Complete!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Restart your MCP client (Cursor, VS Code, Claude)"
    echo "2. Start your website: python3 -m http.server 8080"
    echo "3. Start MCP server: ./start-playwright-mcp.sh"
    echo "4. Test the integration: node test-with-mcp.js"
    echo ""
    echo "📁 Configuration files created:"
    echo "  - ~/.cursor/mcp.json (Cursor config)"
    echo "  - ~/.vscode/mcp.json (VS Code config)"
    echo "  - ./claude-mcp.json (Claude config)"
    echo "  - ./universal-mcp-config.json (Universal config)"
    echo "  - ./MCP_INSTALLATION_INSTRUCTIONS.md (Instructions)"
    echo ""
    print_success "The Playwright MCP tool is now ready to use! 🚀"
}

# Run main function
main 