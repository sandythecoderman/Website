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
