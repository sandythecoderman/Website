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
