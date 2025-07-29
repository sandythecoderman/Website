const { chromium } = require('playwright');
const path = require('path');

async function testCompactFlow() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        console.log('🧪 Testing Compact Flow Animation...\n');
        
        await page.goto('file://' + path.resolve('index.html'));
        await page.waitForLoadState('networkidle');
        
        // Check container dimensions
        const container = await page.locator('.flow-animation-container');
        const containerBox = await container.boundingBox();
        
        console.log(`📦 Container Height: ${Math.round(containerBox.height)}px (target: <300px)`);
        console.log(`📦 Container Width: ${Math.round(containerBox.width)}px`);
        
        // Check stage card dimensions
        const firstCard = await page.locator('.stage-card').first();
        const cardBox = await firstCard.boundingBox();
        
        console.log(`🃏 Card Height: ${Math.round(cardBox.height)}px`);
        console.log(`🃏 Card Width: ${Math.round(cardBox.width)}px`);
        
        // Check icon sizes
        const icon = await page.locator('.stage-icon').first();
        const iconBox = await icon.boundingBox();
        
        console.log(`🎯 Icon Size: ${Math.round(iconBox.width)}x${Math.round(iconBox.height)}px (target: 60x60px)`);
        
        // Test mobile viewport
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.waitForTimeout(1000);
        
        const mobileContainer = await page.locator('.flow-animation-container');
        const mobileBox = await mobileContainer.boundingBox();
        
        console.log(`📱 Mobile Container Height: ${Math.round(mobileBox.height)}px`);
        
        // Take screenshot
        await page.screenshot({ 
            path: 'compact-flow-test.png',
            fullPage: false 
        });
        console.log('📸 Screenshot saved as compact-flow-test.png');
        
        // Summary
        const isCompact = containerBox.height < 300 && iconBox.width === 60;
        console.log(`\n🎯 Compact Design: ${isCompact ? '✅ PASS' : '❌ FAIL'}`);
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await browser.close();
    }
}

testCompactFlow(); 