const { spawn } = require('child_process');
const fetch = require('node-fetch');

class PlaywrightMCPClient {
    constructor(port = 3000) {
        this.port = port;
        this.baseUrl = `http://localhost:${port}`;
    }

    async sendRequest(method, params = {}) {
        try {
            const response = await fetch(`${this.baseUrl}/mcp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: Date.now(),
                    method: method,
                    params: params
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error sending request:', error);
            throw error;
        }
    }

    async createBrowser() {
        console.log('🌐 Creating browser...');
        return await this.sendRequest('browser/create', {
            browser: 'chromium',
            headless: false
        });
    }

    async createPage() {
        console.log('📄 Creating page...');
        return await this.sendRequest('page/create');
    }

    async navigateTo(url) {
        console.log(`🧭 Navigating to: ${url}`);
        return await this.sendRequest('page/navigate', { url });
    }

    async takeScreenshot(path) {
        console.log(`📸 Taking screenshot: ${path}`);
        return await this.sendRequest('page/screenshot', { path });
    }

    async click(selector) {
        console.log(`🖱️  Clicking: ${selector}`);
        return await this.sendRequest('page/click', { selector });
    }

    async type(selector, text) {
        console.log(`⌨️  Typing in ${selector}: ${text}`);
        return await this.sendRequest('page/type', { selector, text });
    }

    async getText(selector) {
        console.log(`📝 Getting text from: ${selector}`);
        return await this.sendRequest('page/textContent', { selector });
    }

    async closeBrowser() {
        console.log('🔒 Closing browser...');
        return await this.sendRequest('browser/close');
    }
}

async function testWebsiteWithMCP() {
    console.log('🧪 Starting Playwright MCP test...');
    
    const client = new PlaywrightMCPClient();
    
    try {
        // Test basic functionality
        console.log('\n1️⃣ Testing basic browser operations...');
        
        // Create browser and page
        await client.createBrowser();
        await client.createPage();
        
        // Navigate to our website
        await client.navigateTo('http://localhost:8080/');
        
        // Wait a bit for page to load
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Take a screenshot
        await client.takeScreenshot('./mcp-test-screenshot.png');
        
        // Test mobile menu functionality
        console.log('\n2️⃣ Testing mobile menu functionality...');
        
        // Set viewport to mobile size
        await client.sendRequest('page/setViewportSize', { width: 375, height: 667 });
        
        // Check if hamburger menu is visible
        const hamburgerVisible = await client.sendRequest('page/isVisible', { selector: '.hamburger' });
        console.log(`🍔 Hamburger menu visible: ${hamburgerVisible.result}`);
        
        if (hamburgerVisible.result) {
            // Click hamburger menu
            await client.click('.hamburger');
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Check if menu is open
            const menuOpen = await client.sendRequest('page/isVisible', { selector: '.nav-menu.active' });
            console.log(`📋 Menu opened: ${menuOpen.result}`);
            
            // Check if mobile theme toggle is visible
            const themeToggleVisible = await client.sendRequest('page/isVisible', { selector: '.mobile-theme-toggle' });
            console.log(`🌙 Mobile theme toggle visible: ${themeToggleVisible.result}`);
            
            // Test theme toggle
            if (themeToggleVisible.result) {
                console.log('🔄 Testing theme toggle...');
                await client.click('.mobile-theme-toggle .theme-toggle');
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Take screenshot after theme change
                await client.takeScreenshot('./mcp-theme-toggle-test.png');
            }
        }
        
        // Test navigation
        console.log('\n3️⃣ Testing navigation...');
        await client.navigateTo('http://localhost:8080/about.html');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await client.takeScreenshot('./mcp-about-page.png');
        
        await client.navigateTo('http://localhost:8080/product.html');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await client.takeScreenshot('./mcp-product-page.png');
        
        await client.navigateTo('http://localhost:8080/contact.html');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await client.takeScreenshot('./mcp-contact-page.png');
        
        console.log('\n✅ All tests completed successfully!');
        console.log('📸 Screenshots saved in current directory');
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        // Clean up
        await client.closeBrowser();
    }
}

// Check if server is running
async function checkServer() {
    try {
        const response = await fetch('http://localhost:3000/health');
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Main execution
async function main() {
    console.log('🔍 Checking if Playwright MCP server is running...');
    
    const serverRunning = await checkServer();
    if (!serverRunning) {
        console.log('⚠️  Playwright MCP server is not running.');
        console.log('🚀 Please start it first with: ./start-playwright-mcp.sh');
        console.log('   or run: npx @playwright/mcp --port 3000');
        return;
    }
    
    console.log('✅ Playwright MCP server is running!');
    await testWebsiteWithMCP();
}

main().catch(console.error); 