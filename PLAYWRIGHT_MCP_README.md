# Playwright MCP (Model Context Protocol) Setup

This guide explains how to set up and use the Playwright MCP server for automated browser testing.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install @playwright/mcp node-fetch
```

### 2. Start the Playwright MCP Server
```bash
# Option 1: Use the provided script
./start-playwright-mcp.sh

# Option 2: Run directly
npx @playwright/mcp --port 3000 --headless --viewport-size 1280,720 --browser chromium
```

### 3. Run Tests
```bash
# Test with MCP client
node test-with-mcp.js

# Test with Playwright directly
npx playwright test test_menu_functionality.js
```

## 📋 Available Commands

### Playwright MCP Server Options
```bash
npx @playwright/mcp [options]

Options:
  --port <port>                Port to listen on (default: 3000)
  --host <host>                Host to bind to (default: localhost)
  --browser <browser>          Browser to use: chrome, firefox, webkit, msedge
  --headless                   Run in headless mode
  --viewport-size <size>       Viewport size (e.g., "1280,720")
  --device <device>            Device to emulate (e.g., "iPhone 15")
  --output-dir <path>          Directory for output files
  --save-session               Save browser session
  --save-trace                 Save Playwright trace
  --user-agent <ua>            Custom user agent string
  --proxy-server <proxy>       Proxy server URL
  --ignore-https-errors        Ignore HTTPS errors
```

### Example Configurations

#### Mobile Testing
```bash
npx @playwright/mcp \
  --port 3000 \
  --device "iPhone 15" \
  --headless \
  --save-session
```

#### Desktop Testing
```bash
npx @playwright/mcp \
  --port 3000 \
  --browser chromium \
  --viewport-size 1920,1080 \
  --headless
```

#### Debug Mode (Non-headless)
```bash
npx @playwright/mcp \
  --port 3000 \
  --browser chromium \
  --viewport-size 1280,720
```

## 🧪 Testing Your Website

### 1. Start Your Website Server
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

## 📁 File Structure

```
website/
├── start-playwright-mcp.sh          # Script to start MCP server
├── test-with-mcp.js                 # MCP client test script
├── test_menu_functionality.js       # Playwright test file
├── playwright.config.js             # Playwright configuration
├── mcp-playwright-config.json       # MCP server configuration
├── simple_menu_test.js              # Simple Puppeteer test
└── playwright-output/               # Output directory (created automatically)
```

## 🔧 MCP Client API

The `PlaywrightMCPClient` class provides these methods:

```javascript
const client = new PlaywrightMCPClient(3000);

// Browser operations
await client.createBrowser();
await client.closeBrowser();

// Page operations
await client.createPage();
await client.navigateTo('http://localhost:8080/');

// Interaction
await client.click('.hamburger');
await client.type('#email', 'test@example.com');
await client.getText('.hero-title');

// Screenshots
await client.takeScreenshot('./screenshot.png');

// Custom requests
await client.sendRequest('page/setViewportSize', { width: 375, height: 667 });
await client.sendRequest('page/isVisible', { selector: '.hamburger' });
```

## 🎯 Testing Scenarios

### Mobile Menu Testing
```javascript
// Set mobile viewport
await client.sendRequest('page/setViewportSize', { width: 375, height: 667 });

// Test hamburger menu
const hamburgerVisible = await client.sendRequest('page/isVisible', { selector: '.hamburger' });
if (hamburgerVisible.result) {
    await client.click('.hamburger');
    await client.takeScreenshot('./menu-open.png');
}
```

### Theme Toggle Testing
```javascript
// Test theme toggle in mobile menu
await client.click('.mobile-theme-toggle .theme-toggle');
await client.takeScreenshot('./theme-changed.png');
```

### Cross-Page Testing
```javascript
const pages = ['/', '/about.html', '/product.html', '/contact.html'];
for (const page of pages) {
    await client.navigateTo(`http://localhost:8080${page}`);
    await client.takeScreenshot(`./${page.replace('/', '')}.png`);
}
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npx @playwright/mcp --port 3001
```

### Browser Not Starting
```bash
# Install browser binaries
npx playwright install

# Check browser installation
npx playwright install --dry-run
```

### MCP Server Not Responding
```bash
# Check if server is running
curl http://localhost:3000/health

# Restart server
./start-playwright-mcp.sh
```

## 📊 Output Files

The MCP server creates these files in the output directory:

- `session.json` - Browser session data (if --save-session is used)
- `trace.zip` - Playwright trace file (if --save-trace is used)
- Screenshots from test scripts

## 🔗 Useful Links

- [Playwright MCP Documentation](https://playwright.dev/docs/mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Playwright Testing](https://playwright.dev/docs/intro)

## 🎉 Success!

Once everything is set up, you can:

1. ✅ Automate browser testing with MCP
2. ✅ Test mobile menu functionality
3. ✅ Verify theme toggle works
4. ✅ Take screenshots automatically
5. ✅ Run cross-browser tests
6. ✅ Debug with trace files

Happy testing! 🚀 